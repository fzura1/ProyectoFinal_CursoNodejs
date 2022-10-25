var _bcrypt=require('bcrypt');
module.exports={
  cifrar_clave:function (texto_plano,retorno) {
    _bcrypt.hash(texto_plano, 10, function(err, hash) {
      return retorno(`${hash}`);
    });
  },
  verifica_clave:function(texto_plano,hash,retorno){
    _bcrypt.compare(texto_plano, hash, function(err, result) {
      return retorno(result);
    });	
  }
}

