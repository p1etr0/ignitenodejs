import {ICreateUserDTO} from '../dtos/ICreateDTO'
import { User } from '../entities/User'


interface IUsersRepository{

  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>

}

export {IUsersRepository}