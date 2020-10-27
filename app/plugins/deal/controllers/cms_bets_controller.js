import mongoose from "mongoose";
import Boom from "boom";
import _ from "lodash";
import { ResourcesController } from "@core/modules";

export default class CsmBetsController extends ResourcesController {
  beforeActions() {
    return {
      loadDeal: [{ allAction: true }],
      loadOption: [{ allAction: true }],
    }
  }

  async index() {
    this.request.query.populates = [{
      path: "option",
      select: "name win rate"
    }, {
      path: "user",
      select: "name",
    }, {
      path: "deal",
      select: "name",
    }];

    return super.index();
  }

  async loadDeal() {
    let dealId = this.request.params.dealId;

    if (dealId) {
      if (this.request.method.toLowerCase() == 'get') {
        this.request.query.deal = dealId;
      } else if (['post', 'put'].includes(this.request.method.toLowerCase())) {
        this.request.payload.deal = dealId;
      }
    }
  }

  async loadOption() {
    let dealOptionId = this.request.params.dealOptionId;

    if (dealOptionId) {
      if (this.request.method.toLowerCase() == 'get') {
        this.request.query.option = dealOptionId;
      } else if (['post', 'put'].includes(this.request.method.toLowerCase())) {
        this.request.payload.option = dealOptionId;
      }
    }
  }
}
