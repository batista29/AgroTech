const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let servicos = await prisma.Servico.create({
        data: req.body
    });

    res.status(200).json(servicos).end();
}

const read = async (req, res) => {
    let servicos = await prisma.Servico.findMany({
        select: {
            data_saida: true,
            data_retorno: true,
            descricao: true,
            motoristaId: true,
            Frota: {
                select: {
                    marca: true,
                    modelo: true,
                    placa: true
                }
            }
        }
    }
    );

    res.status(200).json(servicos).end();
}

const readId = async (req, res) => {
    let servicos = await prisma.Servico.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(servicos).end();
}

const update = async (req, res) => {
    let servicos = await prisma.Servico.update({
        data: {
            data_retorno: req.body.data_retorno,
            descricao: req.body.descricao,
        },
        where: {
            id: Number(req.params.motoristaId)
        }
    });

    res.status(200).json(servicos).end();
}

const del = async (req, res) => {
    let servicos = await prisma.Servico.delete({
        where: {
            id: Number(req.params.motoristaId)
        }
    });

    res.status(200).json(servicos).end();
}

module.exports = {
    create,
    read,
    readId,
    update,
    del
}