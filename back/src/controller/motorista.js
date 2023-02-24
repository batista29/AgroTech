const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let motorista = await prisma.Motorista.create({
        data: req.body
    });

    res.status(200).json(motorista).end();
}

const read = async (req, res) => {
    let motorista = await prisma.Motorista.findMany();

    res.status(200).json(motorista).end();
}

const readId = async (req, res) => {
    let motorista = await prisma.Motorista.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(motorista).end();
}

const update = async (req, res) => {
    let motorista = await prisma.Motorista.update({
        data: {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            cargo: req.body.cargo
        },
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(motorista).end();
}

const del = async (req, res) => {
    let motorista = await prisma.Motorista.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(motorista).end();
}

module.exports = {
    create,
    read,
    readId,
    update,
    del
}