import { Router } from 'express';
import { clienteController } from '../controllers/Cliente';
const  clienteRouter = Router();
clienteRouter.post('/cad', clienteController.insertCliente);
clienteRouter.get('/', clienteController.listCliente);
clienteRouter.get('/:id', clienteController.getcliente);
clienteRouter.delete('/:id', clienteController.deleteCliente);
clienteRouter.put('/:id', clienteController.updateCliente);
export { 
    clienteRouter,
}