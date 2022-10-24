var con=require('../config/conexion');
var logs=require('../models/logsModel');
module.exports ={
    // metodo guardar log
    guardar_log:function(req,res){
        
            logs.setLog(con,usuario,descripcion,function(err){
                console.log("almacena log");
            });            
    }
}