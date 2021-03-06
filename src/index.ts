import * as dotenv from 'dotenv';
dotenv.config();


import * as express from 'express';




import {Request, Response} from 'express'
import { useRoutes } from './routes';
import * as bodyParser from 'body-parser'

const PORT = process.env.port || 8095;
const app = express(); 
app.use(bodyParser.json());
useRoutes(app);
app.get('/',(reg: Request, res: Response)=>{
    res.json({
        msg: 'Deu certo'
    })

})
app.listen(PORT,()=> console.log('Servidor iniciado na porta '+ PORT));
