"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _routes = require("./routes");

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

var _typeorm = _interopRequireDefault(require("../typeorm"));

require("../../container");

var _AppError = require("../../errors/AppError");

var _upload = _interopRequireDefault(require("../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _typeorm.default)();
const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
app.use("/avatar", _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use("/cars", _express.default.static(`${_upload.default.tmpFolder}/cars`));
app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use(_routes.router);
app.use((err, request, response, next) => {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: "erros",
    message: `Internal server error - ${err.message}`
  });
});