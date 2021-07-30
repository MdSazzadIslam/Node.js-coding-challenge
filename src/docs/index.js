const basicinfo = require("./basicInfo");
const server = require("./server");
const components = require("./components");
const tag = require("./tag");
const routes = require("./routes");

module.exports = {
  ...basicinfo,
  ...server,
  ...components,
  ...tag,
  ...routes,
};
