import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationDTO{
  name: string;
  description: string;
}


interface ISpecificationRepository {

  create({description, name}: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
  findByIds(ids: string[]): Promise<Specification[]>

}


export {ISpecificationRepository, ICreateSpecificationDTO}