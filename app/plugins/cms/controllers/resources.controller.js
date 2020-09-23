'use strict';

import _ from "lodash";
import mongoose from "mongoose";
import Boom from "boom";
import Ejs from "ejs";
import AccessibleItselfService from "../services/accessible_itself_service";

const ErrorHandler = require('@root/app/utils/error.js');

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
        perPage: Number(this.request.query.perPage || this.request.query.per_page || this.config.get('web.paging.itemsPerPage')),
        numberVisiblePages: this.config.get('web.paging.numberVisiblePages'),
        select2: this.request.query.select2 ? JSON.parse(this.request.query.select2) : {},
        populates: null
      };
      delete this.request.query.perPage;
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
      console.log(this.MODEL.modelName + ': ', JSON.stringify(queryConditions));

      // Sort object
      if (queryAttrs.sort) {
        try {
          queryAttrs.sort = JSON.parse(queryAttrs.sort);
        } catch (e) {
          let sortSplitted = queryAttrs.sort.split(',');
          queryAttrs.sort = {};

          sortSplitted.forEach((sortClause) => {
            let sortArray = sortClause.split('|');
            queryAttrs.sort[sortArray[0].trim()] = this.sortValue(sortArray[1]);
          });
        }
      }

      // Query
      let promise = this.MODEL.find(queryConditions);

      // Select object
      if (queryAttrs.select2.idField && queryAttrs.select2.textField) {
        queryAttrs.select = `${queryAttrs.select2.idField} ${queryAttrs.select2.textField} ${queryAttrs.select2.select || ''}`;
      }
      if (queryAttrs.select) {
        promise = promise.select(queryAttrs.select);
      }
      if (queryAttrs.select2.id) {
        queryAttrs.select2.id = await this.MODEL.findOne({ _id: queryAttrs.select2.id, status: 1 }).lean();
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
            if (queryAttrs.select2.id) {
              items.unshift(queryAttrs.select2.id);
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
              lastPage: totalPage, // variable name for vue-table-pagination
              currentPage: parseInt(queryAttrs.page), // variable name for vue-table-pagination
            };
            return rs(dataRes);
          });
        });
      } else {
        let items = await promise.lean();
        if (queryAttrs.select2.id) {
          items.unshift(queryAttrs.select2.id);
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
      let data = {};
      let { originId } = this.request.query;

      if (originId) {
        let originObject = await this.MODEL.findById(originId).lean();
        data = _.omit(originObject, ['_id', 'createdAt', 'updatedAt', '__v']);
      }

      let object = new this.MODEL(data).toJSON();
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
    if (queryAttrs.select2.idField) {
      items = items.map((record) => {
        if (queryAttrs.select2.textTemplate) {
          var text = Ejs.render(queryAttrs.select2.textTemplate, record);
        } else if (queryAttrs.select2.textField) {
          var text = record[queryAttrs.select2.textField];
        }
        return {
          id: record[queryAttrs.select2.idField],
          text
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
      } else if (i == 'filters') {
        let filters = this.parseType(this.request.query[i]);
        delete this.request.query[i];

        for (let f in filters) {
          queryConditions[f] = this.parseType(filters[f]);
        }
      } else {
        queryConditions[i] = this.parseType(this.request.query[i]);
      }
    }

    return queryConditions;
  }

  async importModel() {
    return (this.MODEL && this.MODEL.modelName) || null;
  }
}

new AccessibleItselfService(ResourcesController).perform();
