'use strict';

import _ from "lodash";

export default class Resources {
  constructor(server, model) {
    this.MODEL = model;
    this.server = server;
  }

  routes(prefix) {
    this.server.route({
      method: 'GET',
      path: '/cms/' + prefix,
      config: this.index()
    });

    this.server.route({
      method: 'GET',
      path: '/cms/' + prefix + '/{id}',
      config: this.detail()
    });

    this.server.route({
      method: 'POST',
      path: '/cms/' + prefix,
      config: this.create()
    });

    this.server.route({
      method: 'PUT',
      path: '/cms/' + prefix + '/{id}',
      config: this.update()
    });

    this.server.route({
      method: 'DELETE',
      path: '/cms/' + prefix + '/{id}',
      config: this.destroy()
    });
  }

  index() {
    return {
      handler: async (request, reply) => {
        let listObject = await this.MODEL.find({});
        return {
          status: 1,
          data: listObject
        }
      }
    }
  }

  detail() {
    return {
      handler: async (request, reply) => {
        try {
          let object = await this.findById(request, { lean: true });
          return object;
        } catch (error) {
          return {
            message: 'Something went wrong!',
            status: 0
          };
        }
      }
    }
  }

  create() {
    return {
      handler: async (request, reply) => {
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
    }
  }

  update() {
    return {
      handler: async (request, reply) => {
        try {
          let object = await this.findById(request);
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
    }
  }

  destroy() {
    return {
      handler: async (request, reply) => {
        try {
          let object = await this.findById(request);
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
    }
  }

  async findById(request, options = {}) {
    let { id } = request.params;
    let promise = this.MODEL.findOne({ _id: id });
    if (options.lean) {
      promise = promise.lean();
    }
    return await promise;
  }

}