'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import { ResourcesController } from "@core/modules";

const Rating = mongoose.model('Rating');

export default class CmsRatingsController extends ResourcesController {
}
