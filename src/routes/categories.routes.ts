import { Category } from '.model/Category.ts ';
import {Router} from 'express';
import {v4 as uuidv4} from 'uuid';


const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/", (request, response) => {
  const {name, description} = request.body;

  const category = {
    name,
    description,
    id: uuidv4()
  }

  categories.push(category)

  return response.status(201).send();
})

export {categoriesRoutes}