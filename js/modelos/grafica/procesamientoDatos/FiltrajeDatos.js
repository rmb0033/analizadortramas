/**
 * Created by Rodrigo Martinez
 */

/**
 * Clase en la que se encuentran definido las funcionalidad de filtraje
 * @param grafica
 * @constructor
 */
function FiltrajeDatos(grafica){
    var codigo;
    var intervalos;
    var diccionarioDatos;
    var graficaContenido=grafica.getGrafica();

    /**
     * Función por la cual se añade funcionalidad al botón filtrado
     */
    $('#filtrado').click(function() {
        if($(this).hasClass('active')){
            codigo = $('#texto').val();
            var gramatica=new IntervalosGramatica(grafica, codigo);
            intervalos=gramatica.getIntervalos();

            if(intervalos.length==0){
                alert("Query has not been resolved: data not found");
            }
            else{
                diccionarioDatos=grafica.getDiccionario();

                filtrarDatosDiccionario();

                grafica.setDatosFiltrados(diccionarioDatos);
            }
        }
        else{
            grafica.eliminarFiltro();
        }

    });


    /**
     * Función por la cual se añade funcionalidad al botón borrar filtro
     */
    $('#borrarfiltro').click(function() {
        grafica.eliminarFiltro();
    });

    /**
     * Función por la que podemos filtrar los datos del diccionario
     */
    function filtrarDatosDiccionario() {
        for (var vargrafica in graficaContenido.config.data.datasets) {
            var nombre = graficaContenido.config.data.datasets[vargrafica]["label"];
            filtrarDatosDiccionarioVariable(nombre);
        }
    }

    /**
     * Función que pasada una variable (nombre) obtenemos los puntos que cumplen ese filtro
     * @param nombre
     */
    function filtrarDatosDiccionarioVariable(nombre) {
        for (var x in diccionarioDatos) {
                var variable = diccionarioDatos[x];
                var datos = variable["diccionario"];
                if(nombre==variable["label"]){
                    var indiceIntervalo = 0;
                    var keys = Object.keys(datos);
                    keys=keys.sort();
                    for (var i = 0; i < keys.length; i++) {
                        var clave = keys[i];

                        if (!isNaN(clave)) {
                            while (indiceIntervalo < intervalos.length && clave > intervalos[indiceIntervalo][1][1]) {
                                indiceIntervalo++;
                            }
                            if (indiceIntervalo >= intervalos.length) {
                                variable["diccionario"][clave][1] = null;
                            }
                            else if (!estaEnElIntervalo(clave, intervalos[indiceIntervalo])) {
                                variable["diccionario"][clave][1] = null;
                            }

                        }

                    }
                }


        }
    }


    /**
     * Función en la cual sabemos si ese dato está en ese intervalo
     * @param dato
     * @param intervalo
     * @returns {boolean}
     */

    function estaEnElIntervalo(dato,intervalo){

            if(dato<intervalo[0][1]){
                return false;
            }
            else if(dato==intervalo[0][1] && intervalo[0][0]){
                return true;
            }
            else if(dato==intervalo[1][1] && intervalo[1][0]){
                return true;
            }
            else if(dato<intervalo[1][1]){
                return true;
            }
        return false;
    }

}