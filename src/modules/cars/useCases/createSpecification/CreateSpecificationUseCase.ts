import { AppError } from "@shared/errors/AppError";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository){ }

  async execute({name, description}: IRequest): Promise<void>{
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if(specificationAlreadyExists){
      throw new AppError("Specification Already Exists")
    }

    await this.specificationsRepository.create({name, description});
  }
}

export {CreateSpecificationUseCase}