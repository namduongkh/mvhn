import mongoose from "mongoose";
import Boom from "boom";
import _ from "lodash";
import { ResourcesController } from "@core/modules";

export default class CsmDealOptionsController extends ResourcesController {
  beforeActions() {
    return {
      loadDeal: [{ allAction: true }],
    }
  }

  async loadDeal() {
    let dealId = this.request.params.dealId;
    if (!dealId) return Boom.badRequest('Please provide deal');

    if (this.request.method.toLowerCase() == 'get') {
      this.request.query.deal = dealId;
    } else if (['post', 'put'].includes(this.request.method.toLowerCase())) {
      this.request.payload.deal = dealId;
    }
  }
}
