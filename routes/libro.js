var express = require('express');
var router = express.Router();
const libroController=require('../controllers/libroController')
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
router.get('biblioteca/',libroController.index);
router.get('biblioteca/agregar',libroController.agregar);
router.post('biblioteca/',cargarImg.single('imagen'),libroController.guardar_libro);
router.post('biblioteca/actualizar',cargarImg.single('imagen'),libroController.actualizar_libro);
router.post('biblioteca/eliminar/:id',libroController.eliminar_libro);
router.get('biblioteca/editar/:id',libroController.editar_libro);


module.exports = router;