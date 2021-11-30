import { hash } from 'bcryptjs';
import { app } from '@shared/infra/http/app'
import request from 'supertest'

import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm'
import {v4 as uuid} from 'uuid'

let connection: Connection;
describe("Create Category Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations()

    const id = uuid();
    const password = await hash("admin", 8)

    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
                      VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXX')`)
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close()
  })
  
  it("Should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    })

    const {token} = responseToken.body
    
    await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest" 
    }).set({
      Authorization: `Bearer ${token}`
    })

    const response = await request(app).get("/categories")

    expect(response.status).toBe(201)
    expect(response.body.lenght).toBe(1)
    expect(response.body[0]).toHaveProperty("id")
    expect(response.body[0].name).toEqual("Category Supertest")
  });

})