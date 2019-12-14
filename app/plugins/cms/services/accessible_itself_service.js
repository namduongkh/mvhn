import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";

export default class AccessibleItselfService {
  constructor(controller) {
    this.controller = controller;
    this.accessibleFields = ['user', 'owner'];
  }

  perform() {
    let self = this;

    for (let key of ['index', 'show', 'edit', 'update', 'delete']) {
      const old = this.controller.prototype[key];

      this.controller.prototype[key] = async function (...args) {
        let { credentials } = this.request.auth;
        let modelFields = Object.keys(this.MODEL.schema.obj);
        let modelField = _.intersection(modelFields, self.accessibleFields).shift();

        if (this.MODEL == mongoose.model('User')) modelField = ['_id'];

        if (credentials && credentials.accessItself && modelField) {
          switch (key) {
            case 'index':
              this.request.query[modelField] = credentials.uid;
              break;

            default:
              let existed = await this.MODEL.exists({ [modelField]: credentials.uid, _id: this.request.params.id });

              if (!existed) {
                throw Boom.forbidden("Can not access");
              } else {
                if (this.request.payload) this.request.payload[modelField] = credentials.uid;
              }
              break;
          }
        }

        return await old.call(this, ...args);
      };
    }
  }
}
