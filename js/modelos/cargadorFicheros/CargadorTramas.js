
function CargadorTramas(directorioFicheros){
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
        //TODO podemos hacer que muestre el nombre junto a una fecha
        return Object.keys(tramas);
    };
    this.setDirectorioFicheros = function(ficheros){
        return $.ajax({
            success: function() {
                directorioFicheros=ficheros;
            }
        });
    };
    /**
     * Meter en carga de ficheros
     * @returns {Array}
     */
    function cargarTramas(peticionesAjax) {
        // if(directorioFicheros.length>0) {
        // console.log("Directorio");
        // console.log(directorioFicheros);
        //TODO Directorio de ficheros puede ser filtrado aqui
        for (var fichero in directorioFicheros) {
            //TODO aqui tendremos filtrado el directorio.
            // console.log(fichero, directorioFicheros[fichero]);
            var rutaFichero = directorioFicheros[fichero];
            //Funcionalidad añadida de carga de horas desde el servidor
            var mapeadoDirectorio = rutaFichero.split(" || Date -> ");
            var directorio=mapeadoDirectorio[0];
            var key=mapeadoDirectorio[1];

            var nombreFichero = directorio.split("/Data");
            var fecha= key.split(' ');
            fecha=fecha[1];
            nombreFichero= nombreFichero[1]+" "+fecha;


            peticionesAjax.push(cargarTramaDeFichero(directorio, nombreFichero));
        }

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




}