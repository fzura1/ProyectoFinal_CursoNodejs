module.exports={
    getProgramador:function(conexion,funcion){
        conexion.query("SELECT * FROM tb_programador",funcion);
    },
    setProgramador:function(conexion,datos,archivos,funcion){
        conexion.query("INSERT INTO tb_programador(nombre_apellido,agnos_programando,img_avatar) values(?,?,?)",[datos.nombre_apellido,datos.agnos_programando,archivos.filename],funcion);
    },
    getByIdProgramador:function(conexion,id,funcion){
        conexion.query("SELECT * FROM tb_programador where Id=?",[id],funcion);
    },
    deleteByIdProgramador:function(conexion,id,funcion){
        conexion.query("DELETE FROM tb_programador where Id=?",[id],funcion);
    },
}