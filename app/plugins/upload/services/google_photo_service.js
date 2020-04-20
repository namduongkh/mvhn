const { google } = require('googleapis');
import mongoose from "mongoose";
import axios from "axios";

const Setting = mongoose.model('Setting');
const Media = mongoose.model('Media');

export default class GooglePhotoService {
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
      let tokenObject = JSON.parse(this.globalSetting.googleAccessToken);
      this.token = tokenObject.access_token;
      this.apiEndpoint = 'https://photoslibrary.googleapis.com/v1';
      this.apiHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      };
      await this.getAlbumId();
    }
  }

  async upload(fileData) {
    let name = fileData.hapi.filename;
    let ext = name.split('.').pop();

    try {
      let uploadToken = await this.uploadByte(fileData);
      if (!uploadToken) return;

      let newMediaItems = await this.createMediaItems([
        {
          simpleMediaItem: {
            fileName: name,
            uploadToken
          }
        }
      ]);

      let results = [];
      for (let i in newMediaItems) {
        let item = newMediaItems[i];
        let media = new Media({
          name,
          ext,
          path: item.mediaItem.baseUrl,
          storageType: 'photo'
        });
        media.save();
        results.push(media.toJSON());
      }

      return results;
    } catch (error) {
      console.log('upload', error);
    }
  }

  async uploadByte(fileData) {
    try {
      let resp = await axios.post(this.apiEndpoint + '/uploads', fileData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-type': 'application/octet-stream',
          'X-Goog-Upload-Content-Type': fileData.hapi.headers['content-type'],
          'X-Goog-Upload-Protocol': 'raw',
        }
      });

      return resp.data;
    } catch (error) {
      console.log('uploadByte', error);
    }
  }

  async createMediaItems(newMediaItems = []) {
    try {
      let resp = await axios.post(this.apiEndpoint + '/mediaItems:batchCreate', {
        albumId: this.albumId,
        newMediaItems
      }, {
        headers: this.apiHeaders
      });

      let newMediaItemResults = resp.data.newMediaItemResults || [];
      let mediaItemIdParams = [''].concat(newMediaItemResults.map((item) => { return item.mediaItem.id })).join("&mediaItemIds=");

      resp = await axios.get(this.apiEndpoint + `/mediaItems:batchGet?${mediaItemIdParams}`, { headers: this.apiHeaders });

      return resp.data && resp.data.mediaItemResults;
    } catch (error) {
      console.log('createMediaItems', error);
    }
  }

  async getAlbumId() {
    let albumTitle = this.server.configManager.get("web.name");

    try {
      let resp = await axios.get(this.apiEndpoint + '/albums', {
        headers: this.apiHeaders
      });

      let albums = (resp.data && resp.data.albums) || [];
      let album = albums.filter((album) => { return album.title == albumTitle });

      if (!album.length) {
        resp = await axios.post(this.apiEndpoint + '/albums', {
          album: { title: albumTitle }
        }, {
          headers: this.apiHeaders
        });

        this.albumId = resp.data.id;
      } else {
        this.albumId = album[0].id;
      }
    } catch (error) {
      console.log('getAlbumId', error);
    }
  }
}
