import mongoose from "mongoose";

const SitemapConfig = mongoose.model('SitemapConfig');

export default class CmsSitemapsController extends ResourcesController {

  async generateSitemap() {
    let config = await this.findById();
    return await config.generateSitemap(this.request.server);
  }

  async submitToGoogle() {
    let config = await this.findById();
  }
}
