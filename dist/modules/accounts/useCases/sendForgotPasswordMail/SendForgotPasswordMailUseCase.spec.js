"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  }); // it("should be able to send a forgot password mail to user", async () => {
  //   const sendMail = jest.spyOn(mailProvider, "sendMail")
  //   await usersRepositoryInMemory.create({
  //     driver_license: "598284",
  //     email: "lup@ciiwasi.se",
  //     name: "Ricardo Bailey",
  //     password: "1234",
  //   });
  //   await sendForgotPasswordMailUseCase.execute("lup@ciiwasi.se")
  //   expect(sendMail).toHaveBeenCalled()
  // })

  it("Should not be able to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("ka@uj.gr")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  }); // it("Should be able to create an users token", async ()=> {
  //   const generateTokenMail =jest.spyOn(usersRepositoryInMemory, "create")
  //   await usersRepositoryInMemory.create({
  //     driver_license: "863418",
  //     email: "zikcunvu@mi.gf",
  //     name: "Bessie Graham",
  //     password: "4321",
  //   });
  //   await sendForgotPasswordMailUseCase.execute("zikcunvu@mi.gf")
  //   expect(generateTokenMail).toBeCalled()
  // })
});