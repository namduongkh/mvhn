export default class CmsStoreOrdersController extends ResourcesController {
  async index() {
    let storeTable = this.request.query.storeTable || this.request.params.storeTable;
    if (!storeTable) {
      return { status: false, data: [], message: "Provide Store Table" }
    }
    return await super.index();
  }

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
