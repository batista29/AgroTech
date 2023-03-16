const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        let motorista = await prisma.Motorista.create({
            data: req.body
        });
        res.status(200).json(motorista).end();
    } catch (err) {
        if (err.code == "P2003")
            res.status(404).json(err).end();
        else
            res.status(400).json(err).end();
    }
}

const updateDisponivel = async (id) => {

    let motorista = await prisma.Motorista.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            status: true
        }
    })

    let motoristaUpdate = await prisma.Motorista.update({
        where: {
            id: motorista.id
        },
        data: {
            status: true
        }
    })

}

const updateIndisponivel = async (id) => {
    let motorista = await prisma.Motorista.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            status: true
        }
    })

    let motoristaUpdate = await prisma.Motorista.update({
        where: {
            id: motorista.id
        },
        data: {
            status: false
        }
    })

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
    try {
        let motorista = await prisma.Motorista.update({
            data: {
                cpf: req.body.email,
                cnh: req.body.senha,
                nome: req.body.nome
            },
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json(motorista).end();

    } catch (error) {
        res.status(404).json(error).end();

        console.log(error)
    }
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
    del,
    updateDisponivel,
    updateIndisponivel
}