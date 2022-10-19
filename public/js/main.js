// valida tipo archivo a subir
var file = document.getElementById('img_avatar');
file.onchange = function(e) {
    if(this.files.length>0){
        var fileSize = this.files[0].size/1024;
        if (fileSize >1024) {
            alert('Imagen excede 1mb');
            this.value = '';
        }else{
            console.log("Tamaño de archivo aceptado");
        }
    }
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        console.log("extensión de archivo aceptado");
        break;
        default:
        alert('Debe seleccionar imagen con extensión JPG,JPEG o PNG');
        this.value = '';
    }
};