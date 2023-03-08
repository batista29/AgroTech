const jwt = require('jsonwebtoken');
require('dotenv').config()
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const create = async (req, res) => {
    data = req.body

    data.senha = await bcrypt.hash(req.body.senha, 10)

    let usuario = await prisma.Usuario.create({
        data: data
    });

    res.status(200).json(usuario).end();
}

const read = async (req, res) => {
    let usuario = await prisma.Usuario.findMany();

    res.status(200).json(usuario).end();
}

const login = async (req, res) => {

    const user = await prisma.usuario.findFirst({
        where: { email: req.body.email }

    }).catch(err => {
        console.log(err)
    })

    if (user) {
        //comparando a senha que o usuario digitou com a senha criptgrafada
        if (await bcrypt.compare(req.body.senha, user.senha)) {
            var result = user

            jwt.sign(result, process.env.KEY, { expiresIn: '10h' }, function (err, token) {

                if (err == null) {
                    // adicionando um token quando o usuário logar
                    result["token"] = token
                    res.status(200).json({ result }).end()
                } else {
                    res.status(404).json(err).end()
                }
            })
        }
    } else {
        res.status(404).json({ "result": "usuario não encontrado" }).end()
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