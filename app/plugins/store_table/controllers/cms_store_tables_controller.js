'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { ResourcesController } from "@core/modules";

const StoreOrder = mongoose.model('StoreOrder');
const StoreTable = mongoose.model('StoreTable');

export default class CmsStoreTablesController extends ResourcesController {

  async move() {
    let storeTable = await this.findById();
    let { targetTableId } = this.request.payload;

    if (!storeTable.activeOrder || !targetTableId) {
      return { status: false, message: 'Store table can not move' }
    }

    return { status: true, message: 'Moved successfully!', data: await storeTable.move(targetTableId) }
  }
}
