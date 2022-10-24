var express = require('express');
var router = express.Router();
const usuarioController=require('../controllers/usuarioController')

router.get('/',function(req, res,next){
    res.render('index', { title: 'Bienvenido'});
});
router.post('/login',usuarioController.login);

module.exports = router;
