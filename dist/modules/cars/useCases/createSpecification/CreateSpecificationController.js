"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationController = void 0;

var _CreateSpecificationUseCase = require("./CreateSpecificationUseCase");

var _tsyringe = require("tsyringe");

class CreateSpecificationController {
  async handle(request, response) {
    const {
      name,
      description
    } = request.body;

    const createSpecificationUseCase = _tsyringe.container.resolve(_CreateSpecificationUseCase.CreateSpecificationUseCase);

    await createSpecificationUseCase.execute({
      name,
      description
    });
    return response.status(201).send();
  }

}

exports.CreateSpecificationController = CreateSpecificationController;