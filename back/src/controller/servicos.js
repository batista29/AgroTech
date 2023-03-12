const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        let servicos = await prisma.Servico.create({
            data: req.body
        });
        res.status(200).json(servicos).end();
    } catch (err) {
        if (err.code == "P2003")
            res.status(404).json(err).end();
        else
            res.status(400).json(err).end();
    }
}

const read = async (req, res) => {
    let servicos = await prisma.Servico.findMany({
        select: {
            id: true,
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
    try {
        let servicos = await prisma.Servico.update({
            data: {
                data_retorno: req.body.data_retorno,
                descricao: req.body.descricao,
            },
            where: {
                id: Number(req.body.motoristaId)
            }
        });
        res.status(200).json(servicos).end();
    } catch (error) {
        res.status(404).json(error).end();

        console.log(error)
    }
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