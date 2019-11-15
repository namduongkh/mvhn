export default class UsersController extends BaseController {
  async login() {
    return this.view('user/views/login', { template: 'webmag' });
  }
}
