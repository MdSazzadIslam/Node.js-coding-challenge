"use strict";
const express = require("express");
const routes = require("./routes");
const middleware = require("./middlewares");
const swaggerUI = require("swagger-ui-express");
const docs = require("./docs");
const app = express();

middleware(app);
app.use(routes);

app.use("/", swaggerUI.serve, swaggerUI.setup(docs));

module.exports = app;
