const express = require('express');

const router = express.Router();

const Middleware = require('../middleware/middleware')
const Usuario = require('../controller/Usuario');

router.post('/usuario', Usuario.create)
router.get('/usuario', Usuario.read)
router.get('/usuario/:id', Usuario.readId)
router.put('/usuario/:id', Usuario.update)
router.post('/usuario/login', Usuario.login)
router.delete('/usuario/:id', Usuario.del)

const Motorista = require('../controller/Motorista');

router.post('/motorista', Motorista.create)
router.get('/motorista', Motorista.read)
router.get('/motorista/:id', Motorista.readId)
router.put('/motorista/:id', Motorista.update)
router.delete('/motorista/:id', Motorista.del)

const Servicos = require('../controller/servicos');

router.post('/servicos', Servicos.create)
router.get('/servicos', Servicos.read)
router.get('/servicos/:id', Servicos.readId)
router.put('/servicos/:motoristaId', Servicos.update)
router.delete('/servicos/:motoristaId', Servicos.del)

const Frotas = require('../controller/frotas');

router.post('/frotas', Middleware.autenticacao, Frotas.create)
router.get('/frotas', Frotas.read)
router.get('/frotas/:id', Frotas.readId)
router.put('/frotas/:id', Frotas.update)
router.delete('/frotas/:id', Frotas.del)

module.exports = router;
