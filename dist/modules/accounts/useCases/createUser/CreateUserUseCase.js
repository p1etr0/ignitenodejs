"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _bcryptjs = require("bcryptjs");

var _AppError = require("../../../../shared/errors/AppError");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    driver_license,
    email,
    password
  }) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new _AppError.AppError("User already exists");
    }

    const passwordHash = await (0, _bcryptjs.hash)(password, 8);
    await this.usersRepository.create({
      name,
      driver_license,
      email,
      password: passwordHash
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;