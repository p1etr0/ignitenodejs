"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarUseCase = require("./CreateCarUseCase");

class CreateCarController {
  async handle(request, response) {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    } = request.body;

    const createCarUseCase = _tsyringe.container.resolve(_CreateCarUseCase.CreateCarUseCase);

    const car = await createCarUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate
    });
    return response.status(201).json(car);
  }

}

exports.CreateCarController = CreateCarController;