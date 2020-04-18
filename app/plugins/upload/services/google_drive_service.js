const { google } = require('googleapis');
import mongoose from "mongoose";

const Setting = mongoose.model('Setting');
const Media = mongoose.model('Media');

export default class GoogleDriveService {
  static async getInstance(server) {
    if (!this.instance) {
      this.instance = new this();
      await this.instance.init(server);
    }

    return this.instance;
  }

  constructor() { }

  async init(server) {
    this.server = server;
    this.oAuth2Client = new google.auth.OAuth2(
      this.server.configManager.get('googleApi.clientId'),
      this.server.configManager.get('googleApi.clientSecret'),
      this.server.configManager.get('web.context.settings.services.webUrl') + '/users/get-google-access-token'
    );
    this.globalSetting = (await Setting.findOne({ key: 'global_setting' }).lean()) || {};

    if (this.globalSetting.googleAccessToken) {
      this.oAuth2Client.setCredentials(JSON.parse(this.globalSetting.googleAccessToken));
      this.drive = google.drive({ version: 'v3', auth: this.oAuth2Client });
      await this.getFolderId();
    }
  }

  async upload(fileData) {
    let name = fileData.hapi.filename;
    let ext = name.split('.').pop();

    try {
      let resp = await this.drive.files.create({
        resource: { name, parents: [this.folderId] },
        media: { body: fileData, mineType: fileData.hapi.headers['content-type'] },
        fields: 'id'
      });

      this.drive.permissions.create({
        fileId: resp.data && resp.data.id,
        resource: {
          type: 'anyone',
          role: 'reader'
        }
      });

      let path = `https://drive.google.com/uc?id=${resp.data && resp.data.id}`;
      let media = new Media({
        name,
        ext,
        path,
        storageType: 'drive'
      });
      await media.save();

      return media;
    } catch (error) {
      console.log('upload', error);
    }
  }

  async getFolderId() {
    let folderName = this.server.configManager.get("web.name");

    try {
      let resp = await this.drive.files.list({
        q: `mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}'`,
        fields: 'files(id)',
        spaces: 'drive'
      });

      this.folderId = (resp.data.files[0] || {}).id;

      if (!this.folderId) {
        resp = await this.drive.files.create({
          resource: {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder'
          },
          fields: 'id'
        });

        this.folderId = resp.data.id;
      }
    } catch (error) {
      console.log('getFolderId', error);
    }
  }
}
