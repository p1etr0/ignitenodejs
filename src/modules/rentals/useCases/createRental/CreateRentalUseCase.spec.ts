import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider

describe("Create Rental", () => {
  const dayAdd24hrs = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayJsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider, carsRepositoryInMemory)
  });


  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
  
    const rental =  await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24hrs
    });


    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  })


  it("should not be able to create a new rental if there is another open to the same user", async () => {

    await rentalsRepositoryInMemory.create({
      car_id: "121212",
      expected_return_date: dayAdd24hrs,
      user_id: "12345"
    })

    await expect( 
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24hrs
      })

    ).rejects.toEqual(new AppError("Car is unavailable"))

  })


  it("should not be able to create a new rental if there is another open to the same car", async () => {
  
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayAdd24hrs,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayAdd24hrs
      })

    ).rejects.toEqual(new AppError("Car is unavailable"))

  })


  it("should not be able to create a new rental with invalid return time", async () => {
    
    await expect( createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate()
      })

    ).rejects.toEqual(new AppError("Invalid return time!"))
  })
})