import {ICreateUserDTO} from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'
import { UserTokens } from '../infra/typeorm/entities/UsersTokens'


interface IUsersRepository{

  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findByEmailToForgotPassword(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>
 

}

export {IUsersRepository}