'use strict';

import _ from "lodash";

export default class Resources {
  constructor(request, h, model) {
    this.request = request;
    this.h = h;
    this.MODEL = model;
  }

  async index() {
    let listObject = await this.MODEL.find({});
    return {
      status: 1,
      data: listObject
    }
  }

  async detail() {
    try {
      let object = await this.findById({ lean: true });
      return object;
    } catch (error) {
      return {
        message: 'Something went wrong!',
        status: 0
      };
    }
  }

  async create() {
    try {
      let object = new this.MODEL(request.payload);
      object = await object.save();
      return {
        data: object,
        status: 1,
        message: "Created successfully!"
      };
    } catch (error) {
      return {
        message: 'Something went wrong!',
        status: 0
      };
    }
  }

  async update() {
    try {
      let object = await this.findById();
      object = _.extend(object, request.payload);
      object = await object.save();
      return {
        data: object,
        status: 1,
        message: "Updated successfully!"
      };
    } catch (error) {
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

}