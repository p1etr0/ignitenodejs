import "reflect-metadata";
import "dotenv/config"
import express, {Request, Response, NextFunction} from 'express';
import "express-async-errors";
import swaggerUi from 'swagger-ui-express'
import { router } from './routes';
import swaggerFile from '../../../swagger.json'


import createConnection from "@shared/infra/typeorm"

import "@shared/container"
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";

createConnection()

const app = express();

app.use(express.json());

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "erros",
    message: `Internal server error - ${err.message}`
  })
})


export { app }