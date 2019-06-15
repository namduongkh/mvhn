import Boom from "boom";
import UserCreator from "../services/user_creator";
import UserUpdater from "../services/user_updater";

export default class CmsUsersController extends ResourcesController {
  async create() {
    let creator = new UserCreator(this.request.payload);
    let user = await creator.perform();
    if (user) {
      return {
        data: user,
        status: 1,
        message: "Created successfully!"
      }
    } else {
      throw Boom.badRequest(creator.error);
    }
  }

  async update() {
    let updater = new UserUpdater(await this.findById(), this.request.payload);
    let user = await updater.perform();
    if (user) {
      return {
        data: user,
        status: 1,
        message: "Updated successfully!"
      }
    } else {
      throw Boom.badRequest(updater.error);
    }
  }
}