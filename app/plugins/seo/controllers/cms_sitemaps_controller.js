import mongoose from "mongoose";
import { ResourcesController } from "@core/modules";

const SitemapConfig = mongoose.model('SitemapConfig');

export default class CmsSitemapsController extends ResourcesController {

  async generateSitemap() {
    let config = await this.findById();
    return await config.generateSitemap(this.request.server);
  }
}
