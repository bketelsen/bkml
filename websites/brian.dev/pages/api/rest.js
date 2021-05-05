import jsonGraphqlExpress from "json-server";
import nc from "next-connect";

const fetch = require("sync-fetch");
const data = fetch(
  "https://github.com/bketelsen/bkml/releases/download/blox/data.json"
).json();



const handler = nc()
  .use("/api/rest", jsonServer(data))

export default handler;






