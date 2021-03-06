import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Venda, vendaModel } from '../models/venda';

const insertVenda = (req: Request, res: Response) => {

    {
        const venda = req.body;
        if (!venda)
            return badRequest(res, "Venda inválida");

        if (!venda.produto)
            return badRequest(res, 'Informe o produto');

        if (!venda.cliente)
            return badRequest(res, 'Informe o cliente');


        if (!validateNumber(venda.qtd))
            return badRequest(res, 'Informe a quantidade');
    }

    const {cliente,produto, price, qtd}= req.body;
    return vendaModel.insertVendas(cliente,produto,price,qtd)
        .then(venda=> {
            res.json(venda);
        })
        .catch(err => internalServerError(res, err));
}


const updateVenda = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const venda = req.body as Venda;
        console.log(venda.total)
        console.log(venda.qtd)
        console.log(venda.cliente)
        console.log(venda.produto)
        console.log(venda.id)

        if (!venda)
            return badRequest(res, "Venda inválida");

        if (!venda.produto)
            return badRequest(res, 'Informe o produto');

        if (!venda.cliente)
            return badRequest(res, 'Informe o cliente');

        if (!validateNumber(venda.total))
            return badRequest(res, 'Informe o total');

        if (!validateNumber(venda.qtd))
            return badRequest(res, 'Informe a quantidade');
        
        

        const vendaSaved = await vendaModel.getVenda(id);
        if(!vendaSaved)
            return notFound(res);
    }

    const {price} = req.body;
    const venda  = req.body as Venda;
   
    return vendaModel.updateVenda(venda, price)
        .then(venda => {
            res.json(venda)
        })
        .catch(err => internalServerError(res, err));
}


const listVenda = ({}: Request, res: Response) => {
    vendaModel.listVenda()
        .then(venda => {
            res.json(venda)
        })
        .catch(err => internalServerError(res, err));
}

const getvenda = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return vendaModel.getVenda(id)
        .then((venda) => {
            if(venda)
                return res.json(venda);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteVenda = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const vendaSaved = await vendaModel.getVenda(id);
        if(!vendaSaved)
            return notFound(res);
    }

    return vendaModel.deleteVenda(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const vendaController = {
    insertVenda,
    listVenda,
    getvenda,
    deleteVenda,
    updateVenda
}