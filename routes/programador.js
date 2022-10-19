var express = require('express');
var router = express.Router();
const programadorController=require('../controllers/programadorController')
/* multer */
var multer = require('multer');
var fecha =Date.now();

var rutaAlmacenImg=multer.diskStorage(
    {
        destination:function(request,file,callback){
            callback(null,'./public/images/');
        },
        filename:function(request,file,callback){
            console.log(file);
            callback(null,fecha+"-"+file.originalname);
        }
    }
);
var cargarImg=multer({storage:rutaAlmacenImg});



/* GET home page. */
router.get('/',programadorController.index);
router.get('/agregar',programadorController.agregar);
router.post('/',cargarImg.single('img_avatar'),programadorController.guardar_programador);
router.post('/eliminar/:id',programadorController.eliminar_programador);


module.exports = router;