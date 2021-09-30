import 'reflect-metadata';
import {container} from 'tsyringe';


import {ICategoriesRepository} from '../../modules/cars/repositories/ICategoriesRepository'
import {CategoriesRepository} from '../../modules/cars/repositories/implementations/CategoriesRepository'
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
import {IUsersRepository} from '../../modules/accounts/repositories/IUsersRepository'
import {UsersRepository} from '../../modules/accounts/repositories/implementations/UsersRepository'


container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)


