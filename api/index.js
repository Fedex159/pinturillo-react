const app = require("./src/app.js");
const { socket } = require("./src/utils/index");
const { db } = require("./src/db");

const server = app.listen(3001, () => {
  console.log(`--------listening on port 3001---------`);
  db();
});

socket(server);
