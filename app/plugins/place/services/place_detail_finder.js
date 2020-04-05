import axios from 'axios';
import mongoose from 'mongoose';

const Place = mongoose.model('Place');

export default class PlaceDetailFinder {
  constructor(server) {
    this.server = server;
  }

  async perform(placeId = '') {
    if (!placeId) return;

    let place = await Place.findOne({
      placeId
    }).lean();

    if (place) return place;

    try {
      let resp = await axios
        .get(
          "https://maps.googleapis.com/maps/api/place/details/json",
          {
            params: {
              place_id: placeId,
              language: "vi",
              fields:
                "formatted_address,place_id,name,geometry",
              key: this.server.configManager.get('googleApi.apiKey')
            }
          }
        );

      let { result } = resp.data;

      if (result) {
        place = new Place({
          name: result.name,
          address: result.formatted_address,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          placeId: result.place_id
        });

        place.save();

        return place;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return '';
    }
  }
}

