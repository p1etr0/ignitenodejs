import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)

  })

  it("should not be able to add a new specification to a now-existent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["45122"];
  
      await createCarSpecificationUseCase.execute({car_id, specifications_id})

    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to add a new specification", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Brand", 
      category_id: "C", 
      daily_rate: 100, 
      description: "Description Car", 
      fine_amount: 60, 
      license_plate: "ABC-123", 
      name: "Name Car"
    })
    const car_id = "1234";
    const specifications_id = ["45122"];

    await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id})
  })
})