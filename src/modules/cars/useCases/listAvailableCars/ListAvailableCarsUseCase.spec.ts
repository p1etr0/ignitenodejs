import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available cars", async () => {
   const car = await carsRepositoryInMemory.create({
      "name": "Car1",
      "brand": "Car Brand",
      "category_id": "category_id",
      "daily_rate":  110.00,
      "description": "Car descrip",
      "fine_amount":  40,
      "license_plate": "WERT-12-12"
    });


    const cars = await listCarsUseCase.execute({})
    
    expect(cars).toEqual([car])
  })

  
  
  it("should be able to list all available cars by brand", async () => {

    const car = await carsRepositoryInMemory.create({
      "name": "Car2",
      "brand": "Car_brand_test",
      "category_id": "category_id",
      "daily_rate":  110.00,
      "description": "Car descrip",
      "fine_amount":  40,
      "license_plate": "WERT-12-12"
    });


    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test",
    })
    
    
    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by name", async () => {

    const car = await carsRepositoryInMemory.create({
      "name": "Car3",
      "brand": "Car_brand",
      "category_id": "category_id",
      "daily_rate":  110.00,
      "description": "Car descrip",
      "fine_amount":  40,
      "license_plate": "WERT-1215"
    });


    const cars = await listCarsUseCase.execute({
      name: "Car3",
    })
    
    
    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by caetgory", async () => {

    const car = await carsRepositoryInMemory.create({
      "name": "Car4",
      "brand": "Car_brand",
      "category_id": "12345",
      "daily_rate":  110.00,
      "description": "Car descrip",
      "fine_amount":  40,
      "license_plate": "WERT-1215"
    });


    const cars = await listCarsUseCase.execute({
      category_id: "12345",
    })
    
    
    expect(cars).toEqual([car])
  })
})