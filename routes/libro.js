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
const maxSize = 1 * 1024 * 1024; // for 1MB
var cargarImg=multer({
    storage:rutaAlmacenImg,
    fileFilter: (req, file, cb) => {
        if (
          file.mimetype == "image/png" ||
          file.mimetype == "image/jpg" ||
          file.mimetype == "image/jpeg"
        ) {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error("solo .png, .jpg y .jpeg permitidos!"));
        }
      },
      limits: { fileSize: maxSize },
});



/* GET home page. */
router.get('/',libroController.index);
router.get('/agregar',libroController.agregar);
router.post('/',cargarImg.single('imagen'),libroController.guardar_libro);
router.post('/actualizar',cargarImg.single('imagen'),libroController.actualizar_libro);
router.post('/eliminar/:id',libroController.eliminar_libro);
router.get('/editar/:id',libroController.editar_libro);


module.exports = router;