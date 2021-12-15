"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("../entities/User");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _class;

let UsersRepository = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }

  async findByEmail(email) {
    const user = await this.repository.findOne({
      email
    });
    return user;
  }

  async findByEmailToForgotPassword(email) {
    const user = await this.repository.findOne(email);
    return user;
  }

  async findById(id) {
    const user = await this.repository.findOne(id);
    return user;
  }

  async create({
    name,
    email,
    driver_license,
    password,
    avatar,
    id
  }) {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id
    });
    await this.repository.save(user);
  }

}) || _class) || _class) || _class);
exports.UsersRepository = UsersRepository;