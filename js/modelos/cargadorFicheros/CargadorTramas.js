/**
 * Created by Rodrigo Martinez
 * Clase en la que con peticiones ajax cargamos las tramas de forma sincrona
 */


function CargadorTramas(directorioFicheros){
    //constructor
    var tramas = {};
    var peticionesAjax= [];
    peticionesAjax = cargarTramas(peticionesAjax);


    /**
     * Obtenemos las lineas del fichero
     * @returns {{}}
     */
    this.getTramas = function()
    {
        return tramas;
    };
    /**
     *Obtenemos el array de peticiones ajax
     * @returns {Array}
     */
    this.getpeticionesAjax = function() {
        return peticionesAjax;
    };
    /**
     * Obtenemos un array con los nombres de ficheros
     * @returns {Array}
     */
    this.getNombreFicheros= function(){
        return Object.keys(tramas);
    };
    /**
     * Petición que devuelve una respuesta ajax
     * @param ficheros
     * @returns {*}
     */
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
        for (var fichero in directorioFicheros) {
            var rutaFichero = directorioFicheros[fichero];
            //Funcionalidad añadida de carga de horas desde el servidor para
            //conocer aproximadamente la fecha
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