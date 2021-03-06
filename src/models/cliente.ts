import { dbQuery, dbQueryFirst } from "../services/db"

export type Cliente = {
    id: number;
    name: string;
    endereco: number;
    telefone: string;
    login: string;
}

const insertCliente = async (cliente: Cliente) => {
    await dbQuery(`INSERT INTO cliente (name, endereco, telefone, login) VALUES(?, ?, ?, ?)`, [cliente.name, cliente.endereco,cliente.telefone,cliente.login])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'cliente'`);
    return getCliente(retorno[0].Id);
}

const updateCliente = async (cliente: Cliente, id:number) => {
    await dbQuery(`UPDATE cliente SET name = ?, endereco = ?, telefone = ?, login = ? WHERE id = ?`, [cliente.name, cliente.endereco, cliente.telefone, cliente.login,id])
    return getCliente(cliente.id);
}

const listCliente = async () => {
    const retorno = await dbQuery(`SELECT * FROM cliente`);
    return retorno as Cliente[];
}

const getCliente = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM cliente WHERE id = ?`, [id]);
    return retorno as Cliente | undefined;
}

const deleteCliente = async (id: number) => {
    await dbQueryFirst(`DELETE FROM cliente WHERE id = ?`, [id]);
}

export const clienteModel = {
    insertCliente,
    listCliente,
    getCliente,
    deleteCliente,
    updateCliente
}