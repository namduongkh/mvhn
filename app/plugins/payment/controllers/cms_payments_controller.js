import mongoose from "mongoose";
import Boom from "boom";
import _ from "lodash";
import { ResourcesController } from "@core/modules";

export default class CmsPaymentsController extends ResourcesController {

  async index() {
    this.request.query.populates = [{
      path: "user",
      select: "name"
    }];

    return super.index();
  }

  async approve() {
    let payment = await this.findById();
    await payment.approve();

    return {
      data: payment,
      status: 1,
      message: "Payment approved"
    }
  }
}
