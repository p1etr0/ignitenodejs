"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _jsonwebtoken = require("jsonwebtoken");

var _bcryptjs = require("bcryptjs");

var _AppError = require("../../../../shared/errors/AppError");

var _IUsersTokensRepository = require("../../repositories/IUsersTokensRepository");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(usersRepository, usersTokensRepository, dateProvider) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email);
    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = _auth.default;

    if (!user) {
      throw new _AppError.AppError("Email or Password incorrect!");
    }

    const passwordMatch = await (0, _bcryptjs.compare)(password, user.password);

    if (!passwordMatch) {
      throw new _AppError.AppError("Email or Password incorrect!");
    }

    const token = (0, _jsonwebtoken.sign)({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    });
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    });
    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);
    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date
    });
    const tokenReturn = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token
    };
    return tokenReturn;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;