import _ from "lodash";

const VEHICLE_TYPE = {
  1: 'Của tôi',
  2: 'Của bạn',
  3: 'Cùng thuê'
}
const INVERT_VEHICLE_TYPE = _.invert(VEHICLE_TYPE);
const VEHICLE_TYPE_OPTIONS = Object.entries(VEHICLE_TYPE);

export default {
  VEHICLE_TYPE,
  INVERT_VEHICLE_TYPE,
  VEHICLE_TYPE_OPTIONS
}
