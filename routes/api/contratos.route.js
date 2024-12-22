var express = require('express')
var router = express.Router()
var ContratoController = require('../../controllers/contratos.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/contratos.routes');
  });
router.post('/publicar', ContratoController.publicarContratacion)
router.put('/modificar', ContratoController.modificarContratacion)
router.delete('/borrar', ContratoController.borrarContratacion)
router.get('/getcontrataciones', ContratoController.getContrataciones)


// Export the Router
module.exports = router;


