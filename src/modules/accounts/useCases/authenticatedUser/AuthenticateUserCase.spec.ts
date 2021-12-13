import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let createUserUsecase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider)
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
    await expect( authenticateUserUseCase.execute({
      email: "false@email.com", 
      password: "123456"
    })

    ).rejects.toEqual(new AppError("Email or Password incorrect!"))
  })


  it("should not be able to authenticate an incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "9999",
      email: "user@user.com",
      password: "1234",
      name: "User Test"
    }
    await createUserUsecase.execute(user)

    await expect(authenticateUserUseCase.execute({email: user.email, password: "incorrect Password"})

    ).rejects.toEqual(new AppError("Email or Password incorrect!"))
  })
})