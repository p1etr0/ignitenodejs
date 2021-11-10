import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository{
  cars: Car[] = [];

  async create({brand, category_id, name, license_plate, daily_rate, fine_amount, description}: ICreateCarDTO): Promise<void>{
    const car = new Car();

    Object.assign(car, {
      brand, 
      category_id, 
      name,
      license_plate, 
      daily_rate, 
      fine_amount, 
      description
    });

    this.cars.push(car)
  }
}

export {CarsRepositoryInMemory}