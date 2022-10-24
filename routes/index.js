var express = require('express');
var router = express.Router();
const usuarioController=require('../controllers/usuarioController')

router.get('biblioteca/',function(req, res,next){
    res.render('index', { title: 'Bienvenido',mjs:''});
});
router.post('biblioteca/login',usuarioController.login);
router.get('biblioteca/cerrar_sesion',usuarioController.cerrar_sesion);

module.exports = router;
