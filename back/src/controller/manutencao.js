const { PrismaClient } = require('@prisma/client');
const Frota = require('./frotas')

const prisma = new PrismaClient();

const create = async (req, res) => {

    let veiculo = await prisma.frota.findUnique({
        where: {
            id: req.body.frotaId
        },
        select: {
            id: true,
            status: true
        }
    })

    console.log(veiculo)

    if (veiculo.status == false) {
        res.status(404).json({ "response": "veiculo ocupado" }).end();
    } else {
        try {
            let manutencao = await prisma.Manutencao.create({
                data: req.body,
                select: {
                    Frota: true
                }
            });

            Frota.updateIndisponivel(veiculo.id)

            res.status(200).json(manutencao).end();
        } catch (err) {
            if (err.code == "P2003")
                res.status(404).json(err).end();
            else
                res.status(400).json(err).end();
        }
    }
}

const read = async (req, res) => {
    let manutencao = await prisma.Manutencao.findMany({
        select: {
            id: true,
            descricao: true,
            valor: true,
            data_inicio: true,
            data_fim: true,
            frotaId: true,
            Frota: {
                select: {
                    marca: true,
                    modelo: true,
                    placa: true,
                    status: true
                }
            }
        }
    });

    res.status(200).json(manutencao).end();
}

const readId = async (req, res) => {
    let manutencao = await prisma.Manutencao.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(manutencao).end();
}

const update = async (req, res) => {
    try {

        let manutencao = await prisma.Manutencao.update({
            data: {
                descricao: req.body.descricao,
                valor: req.body.valor,
                data_fim: req.body.data_fim,
            },
            where: {
                id: Number(req.body.id)
            }
        });
        if (req.body.data_fim != null) {
            Frota.updateDisponivel(manutencao.frotaId)
        }

        res.status(200).json(manutencao).end();

    } catch (error) {
        res.status(404).json(error).end();

        console.log(error)
    }
}

const del = async (req, res) => {
    let manutencao = await prisma.Manutencao.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(manutencao).end();
}

module.exports = {
    create,
    read,
    readId,
    update,
    del
}