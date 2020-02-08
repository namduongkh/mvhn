import mongoose from "mongoose";

export default class CmsImportersController extends ResourcesController {

  async run() {
    let importer = await this.findById();
    await importer.run(this.request.payload.file);

    return { status: 1, message: "Importer is running!" };
  }
}
