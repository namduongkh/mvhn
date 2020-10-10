import Vue from 'vue';
import Router from 'vue-router';

import menuModule from '../modules/menu';

Vue.use(Router);

export default new Router({
    base: `/${window.cmsprefix}`,
    routes: [
        ...generateRoutesFromMenu(menuModule.state.routes),
        {
            path: '*',
            redirect: {
                name: getDefaultRoute(menuModule.state.routes).name
            }
        }
    ]
});

function generateRoutesFromMenu(menu = [], routes = []) {
    for (let i = 0, l = menu.length; i < l; i++) {
        let item = menu[i];
        if (item.path) {
            routes.push(item);
        }
        if (item.childrens) {
            generateRoutesFromMenu(item.childrens, routes);
        }
    }
    return routes;
}

function getDefaultRoute(menu = []) {
    let defaultRoute;

    menu.forEach((item) => {
        if (item.meta.default) {
            defaultRoute = item;
        } else if (item.children) {
            let defaultChild = item.children.find((i) => i.meta.default);
            defaultRoute = defaultChild || defaultRoute;
        }
    });

    return defaultRoute;
}
