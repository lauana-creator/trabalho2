import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Cliente, clienteModel } from '../models/cliente';

const insertCliente = (req: Request, res: Response) => {

    {
        const cliente = req.body;
        if (!cliente)
            return badRequest(res, "Cliente inválido");

        if (!cliente.name)
            return badRequest(res, 'Informe o nome do cliente');

        if (!cliente.endereco)
            return badRequest(res, 'Informe o  endereco');

        if (!cliente.login)
            return badRequest(res, 'Informe o  login');

        if (!validateNumber(cliente.telefone))
            return badRequest(res, 'Informe o telefone');
    }

    const cliente = req.body as Cliente;
    return clienteModel.insertCliente(cliente)
        .then(cliente => {
            res.json(cliente);
        })
        .catch(err => internalServerError(res, err));
}


const updateCliente = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const cliente = req.body;
        if (!cliente)
            return badRequest(res, "cliente inválido");

        if (!cliente.name)
            return badRequest(res, 'Informe o nome do cliente');

        if (!cliente.endereco)
            return badRequest(res, 'Informe o endereço');

        if (!cliente.login)
            return badRequest(res, 'Informe o login');

        if (!validateNumber(cliente.telefone))
            return badRequest(res, 'Informe o telefone');
        
        

        const clienteSaved = await clienteModel.getCliente(id);
        if(!clienteSaved)
            return notFound(res);
    }

    const cliente = req.body as Cliente;
    return clienteModel.updateCliente(cliente, id)
        .then(cliente => {
            res.json(cliente)
        })
        .catch(err => internalServerError(res, err));
}


const listCliente = ({}: Request, res: Response) => {
    clienteModel.listCliente()
        .then(cliente => {
            res.json(cliente)
        })
        .catch(err => internalServerError(res, err));
}

const getcliente = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return clienteModel.getCliente(id)
        .then((cliente) => {
            if(cliente)
                return res.json(cliente);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteCliente = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const clienteSaved = await clienteModel.getCliente(id);
        if(!clienteSaved)
            return notFound(res);
    }

    return clienteModel.deleteCliente(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const clienteController = {
    insertCliente,
    listCliente,
    getcliente,
    deleteCliente,
    updateCliente
}