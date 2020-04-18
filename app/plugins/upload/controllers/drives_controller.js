export default class DrivesController extends BaseController {
  async show() {
    return `https://drive.google.com/uc?id=${this.request.params.id}`;
  }
}
