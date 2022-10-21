module.exports={
    setLog:function(conexion,datos,funcion){
        conexion.query("INSERT INTO LOGS(fechaHora,usuario,descripcion) values(now(),?,?)",[datos.usuario,datos.descripcion],funcion);
    }
}