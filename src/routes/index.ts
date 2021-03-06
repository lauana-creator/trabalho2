import * as  Router from  'express';
import{ productRouter} from "./products";
import{ clienteRouter} from "./cliente";
import{ vendaRouter} from "./venda";
export const useRoutes = (app: Router.Application) => {
    const apiRouter = Router();
    apiRouter.use('/products', productRouter);
    
    apiRouter.use('/cliente', clienteRouter);
    
    apiRouter.use('/venda', vendaRouter);

    app.use('/api/v1', apiRouter);
}
