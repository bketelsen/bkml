const fs = require('fs');
const path = require('path');
const jsonGraphqlExpress = require("json-graphql-server").default;
const jsonServer = require('json-server')
const express = require("express");
const datafile = path.join(__dirname, ".build", "data.json");


var data = {}

const file = JSON.parse(fs.readFileSync(datafile, 'utf8'));
data = file;

const app = require("express")();
const router = jsonServer.router(data, { foreignKeySuffix: '_id' })

app.use(express.static('static'))
app.use("/graphql", jsonGraphqlExpress(data));
app.use("/", router);


const port = process.env.PORT || 4000;

module.exports = app.listen(port, () =>
  console.log(`Server running on ${port}, http://localhost:${port}`)
);
