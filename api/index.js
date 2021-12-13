const { app } = require("./src/app.js");
const { socket } = require("./src/utils/index");

const server = app.listen(3001, () => {
  console.log(`--------listening on port 3001---------`);
});

socket(server);
