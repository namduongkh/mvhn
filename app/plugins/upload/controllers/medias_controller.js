import mongoose from "mongoose";
import GoogleDriveService from "../services/google_drive_service";
import { BaseController } from "@core/modules";

const Media = mongoose.model('Media');

export default class MediasController extends BaseController {
  async index() {
    let service = await GoogleDriveService.getInstance(this.request.server);
    await service.list();
    // let file = await service.detail();

    return true;
  }
}
