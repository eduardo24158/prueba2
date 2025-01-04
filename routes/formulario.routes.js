var express = require('express');
var router = express.Router();
const {ContactosController}=require('../controllers/ContactosController')

router.post('/contacto',  ContactosController.add)


module.exports = router;

