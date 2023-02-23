const express = require('express');

const router = express.Router();

const Usuario = require('../controller/Usuario');

router.post('/usuario', Usuario.create)
router.get('/usuario', Usuario.read)
router.get('/usuario/:id', Usuario.readId)
router.put('/usuario/:id', Usuario.update)
router.post('/usuario/login', Usuario.login)

const Motorista = require('../controller/Motorista');

router.post('/motorista', Motorista.create)
router.get('/motorista', Motorista.read)
router.get('/motorista/:id', Motorista.readId)
router.put('/motorista/:id', Motorista.update)

const Servicos = require('../controller/servicos');

router.post('/servicos', Servicos.create)
router.get('/servicos', Servicos.read)
router.get('/servicos/:id', Servicos.readId)
router.put('/servicos/:motoristaId', Servicos.update)

const Frotas = require('../controller/frotas');

router.post('/frotas', Frotas.create)
router.get('/frotas', Frotas.read)
router.get('/frotas/:id', Frotas.readId)
router.put('/frotas/:id', Frotas.update)

module.exports = router;