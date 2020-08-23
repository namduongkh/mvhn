# MVHN
Dependencies:

```
npm install -g node-gyp nodemon npm-run-all
```

Copy `app/config/sample-development` to `development.conf.js` and update the configuration.

Add `.env` file and update some environment variables if necessary

Start: `npm start` or `yarn start`

Build: `npm build` or `yarn build`

Deploy: `npm run deploy` or `yarn deploy`


Excute script command: `npm run execute ./scripts/<command>` or `yarn execute ./scripts/<command>`

Available scripts (`app/scripts`):

```
console
export_db
import_db
generate_plugin
generate_cms_plugin
generate_migration
migrate
generate_sitemaps
generate_text_search
reindex_text_search
medias_sync
```
