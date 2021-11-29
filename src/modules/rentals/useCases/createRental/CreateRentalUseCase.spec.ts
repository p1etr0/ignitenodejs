import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider

describe("Create Rental", () => {
  const dayAdd24hrs = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayJsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider)
  });


  it("should be able to create a new rental", async () => {
  
    const rental =  await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "1212",
      expected_return_date: dayAdd24hrs
    });


    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  })


  it("should not be able to create a new rental if there is another open to the same user", async () => {
  
    expect(async () => {

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1212",
        expected_return_date: dayAdd24hrs
      });
  
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1212",
        expected_return_date: dayAdd24hrs
      });

    }).rejects.toBeInstanceOf(AppError)

  })


  it("should not be able to create a new rental if there is another open to the same car", async () => {
  
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayAdd24hrs
      });
  
      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayAdd24hrs
      });

    }).rejects.toBeInstanceOf(AppError)

  })


  it("should not be able to create a new rental with invalid return time", async () => {
  
    
    expect(async () => {
    
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate()
      });

    }).rejects.toBeInstanceOf(AppError)

  })
})