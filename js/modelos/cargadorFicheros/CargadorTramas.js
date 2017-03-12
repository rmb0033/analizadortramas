
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
        // TODO LOCALIZAR TODOS LOS FILES DENTRO DE /TRAMAS
        peticionesAjax.push(cargarTramaDeFichero("tramas/0001", "0001"));
        peticionesAjax.push(cargarTramaDeFichero("tramas/0002", "0002"));
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
