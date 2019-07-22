export default class CmsStoreOrdersController extends ResourcesController {
  async new() {
    try {
      let object = new this.MODEL({}).toJSON();
      object.fakeId = object._id;
      delete object._id;
      return object;
    } catch (error) {
      console.log(error);
      throw Boom.badRequest('Something went wrong!');
    }
  }

  async create() {
    this.request.payload._id = this.request.payload.fakeId;
    delete this.request.payload.fakeId;
    return await super.create();
  }
}
