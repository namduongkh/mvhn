
import ResourceService from "@CmsCore/vue/general/resources_service";

export default class PagingService {

  constructor(url, perPage = 20, conditions = {}) {
    this.service = new ResourceService(url);
    this.perPage = perPage;
    this.conditions = conditions;
    this.lastPage = false;
  }

  next() {
    if (this.lastPage) return new Promise((rs) => rs());

    if (!this.page) this.page = 0;

    this.page++;
    return this.fetch();
  }

  back() {
    if (this.page == 1) return new Promise((rs) => rs());

    this.page--;
    return this.fetch();
  }

  fetch(page) {
    let promise = this.service.index(Object.assign({
      page: page || this.page,
      perPage: this.perPage
    }, this.conditions));

    this.checkLastPage(promise);

    return promise;
  }

  checkLastPage(promise) {
    promise.then(({ data }) => {
      if (Array.isArray(data)) {
        this.lastPage = data.length < this.perPage;
      } else if (Array.isArray(data.data)) {
        this.lastPage = (data.lastPage == this.page) || (data.data.length < this.perPage);
      }
    })
  }
}
