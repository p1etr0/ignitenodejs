import { IUsersRepository } from "../IUsersRepository";
import {ICreateUserDTO} from '../../dtos/ICreateDTO'
import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";


class UsersRepository implements IUsersRepository{

  private repository: Repository<User>

  constructor(){
    this.repository = getRepository(User)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({email});

    return user;
  }

  async create({name, email, driver_license, password}: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name, 
      email,
      driver_license, 
      password, 
    })

    await this.repository.save(user)
  }

}

export {UsersRepository}