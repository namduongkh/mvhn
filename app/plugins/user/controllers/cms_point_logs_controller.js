import Boom from "boom";
import { ResourcesController } from "@core/modules";
import mongoose from "mongoose";

const User = mongoose.model('User');

export default class CmsPointLogsController extends ResourcesController {
  beforeActions() {
    return {
      loadUser: [{ allAction: true }],
    }
  }

  async create() {
    let user = await User.findById(this.request.params.userId);
    let log = await user.changePoint(this.request.payload.point, this.request.payload.content);
    return {
      data: log,
      status: 1,
      message: "Created successfully!"
    }
  }

  async loadUser() {
    let userId = this.request.params.userId;
    if (!userId) return Boom.badRequest('Please provide user');

    if (this.request.method.toLowerCase() == 'get') {
      this.request.query.user = userId;
    } else if (['post', 'put'].includes(this.request.method.toLowerCase())) {
      this.request.payload.user = userId;
    }
  }
}
