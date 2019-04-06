export default class Routes {
  constructor(server) {
    this.server = server;
    this.routeConfig = {
      auth: {
        strategy: 'jwt',
        scope: ['admin']
      }
    }
  }

  resources(controllerClass, prefix, model) {
    this.server.route({
      method: 'GET',
      path: '/cms/' + prefix,
      config: {
        ...this.routeConfig,
        async handler(request, h) {
          let controllerObject = new controllerClass(request, h, model);
          return await controllerObject.index();
        }
      }
    });

    this.server.route({
      method: 'GET',
      path: '/cms/' + prefix + '/select2',
      config: {
        ...this.routeConfig,
        async handler(request, h) {
          let controllerObject = new controllerClass(request, h, model);
          return await controllerObject.index();
        }
      }
    });

    this.server.route({
      method: 'GET',
      path: '/cms/' + prefix + '/{id}',
      config: {
        ...this.routeConfig,
        async handler(request, h) {
          let controllerObject = new controllerClass(request, h, model);
          return await controllerObject.detail();
        }
      }
    });

    this.server.route({
      method: 'POST',
      path: '/cms/' + prefix,
      config: {
        ...this.routeConfig,
        async handler(request, h) {
          let controllerObject = new controllerClass(request, h, model);
          return await controllerObject.create();
        }
      }
    });

    this.server.route({
      method: 'PUT',
      path: '/cms/' + prefix + '/{id}',
      config: {
        ...this.routeConfig,
        async handler(request, h) {
          let controllerObject = new controllerClass(request, h, model);
          return await controllerObject.update();
        }
      }
    });

    this.server.route({
      method: 'DELETE',
      path: '/cms/' + prefix + '/{id}',
      config: {
        ...this.routeConfig,
        async handler(request, h) {
          let controllerObject = new controllerClass(request, h, model);
          return await controllerObject.destroy();
        }
      }
    });
  }
}