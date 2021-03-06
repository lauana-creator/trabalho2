import { dbQuery, dbQueryFirst } from "../services/db"

export type Cliente = {
    id: number;
    name: string;
    endereco: number;
    telefone: string;
    login: string;
}


export type Product = {
    id: number;
    name: string;
    price: number;
    sabor: string;
}


export type Venda = {
    id:number;
    produto: Product;
    cliente: Cliente;
    total: number;
    qtd: number;

}

const insertVendas  = async (cliente:string, produto:string, price: number, qtd: number) => {
    let total = price * qtd;
    await dbQuery(`INSERT INTO venda (produto,price,qtd,total,cliente) VALUES (?,?,?,?,?)`,[produto,price,qtd,total,cliente]);
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'venda'`);
    return getVenda(retorno[0].id)
}
const updateVenda = async (venda: Venda, price: number) => {
    await dbQuery(`UPDATE venda SET produto=?,price=?,qtd=?,total=?,cliente = ? WHERE id = ?`, [venda.produto,price,venda.qtd,venda.total,venda.cliente,venda.id])
    return getVenda(venda.id);
}

const listVenda = async () => {
    const retorno = await dbQuery(`SELECT * FROM venda`);
    return retorno as Venda[];
}

const getVenda = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM venda WHERE id = ?`, [id]);
    return retorno as Venda| undefined;
}

const deleteVenda = async (id: number) => {
    await dbQueryFirst(`DELETE FROM venda WHERE id = ?`, [id]);
}

export const vendaModel = {
    insertVendas,
    listVenda,
    getVenda,
    deleteVenda,
    updateVenda
}