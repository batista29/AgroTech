const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        let frotas = await prisma.Frota.create({
            data: req.body
        });
        res.status(200).json(frotas).end();
    } catch (err) {
        if (err.code == "P2003")
            res.status(404).json(err).end();
        else
            res.status(400).json(err).end();
    }
}

const updateDisponivel = async (id) => {


    let frotas = await prisma.Frota.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            status: true
        }
    })

    let frotasUpdate = await prisma.Frota.update({
        where: {
            id: frotas.id
        },
        data: {
            status: false
        }
    })

    console.log(frotasUpdate)
}

const updateIndisponivel = async (id) => {
    let frotas = await prisma.Frota.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            status: true
        }
    })

    let frotasUpdate = await prisma.Frota.update({
        where: {
            id: frotas.id
        },
        data: {
            status: true
        }
    })

    console.log(frotasUpdate)
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
    try {
        let frotas = await prisma.Frota.update({
            data: {
                marca: req.body.marca,
                modelo: req.body.modelo,
                placa: req.body.placa,
            },
            where: {
                id: Number(req.body.id)
            }
        });
        res.status(200).json(frotas).end();
    } catch (err) {
        if (err.code == "P2003")
            res.status(404).json(err).end();
        else
            res.status(400).json(err).end();
    }
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
    del,
    updateDisponivel,
    updateIndisponivel
}