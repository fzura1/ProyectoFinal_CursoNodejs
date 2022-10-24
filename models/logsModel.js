module.exports={
    setLog:function(conexion,usuario,descripcion,funcion){
        conexion.query("INSERT INTO LOGS(fechaHora,usuario,descripcion) values(now(),?,?)",[usuario,descripcion],funcion);
    }
}