export default class CmsStoreOrderItemsController extends ResourcesController {
  async index() {
    let storeOrder = this.request.query.storeOrder || this.request.params.storeOrder;
    if (!storeOrder) {
      return { status: false, data: [], message: "Provide Store Table" }
    }
    return await super.index();
  }
}
