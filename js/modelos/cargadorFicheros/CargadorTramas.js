
function CargadorTramas(){
    //constructor
    var tramas = {};
    var peticionesAjax= [];
    peticionesAjax = cargarTramas(peticionesAjax);

    /**
     *
     * @returns {{}}
     */
    this.getTramas = function()
    {
        return tramas;
    };
    /**
     *
     * @returns {Array}
     */
    this.getpeticionesAjax = function() {
        return peticionesAjax;
    };
    this.getNombreFicheros= function(){
        return Object.keys(tramas);
    };
    /**
     * Meter en carga de ficheros
     * @returns {Array}
     */
    function cargarTramas(peticionesAjax) {
        var directorioFicheros=cargarDirectorioFicheros();
        // if(directorioFicheros.length>0) {
            for (var fichero in directorioFicheros) {
                var rutaFichero = directorioFicheros[fichero];
                //Todo buscar solución mas elegante
                var nombreFichero = rutaFichero.split("/Data");
                peticionesAjax.push(cargarTramaDeFichero(rutaFichero, nombreFichero[1]));
            }

        // peticionesAjax.push(cargarTramaDeFichero("tramas/Data0001", "Data0001"));
        // peticionesAjax.push(cargarTramaDeFichero("tramas/Data0002", "Data0002"));
        return peticionesAjax;
    }

    /**
     * Carga en un diccionario el fichero de tramas procesado.
     * @param pathFichero
     * @param nombreFichero
     * @returns {*}
     */
    function cargarTramaDeFichero(pathFichero, nombreFichero) {
        return $.ajax({
            url:pathFichero,
            success: function(data){
                tramas[nombreFichero] = procesarTrama(data);
            }
        });
    }
    /**
     * Recibe el archivo entero en modo texto y lo divide por saltos de lineas
     * @param ficheroTrama
     * @returns {Array|*}
     */
    function procesarTrama(ficheroTrama) {
        return ficheroTrama.split("\n");
    }
    function cargarDirectorioFicheros(){
        var ficheroFiltrado=[];
        //TODO trata de errores (si no encuentra nada en el directorio)
        var oReq = new XMLHttpRequest(); //New request object
        oReq.onload = function() {
            //This is where you handle what to do with the response.
            //The actual data is found on this.responseText
            var ficherosSinProcesar = this.responseText.toString();
            if(ficherosSinProcesar ==""){
                alert("No correct files found into default directory");
                return;
            }
            var ficheroSinFiltrar=ficherosSinProcesar.split(",");

            for(var indiceFichero in ficheroSinFiltrar){
                ficheroFiltrado[indiceFichero]=[];
                for(var indiceString=0; indiceString<ficheroSinFiltrar[indiceFichero].length; indiceString++){
                    var caracter=ficheroSinFiltrar[indiceFichero][indiceString];
                    while(ficheroFiltrado[indiceFichero].length==0 && indiceString<ficheroSinFiltrar[indiceFichero].length
                    &&(!(caracter>="a" && caracter<="z") && !(caracter>="A" && caracter<="Z"))) {
                        indiceString++;
                        caracter=ficheroSinFiltrar[indiceFichero][indiceString];
                    }
                    if(caracter!=']' && caracter!='[' && caracter!="\\" && caracter!='"'){
                        ficheroFiltrado[indiceFichero]+=caracter;
                    }
                    // console.log(ficheroFiltrado[indiceFichero]);
                }
            }
            // console.log(ficheroFiltrado);
        };
        oReq.open("get", "listar-ficheros.php", false);
        //                               ^ Don't block the rest of the execution.
        //                                 Don't wait until the request finishes to
        //                                 continue.
        oReq.send();
        return ficheroFiltrado;
    }



}
