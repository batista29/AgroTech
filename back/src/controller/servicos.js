const { PrismaClient } = require('@prisma/client');
const Motorista = require('./motorista')
const Frota = require('./frotas')

const prisma = new PrismaClient();

const create = async (req, res) => {

    let veiculo = await prisma.Frota.findUnique({
        where: {
            id: req.body.frotaId
        },
        select: {
            status: true
        }
    })

    let motorista = await prisma.Motorista.findUnique({
        where: {
            id: req.body.motoristaId
        },
        select: {
            status: true
        }
    })

    if (veiculo.status && motorista.status === false) {
        res.status(404).json({ "response": "veiculo ou motorista ocupado" }).end();
    } else {
        try {
            let servicos = await prisma.Servico.create({
                data: req.body,
                select: {
                    Frota: true
                },
                select: {
                    Motorista: true
                }
            });

            Motorista.updateIndisponivel(req.body.motoristaId)
            Frota.updateIndisponivel(req.body.frotaId)

            res.status(200).json(servicos).end();
        } catch (err) {
            if (err.code == "P2003")
                res.status(404).json(err).end();
            else
                res.status(400).json(err).end();
        }
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
                    placa: true,
                    status: true
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
                id: Number(req.body.id)
            }
        });

        if (req.body.data_retorno != null) {
            Frota.updateDisponivel(servicos.frotaId)
            Motorista.updateDisponivel(servicos.motoristaId)
        }

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