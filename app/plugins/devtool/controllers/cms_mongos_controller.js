'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";
import { ResourcesController } from "@core/modules";

export default class CmsMongosController extends ResourcesController {

  async index() {
    return this.initModel('index');
  }

  async edit() {
    return this.initModel('edit');
  }

  async show() {
    return this.initModel('show');
  }

  async update() {
    return this.initModel('update');
  }

  async bulkUpdateStatus() {
    return this.initModel('bulkUpdateStatus');
  }

  async delete() {
    return this.initModel('delete');
  }

  async bulkDelete() {
    return this.initModel('bulkDelete');
  }

  async getAllModels() {
    return Object.keys(mongoose.models);
  }

  async initModel(action) {
    let model = this.request.params.model || this.request.query.model;
    delete this.request.params.model;
    delete this.request.query.model;

    if (!model) throw Boom.badRequest("Please provide model param");

    this.MODEL = mongoose.model(model);
    return await super[action]();
  }
}
