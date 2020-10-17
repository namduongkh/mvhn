import { ResourcesController } from "@core/modules";
import Boom from "boom";
import _ from "lodash";
import mongoose from "mongoose";

const Setting = mongoose.model('Setting');

export default class CmsSettingsController extends ResourcesController {
  async update() {
    try {
      let object = await this.findById({ lean: true });
      for (let i in this.request.payload) {
        if (this.request.payload[i] == '__undefined') {
          delete this.request.payload[i];
          if (!this.request.payload['$unset']) this.request.payload['$unset'] = {};
          this.request.payload['$unset'][i] = 1;
        }
      }
      object = _.extend(object, this.request.payload);
      object = Setting.postTypeChecking(object);
      object = await this.MODEL.findByIdAndUpdate(object._id, object, { new: true });
      return {
        data: object,
        status: 1,
        message: "Updated successfully!"
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Something went wrong!',
        status: 0
      };
    }
  }

  async delete() {
    let object = await this.findById();
    if (object.isSystem || this.MODEL.SYSTEM_SETTING_KEYS.includes(object.key)) {
      return Boom.forbidden("This is system setting");
    }

    return await super.delete();
  }

  selectedFields() {
    return null;
  }
}
