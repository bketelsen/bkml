const fetch = require("sync-fetch");

const jsonGraphqlExpress = require("json-graphql-server").default
const jsonServer = require('json-server')
const express = require("express");

const data = fetch(
  "https://github.com/bketelsen/bkml/releases/download/blox/data.json"
).json();
const app = require("express")();
var cors = require('cors')
app.use(cors())
const router = jsonServer.router(data, { foreignKeySuffix: '_id' })


app.use("/api/graphql", jsonGraphqlExpress(data));
app.use("/api", router);

console.log(data);

const port = process.env.PORT || 3000;

module.exports = app.listen(port, () =>
  console.log(`Server running on ${port}, http://localhost:${port}`)
);
