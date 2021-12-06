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
    const car_id = "1234";
    const specifications_id = ["45122"];
    await expect(createCarSpecificationUseCase.execute({car_id, specifications_id})

    ).rejects.toEqual(new AppError("Car doe not exists!"))
  })

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Brand", 
      category_id: "C", 
      daily_rate: 100, 
      description: "Description Car", 
      fine_amount: 60, 
      license_plate: "ABC-123", 
      name: "Name Car"
    })

    const specification = await specificationsRepositoryInMemory.create({
      description: "teste",
      name: "Teste"
    })

    const car_id = "1234";
    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id});

    expect(specificationsCars).toHaveProperty("specifications")
    expect(specificationsCars.specifications.length).toBe(1)
    
  })
})