const fetch = require('sync-fetch');
const path = require('path');
const jsonGraphqlExpress = require('json-graphql-server').default;
const createHandler = require("azure-function-express").createHandler;
const jsonServer = require('json-server')
const expressSharp = require('express-sharp').expressSharp
const fsAdapter = require('express-sharp').FsAdapter


const data = fetch('https://github.com/bketelsen/bkml/releases/download/blox/data.json').json();

const router = jsonServer.router(data, { foreignKeySuffix: '_id' })
const app = require('express')();

app.use(
  '/api/images',
  expressSharp({
    imageAdapter: new fsAdapter(path.join(__dirname, '..', '..', 'app','images')),
  }));
app.use('/api/graphql', jsonGraphqlExpress(data));
app.use("/api", router);
app.use(
  '/api/images/*',
  expressSharp({
    imageAdapter: new fsAdapter(path.join(__dirname, '..', '..', 'app','images')),
  }));

module.exports = createHandler(app);
