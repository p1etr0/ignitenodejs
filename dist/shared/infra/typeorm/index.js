"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

// getConnectionOptions().then(options => {
//   const newOptions = options as IOptions;
//   newOptions.host = '172.17.0.1'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//   createConnection({
//     ...options,
//   });
// }).catch(e => {console.log(e)});
var _default = async (host = "172.17.0.1") => {
  const defaultOptions = await (0, _typeorm.getConnectionOptions)();
  return (0, _typeorm.createConnection)(Object.assign(defaultOptions, {
    host: process.env.NODE_ENV === "test" ? "localhost" : host,
    database: process.env.NODE_ENV === "test" ? "rentx_test" : defaultOptions.database
  }));
};

exports.default = _default;