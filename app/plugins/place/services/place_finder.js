import axios from 'axios';
import mongoose from 'mongoose';
import _ from 'lodash';

const Place = mongoose.model('Place');

export default class PlaceFinder {
  constructor(server) {
    this.server = server
  }

  async perform(input = '', options = {}) {
    if (!input) return;

    try {
      let resp = await axios
        .get(
          "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
          {
            params: {
              input,
              inputtype: "textquery",
              language: "vi",
              fields:
                "place_id,formatted_address,name,geometry",
              key: this.server.configManager.get('googleApi.apiKey')
            }
          }
        );

      let result = resp.data && resp.data.candidates && resp.data.candidates[0];

      if (result) {
        let placeData = {
          name: result.name,
          address: result.formatted_address,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          placeId: result.place_id
        };

        if (options.findAndSave) {
          this.savePlace(placeData);
        }

        return placeData;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return '';
    }
  }


  async savePlace(placeData) {
    let place = (await Place.findOne({ placeId: placeData.placeId })) || new Place({ placeId: placeData.placeId });
    place = _.extend(place, placeData);
    place.save();
  }
}
