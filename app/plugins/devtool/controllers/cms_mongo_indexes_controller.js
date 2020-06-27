'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";
import { ResourcesController } from "@core/modules";

export default class CmsMongoIndexesController extends ResourcesController {
  async index() {
    await this.initModel();
    let indexes = await this.MODEL.collection.getIndexes({ full: true });

    return indexes;
  }

  async delete() {
    await this.initModel();
    let id = this.request.params.id || this.request.query.id;

    await this.MODEL.collection.dropIndex(id);

    return true;
  }

  async initModel(action = '') {
    let model = this.request.params.model || this.request.query.model;
    delete this.request.params.model;
    delete this.request.query.model;

    if (!model) throw Boom.badRequest("Please provide model param");

    this.MODEL = mongoose.model(model);
  }
}
