'use strict';

import TextSearchModelCreator from "../../utils/text_search_model_creator";

new TextSearchModelCreator("Post", ["_id", "title", "slug", "summary"]).perform();
new TextSearchModelCreator("Property", ["_id", "name", " slug", " type"]).perform();
new TextSearchModelCreator("Product", ["_id", "name", "price"]).perform();
