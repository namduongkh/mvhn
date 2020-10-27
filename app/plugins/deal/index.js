'use strict';

import mongoose from 'mongoose';
import DealsController from './controllers/deals_controller.js';
import DealOptionsController from './controllers/deal_options_controller.js';
import BetsController from './controllers/bets_controller.js';
import CsmDealOptionsController from './controllers/cms_deal_options_controller.js';
import CsmBetsController from './controllers/cms_bets_controller.js';
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const Deal = mongoose.model('Deal');
const DealOption = mongoose.model('DealOption');
const Bet = mongoose.model('Bet');

exports.register = function (server, options, next) {
    const serverRouter = new ServerRouter(server);
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(ResourcesController, 'deals', Deal);
    cmsRoutes.resources(CsmDealOptionsController, 'deals/{dealId}/deal_options', DealOption);
    cmsRoutes.resources(CsmBetsController, 'deals/{dealId}/bets', Bet);
    cmsRoutes.resources(CsmBetsController, 'deal_options/{dealOptionId}/bets', Bet);

    serverRouter.resources('deals', DealsController, {
        only: ['index']
    });

    serverRouter.resources('deals/{dealId}/deal_options', DealOptionsController, {
        only: ['index']
    });

    serverRouter.resources('deal_options/{dealOptionId}/bets', BetsController, {}, {
        auth: 'jwt'
    });

    serverRouter.resources('deals/{dealId}/bets', BetsController, {}, {
        auth: 'jwt'
    });
};

exports.register.attributes = {
    name: 'deal'
};
