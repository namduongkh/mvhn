import Permit from '../views/skin/core/scripts/permit';
import mongoose from "mongoose";
import _ from "lodash";

const UserGroup = mongoose.model('UserGroup');
const UserRight = mongoose.model('UserRight');

export default class PermitService extends Permit {
  static async accessibles(scope = []) {
    if (!scope.length) return [];

    let groups = await UserGroup.find({
      slug: { $in: scope }
    }, "allowedRights").lean();

    let rightIds = _.compact(_.flatten(_.map(groups, 'allowedRights')));
    if (!rightIds.length) return [];

    let rights = await UserRight.find({
      _id: { $in: rightIds }
    }, "controller action").lean();

    rights = rights.map(right => { return `(${right.controller})/(${right.action})` });

    return rights;
  }
}
