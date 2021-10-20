import { AppError } from "../../../../errors/AppError"
import { ICreateUserDTO } from "../../dtos/ICreateDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUsecase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUsecase = new CreateUserUseCase(usersRepositoryInMemory)
  })
  
  it("should be able to authenticate an user", async () => {
    const user : ICreateUserDTO = {
      driver_license: "000123",
      email: "user@teste.com",
      password: "123",
      name: "User Test"
    }

    await createUserUsecase.execute(user)

    const result = await authenticateUserUseCase.execute({email: user.email, password: user.password});

    expect(result).toHaveProperty("token")
  })


  it("should be able to authenticate an nonexistent user", async () => {
    expect(async () => {

      await authenticateUserUseCase.execute({email: "false@email.com", password: "123456"});

    }).rejects.toBeInstanceOf(AppError)
  })


  it("should not be able to authenticate an incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "9999",
        email: "user@user.com",
        password: "1234",
        name: "User Test"
      }
      await createUserUsecase.execute(user)

      await authenticateUserUseCase.execute({email: user.email, password: "incorrect Password"});

    }).rejects.toBeInstanceOf(AppError)
  })
})