import { Router } from 'express';
import { vendaController } from '../controllers/venda';
const vendaRouter = Router();
vendaRouter.post('/venda', vendaController.insertVenda);
vendaRouter.get('/', vendaController.listVenda);
vendaRouter.get('/:id', vendaController.getvenda);
vendaRouter.delete('/:id', vendaController.deleteVenda);
vendaRouter.put('/:id', vendaController.updateVenda);
export { 
    vendaRouter,

}