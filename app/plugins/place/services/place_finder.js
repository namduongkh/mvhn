import axios from 'axios';

export default class PlaceFinder {
  constructor(server) {
    this.server = server
  }

  async perform(input = '') {
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
                "place_id,formatted_address,name,opening_hours,geometry",
              key: this.server.configManager.get('googleApi.apiKey')
            }
          }
        );

      return (resp.data && resp.data.candidates && resp.data.candidates[0]) || null;
    } catch (error) {
      console.log(error);
      return '';
    }
  }
}
