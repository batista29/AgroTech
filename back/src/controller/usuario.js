const jwt = require('jsonwebtoken');
require('dotenv').config()
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let usuario = await prisma.Usuario.create({
        data: req.body
    });

    res.status(200).json(usuario).end();
}

const read = async (req, res) => {
    let usuario = await prisma.Usuario.findMany();

    res.status(200).json(usuario).end();
}

const login = async (req, res) => {
    const usuario = await prisma.Usuario.findMany({
        where: {
            AND: [
                { email: req.body.email },
                { senha: req.body.senha }
            ]
        }
    })

    if (usuario.length > 0) {

        jwt.sign(usuario[0], process.env.KEY, { expiresIn: '10h' }, function (err, token) {
            if (err == null) {
                usuario[0]["token"] = token
                res.status(202).json({ usuario }).end()
            } else {
                res.status(404).json(err).end()
            }
        })
    } else {
        res.status(404).json({"menssagem": "usuario nop"}).end()  
    }
}

const readId = async (req, res) => {
    let usuario = await prisma.Usuario.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(usuario).end();
}

const update = async (req, res) => {
    let usuario = await prisma.Usuario.update({
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

    res.status(200).json(usuario).end();
}

const del = async (req, res) => {
    let usuario = await prisma.Usuario.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(usuario).end();
}

module.exports = {
    create,
    read,
    readId,
    update,
    login,
    del
}