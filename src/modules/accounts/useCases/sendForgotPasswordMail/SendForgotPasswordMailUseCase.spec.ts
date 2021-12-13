import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it("should be able to send a forgot password mail to user", async () => {

    const sendMail = jest.spyOn(mailProvider, "sendMail")
    
    await usersRepositoryInMemory.create({
      driver_license: "598284",
      email: "lup@ciiwasi.se",
      name: "Ricardo Bailey",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("lup@ciiwasi.se")

    expect(sendMail).toHaveBeenCalled()
  })

  it("Should not be able to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("ka@uj.gr")).rejects.toEqual(new AppError("User does not exists!"))
  })

  it("Should be able to create an users token", async ()=> {
    const generateTokenMail =jest.spyOn(usersRepositoryInMemory, "create")

    await usersRepositoryInMemory.create({
      driver_license: "863418",
      email: "zikcunvu@mi.gf",
      name: "Bessie Graham",
      password: "4321",
    });

    await sendForgotPasswordMailUseCase.execute("zikcunvu@mi.gf")

    expect(generateTokenMail).toBeCalled()
  })
})