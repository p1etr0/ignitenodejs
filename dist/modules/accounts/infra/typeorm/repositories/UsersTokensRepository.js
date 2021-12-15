"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;

var _typeorm = require("typeorm");

var _UsersTokens = require("../entities/UsersTokens");

class UsersTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_UsersTokens.UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    });
    await this.repository.save(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const usersTokens = await this.repository.findOne({
      user_id,
      refresh_token
    });
    return usersTokens;
  }

  async deleteById(id) {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token) {
    const userToken = await this.repository.findOne({
      refresh_token
    });
    return userToken;
  }

}

exports.UsersTokensRepository = UsersTokensRepository;