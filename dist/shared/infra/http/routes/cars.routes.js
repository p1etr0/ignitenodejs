"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carRoutes = void 0;

var _CreateCarController = require("../../../../modules/cars/useCases/CreateCars/CreateCarController");

var _CreateCarSpecificationController = require("../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _ListAvailableCarsController = require("../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController");

var _UploadCarImagesController = require("../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController");

var _express = require("express");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carRoutes = (0, _express.Router)();
exports.carRoutes = carRoutes;
const createCarController = new _CreateCarController.CreateCarController();
const listAvailableCarsController = new _ListAvailableCarsController.ListAvailableCarsController();
const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const uploadCarImagesController = new _UploadCarImagesController.UploadCarImagesController();
const upload = (0, _multer.default)(_upload.default);
carRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarController.handle);
carRoutes.get("/available", listAvailableCarsController.handle);
carRoutes.post("/specifications/:id", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationController.handle);
carRoutes.post("/images/:id", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, upload.array("images"), uploadCarImagesController.handle);