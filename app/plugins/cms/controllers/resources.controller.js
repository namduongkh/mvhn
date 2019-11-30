'use strict';

import _ from "lodash";
import mongoose from "mongoose";
import Boom from "boom";

const ErrorHandler = require(BASE_PATH + '/app/utils/error.js');

export default class ResourcesController {
  constructor(model, request, h) {
    this.initRequest(request, h);
    this.MODEL = model;
    if (model && mongoose.models[model.modelName + 'TextSearch']) {
      this.TEXTSEARCH_MODEL = mongoose.model(model.modelName + 'TextSearch');
    }
    this.keywordSearchFields = ["name", "title"];
  }

  async index() {
    try {
      let queryAttrs = {
        sort: 'createdAt|asc',
        select: this.selectedFields(),
        notPaginate: false,
        page: 1,
        perPage: Number(this.request.query.per_page || this.config.get('web.paging.itemsPerPage')),
        numberVisiblePages: this.config.get('web.paging.numberVisiblePages'),
        select2: false,
        select2Id: null,
        idField: null,
        textField: null,
        populates: null
      };
      delete this.request.query.per_page;

      // Get params not use to query
      for (let i in queryAttrs) {
        if (typeof this.request.query[i] != 'undefined') {
          queryAttrs[i] = this.parseType(this.request.query[i]);
          delete this.request.query[i];
        }
      }

      // Set query condition from request query
      let queryConditions = await this.buildConditions();
      console.log('Resources Controller - Query Conditions: ', JSON.stringify(queryConditions));

      // Sort object
      if (queryAttrs.sort) {
        let sortArray = queryAttrs.sort.split('|');
        queryAttrs.sort = { [sortArray[0]]: this.sortValue(sortArray[1]) };
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
      if (queryAttrs.select2Id) {
        queryAttrs.select2Id = await this.MODEL.findOne({ _id: queryAttrs.select2Id, status: 1 }).lean();
      }

      // Populates
      if (queryAttrs.populates && queryAttrs.populates.length) {
        for (let i in queryAttrs.populates) {
          promise = promise.populate(queryAttrs.populates[i]);
        }
      }

      promise = promise.sort(queryAttrs.sort);

      if (!queryAttrs.notPaginate) {
        return await new Promise(async (rs) => {
          promise.lean().paginate(queryAttrs.page, queryAttrs.perPage, (err, items, total) => {
            if (err) {
              console.log("Resource query error:", err);
              return rs(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
            }
            let totalPage = Math.ceil(total / queryAttrs.perPage);
            if (queryAttrs.select2Id) {
              items.unshift(queryAttrs.select2Id);
            }

            let dataRes = {
              itemsPerPage: queryAttrs.perPage,
              numberVisiblePages: queryAttrs.numberVisiblePages,
              data: this.responsedItems(items, queryAttrs),
              from: 1 + (queryAttrs.perPage * (queryAttrs.page - 1)),
              to: queryAttrs.perPage * queryAttrs.page,
              total: total,
              nextPageUrl: "",
              perPage: queryAttrs.perPage,
              last_page: totalPage, // variable name for vue-table-pagination
              current_page: parseInt(queryAttrs.page), // variable name for vue-table-pagination
            };
            return rs(dataRes);
          });
        });
      } else {
        let items = await promise.lean();
        if (queryAttrs.select2Id) {
          items.unshift(queryAttrs.select2Id);
        }

        return {
          status: 1,
          data: this.responsedItems(items, queryAttrs)
        }
      }
    } catch (error) {
      console.log(error);
      throw Boom.badRequest('Something went wrong!');
    }
  }

  async new() {
    try {
      let object = new this.MODEL({}).toJSON();
      delete object._id;
      return object;
    } catch (error) {
      console.log(error);
      throw Boom.badRequest('Something went wrong!');
    }
  }

  async edit() {
    try {
      let object = await this.findById({ lean: true });
      return object;
    } catch (error) {
      console.log(error);
      throw Boom.badRequest('Something went wrong!');
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
      throw Boom.badRequest('Something went wrong!');
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
      throw Boom.badRequest('Something went wrong!');
    }
  }

  async bulkUpdateStatus() {
    try {
      let { ids, status } = this.request.payload;

      let objects = await this.MODEL.find({ _id: { $in: ids } });

      for (let i in objects) {
        let object = objects[i];
        object.status = status;
        await object.save();
      }

      return {
        status: 1,
        message: "Updated successfully!"
      };
    } catch (error) {
      console.log(error);
      throw Boom.badRequest('Something went wrong!');
    }
  }

  async bulkDelete() {
    try {
      let { ids } = this.request.payload;

      let objects = await this.MODEL.find({ _id: { $in: ids } });

      for (let i in objects) {
        let object = objects[i];
        await object.remove();
      }

      return {
        status: 1,
        message: "Deleted successfully!"
      };
    } catch (error) {
      console.log(error);
      throw Boom.badRequest('Something went wrong!');
    }
  }

  async delete() {
    try {
      let object = await this.findById();
      object = await object.remove();
      return {
        status: 1,
        message: "Deleted successfully!"
      };
    } catch (error) {
      console.log(error);
      throw Boom.badRequest('Something went wrong!');
    }
  }

  async findById(options = {}) {
    let { id } = this.request.params;
    let promise = this.MODEL.findOne({ _id: id });
    let selectedFields = this.selectedFields();
    if (selectedFields && selectedFields.length) {
      promise = promise.select(selectedFields);
    }
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
    try {
      return JSON.parse(value);
    } catch (error) { }
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
    return _.map(await this.TEXTSEARCH_MODEL.find({
      text: { $regex: new RegExp(filter, 'gi') }
    }, 'object').lean(), 'object');
  }

  sortValue(value) {
    return {
      'asc': 1,
      'desc': -1,
      '1': 1,
      '-1': -1
    }[value] || 1;
  }

  selectedFields() {
    if (!this.MODEL) return [];

    let fields = Object.keys(this.MODEL.schema.obj).concat(["createdAt", "updatedAt"]).join(" ");
    let exceptedFields = ["password"];
    for (let i in exceptedFields) {
      fields = fields.replace(exceptedFields[i], '');
    }
    return fields;
  }

  initRequest(request, h) {
    this.request = request;
    this.h = h;
    if (!this.request) return;
    this.config = this.request.server.configManager;
  }

  defaultConditions() {
    return {};
  }

  async buildConditions() {
    let queryConditions = this.defaultConditions();

    for (let i in this.request.query) {
      if (!this.request.query[i]) break;

      if (i == 'filter') {
        if (this.TEXTSEARCH_MODEL) {
          queryConditions['_id'] = { $in: await this.textSearchIds(this.request.query[i]) };
        } else if (this.request.query[i].length == 24 && mongoose.Types.ObjectId.isValid(this.request.query[i])) {
          queryConditions['_id'] = this.request.query[i];
        } else {
          if (!queryConditions.$or) queryConditions.$or = [];
          let search = new RegExp(this.request.query[i], 'gi')
          queryConditions.$or.push(...this.keywordSearchFields.map((field) => {
            return { [field]: { $regex: search } }
          }));
        }
      } else {
        queryConditions[i] = this.parseType(this.request.query[i]);
      }
    }

    return queryConditions;
  }
}
