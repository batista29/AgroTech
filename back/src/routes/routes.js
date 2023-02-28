const express = require('express');

const router = express.Router();

const Middleware = require('../middleware/middleware');

const Usuario = require('../controller/Usuario');

router.post('/usuario', Usuario.create)
router.get('/usuario', Usuario.read)
router.get('/usuario/:id', Usuario.readId)
router.put('/usuario/:id', Usuario.update)
router.post('/usuario/login', Usuario.login)
router.delete('/usuario/:id', Usuario.del)

const Motorista = require('../controller/Motorista');

router.post('/motorista',Middleware.autenticacao, Motorista.create)
router.get('/motorista', Motorista.read)
router.get('/motorista/:id', Motorista.readId)
router.put('/motorista/:id',Middleware.autenticacao, Motorista.update)
router.delete('/motorista/:id',Middleware.autenticacao, Motorista.del)

const Servicos = require('../controller/servicos');

router.post('/servicos', Middleware.autenticacao,Servicos.create)
router.get('/servicos', Servicos.read)
router.get('/servicos/:id', Servicos.readId)
router.put('/servicos/:motoristaId',Middleware.autenticacao, Servicos.update)
router.delete('/servicos/:motoristaId',Middleware.autenticacao, Servicos.del)

const Frotas = require('../controller/frotas');

router.post('/frotas',Middleware.autenticacao, Frotas.create)
router.get('/frotas', Frotas.read)
router.get('/frotas/:id', Frotas.readId)
router.put('/frotas/:id', Middleware.autenticacao,Frotas.update)
router.delete('/frotas/:id',Middleware.autenticacao, Frotas.del)

const Manutencao = require('../controller/manutencao');

router.post('/manutencao',Middleware.autenticacao, Manutencao.create)
router.get('/manutencao', Manutencao.read)
router.get('/manutencao/:id', Manutencao.readId)
router.put('/manutencao/:id', Middleware.autenticacao,Manutencao.update)
router.delete('/manutencao/:id',Middleware.autenticacao, Manutencao.del)

module.exports = router;
