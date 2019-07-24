import ResourcesService from "@general/resources_service";

export default class StoreTableService {
  constructor(url) {
    this.resources = new ResourcesService(url);
  }
}