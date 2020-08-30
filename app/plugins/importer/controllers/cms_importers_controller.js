import mongoose from "mongoose";
import { ResourcesController } from "@core/modules";
import QueueService from "@core/services/queue_service";

export default class CmsImportersController extends ResourcesController {

  async run() {
    QueueService.getInstance().performAction(async () => {
      let importer = await this.findById();
      await importer.run(this.request.payload);
    });

    return { status: 1, message: "The import is running, go to History to see progress!" };
  }
}
