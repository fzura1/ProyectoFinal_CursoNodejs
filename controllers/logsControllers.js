var con=require('../config/conexion');
var logs=require('../models/logsModel');
module.exports ={
    // metodo guardar log
    guardar_log:function(req,res){
        console.log(req.body); 
            logs.setLog(con,req.body,function(err){
                console.log("almacena log");
            });            
    }
}