export default class CmsSettingsController extends ResourcesController {
  async update() {
    try {
      let object = await this.findById({ lean: true });
      for (let i in this.request.payload) {
        if (this.request.payload[i] == '__undefined') {
          this.request.payload[i] = undefined;
        }
      }
      object = await this.MODEL.findByIdAndUpdate(object._id, this.request.payload, { new: true });
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
}