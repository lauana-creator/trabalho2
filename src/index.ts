import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';

import {Request, Response} from 'express'
import { useRoutes } from './routes';
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

const PORT = process.env.port || 8095;
const app = express(); 
app.use(bodyParser.json());



const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Access-Control-Allow-Origin'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  };
  
  //use cors middleware
app.use(cors(options));

useRoutes(app);
app.get('/',(reg: Request, res: Response)=>{
    res.json({
        msg: 'Deu certo'
    })

})

app.options('*', cors(options));
app.listen(PORT,()=> console.log('Servidor iniciado na porta '+ PORT));
