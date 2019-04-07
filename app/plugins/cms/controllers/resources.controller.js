'use strict';

import _ from "lodash";
import mongoose from "mongoose";
const ErrorHandler = require(BASE_PATH + '/app/utils/error.js');

export default class Resources {
  constructor(request, h, model) {
    this.request = request;
    this.h = h;
    this.MODEL = model;
    if (mongoose.models[model.modelName + 'TextSearch']) {
      this.TEXTSEARCH_MODEL = mongoose.model(model.modelName + 'TextSearch');
    }
    this.sortValue = {
      'asc': 1,
      'desc': -1,
      '1': 1,
      '-1': -1
    }
    this.config = this.request.server.configManager;
  }

  async index() {
    try {
      let queryAttrs = {
        sort: 'createdAt|asc',
        select: null,
        notPaginate: false,
        page: 1,
        per_page: this.config.get('web.paging.itemsPerPage'),
        numberVisiblePages: this.config.get('web.paging.numberVisiblePages'),
        select2: false,
        idField: null,
        textField: null
      };

      // Get params not use to query
      for (let i in queryAttrs) {
        if (typeof this.request.query[i] != 'undefined') {
          queryAttrs[i] = this.parseType(this.request.query[i]);
          delete this.request.query[i];
        }
      }

      // Set query condition from request query
      let queryConditions = { status: 1 };
      for (let i in this.request.query) {
        if (i == 'filter') {
          if (this.TEXTSEARCH_MODEL) {
            queryConditions['_id'] = { $in: await this.textSearchIds(this.request.query[i]) };
          } else {
            
          }
        } else {
          queryConditions[i] = this.parseType(this.request.query[i]);
        }
      }

      // Sort object
      if (queryAttrs.sort) {
        let sortArray = queryAttrs.sort.split('|');
        queryAttrs.sort = { [sortArray[0]]: this.sortValue[sortArray[1]] };
      }

      // Query
      let promise = this.MODEL.find(queryConditions);

      // Select object
      if (queryAttrs.select2 && queryAttrs.idField && queryAttrs.textField) {
        queryAttrs.select = `${queryAttrs.idField} ${queryAttrs.textField}`
      }
      if (queryAttrs.select) {
        promise = promise.select(queryAttrs.select);
      }

      promise = promise.sort(queryAttrs.sort);

      if (!queryAttrs.notPaginate) {
        return await new Promise((rs) => {
          promise.lean().paginate(queryAttrs.page, queryAttrs.per_page, (err, items, total) => {
            if (err) return rs(Boom.badRequest(ErrorHandler.getErrorMessage(err)));

            let totalPage = Math.ceil(total / queryAttrs.per_page);
            let dataRes = {
              current_page: parseInt(queryAttrs.page),
              itemsPerPage: queryAttrs.per_page,
              numberVisiblePages: queryAttrs.numberVisiblePages,
              data: this.responsedItems(items, queryAttrs),
              from: 1 + (queryAttrs.per_page * (queryAttrs.page - 1)),
              to: queryAttrs.per_page * queryAttrs.page,
              last_page: totalPage,
              total: total,
              next_page_url: "",
              per_page: queryAttrs.per_page
            };

            return rs(dataRes);
          });
        })
      } else {
        let items = await promise.lean();

        return {
          status: 1,
          data: this.responsedItems(items, queryAttrs)
        }
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Something went wrong!',
        status: 0
      };
    }
  }

  async new() {
    try {
      let object = new this.MODEL({}).toJSON();
      delete object._id;
      return object;
    } catch (error) {
      console.log(error);
      return {
        message: 'Something went wrong!',
        status: 0
      };
    }
  }

  async detail() {
    try {
      let object = await this.findById({ lean: true });
      return object;
    } catch (error) {
      console.log(error);
      return {
        message: 'Something went wrong!',
        status: 0
      };
    }
  }

  async create() {
    try {
      let object = new this.MODEL(this.request.payload);
      object = await object.save();
      return {
        data: object,
        status: 1,
        message: "Created successfully!"
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Something went wrong!',
        status: 0
      };
    }
  }

  async update() {
    try {
      let object = await this.findById();
      object = _.extend(object, this.request.payload);
      object = await object.save();
      return {
        data: object,
        status: 1,
        message: "Updated successfully!"
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Something went wrong!',
        status: 0
      };
    }
  }

  async destroy() {
    try {
      let object = await this.findById();
      object = await object.remove();
      return {
        status: 1,
        message: "Detroyed successfully!"
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Something went wrong!',
        status: 0
      };
    }
  }

  async findById(options = {}) {
    let { id } = this.request.params;
    let promise = this.MODEL.findOne({ _id: id });
    if (options.lean) {
      promise = promise.lean();
    }
    return await promise;
  }


  // Private method

  parseType(value) {
    if (value == 'true') return true;
    if (value == 'false') return false;
    if (!isNaN(value)) return Number(value);
    return value;
  }

  responsedItems(items, queryAttrs) {
    if (queryAttrs.select2 && queryAttrs.idField && queryAttrs.textField) {
      items = items.map((record) => {
        return {
          id: record[queryAttrs.idField],
          text: record[queryAttrs.textField],
        }
      });
    }
    return items;
  }

  async textSearchIds(filter) {
    if (this.TEXTSEARCH_MODEL) {
      return _.map(await this.TEXTSEARCH_MODEL.find({
        text: { $regex: new RegExp(filter, 'gi') }
      }, 'object').lean(), 'object');
    } else {
      await this.filterSearchIds();
    }
  }

  async filterSearchIds() {
    console.log('Chid class need define filterSearchIds');
  }
}