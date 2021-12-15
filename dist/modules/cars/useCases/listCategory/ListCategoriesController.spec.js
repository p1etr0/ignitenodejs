"use strict";

var _bcryptjs = require("bcryptjs");

var _app = require("../../../../shared/infra/http/app");

var _supertest = _interopRequireDefault(require("supertest"));

var _typeorm = _interopRequireDefault(require("../../../../shared/infra/typeorm"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)("admin", 8);
    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
                      VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXX')`);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("Should be able to list all categories", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });
    const {
      refresh_token
    } = responseToken.body;
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    const response = await (0, _supertest.default)(_app.app).get("/categories");
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });
});