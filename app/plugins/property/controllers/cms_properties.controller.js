'use strict';
import { ResourcesController } from "@core/modules";

export default class CmsPropertiesController extends ResourcesController {

  beforeActions() {
    return {
      loadPostType: [{ allAction: true }],
    }
  }

  responsedItems(items, queryAttrs) {
    if (queryAttrs.select2.idField) {
      items = items.map((record) => {
        if (queryAttrs.select2.textTemplate) {
          var text = Ejs.render(queryAttrs.select2.textTemplate, record);
        } else if (queryAttrs.select2.textField) {
          var text = record[queryAttrs.select2.textField];
        }
        return {
          id: record[queryAttrs.select2.idField],
          text: `${text} ${record.customFields && record.customFields.length ? '(custom fields)' : ''}`,
          customFields: record.customFields,
          customConfig: record.customConfig,
        }
      });
    }

    return items;
  }

  async loadPostType() {
    let postType = this.request.params.postType || 'post';
    if (this.request.method.toLowerCase() == 'get') {
      this.request.query.postType = postType;
    } else if (['post', 'put'].includes(this.request.method.toLowerCase())) {
      this.request.payload.postType = postType;
    }
  }
}
