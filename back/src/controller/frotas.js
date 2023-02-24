const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let frotas = await prisma.Frota.create({
        data: req.body
    });

    res.status(200).json(frotas).end();
}

const read = async (req, res) => {
    let frotas = await prisma.Frota.findMany();

    res.status(200).json(frotas).end();
}

const readId = async (req, res) => {
    let frotas = await prisma.Frota.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(frotas).end();
}

const update = async (req, res) => {
    let frotas = await prisma.Frota.update({
        data: {
            marca: req.body.marca,
            modelo: req.body.modelo,
            placa: req.body.placa,
        },
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(frotas).end();
}

const del = async (req, res) => {
    let frotas = await prisma.Frota.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(frotas).end();
}

module.exports = {
    create,
    read,
    readId,
    update,
    del
}