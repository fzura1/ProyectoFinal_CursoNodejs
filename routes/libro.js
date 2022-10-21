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
router.get('/',libroController.index);
router.get('/agregar',libroController.agregar);
router.post('/',cargarImg.single('imagen'),libroController.guardar_libro);
router.post('/eliminar/:id',libroController.eliminar_libro);


module.exports = router;