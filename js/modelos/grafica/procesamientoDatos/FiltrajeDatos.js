/**
 * Created by alumno on 8/05/17.
 */
function FiltrajeDatos(grafica){
    var codigo;
    var intervalos;
    var diccionarioDatos;
    var graficaContenido=grafica.getGrafica();


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

    $('#borrarfiltro').click(function() {
        grafica.eliminarFiltro();
    });


    function filtrarDatosDiccionario() {
        for (var vargrafica in graficaContenido.config.data.datasets) {
            var nombre = graficaContenido.config.data.datasets[vargrafica]["label"];
            filtrarDatosDiccionarioVariable(nombre);
        }
    }


    function filtrarDatosDiccionarioVariable(nombre) {
        for (var x in diccionarioDatos) {
                var variable = diccionarioDatos[x];
                var datos = variable["diccionario"];
                if(nombre==variable["label"]){
                    var indiceIntervalo = 0;
                    var keys = Object.keys(datos);
                    keys.sort();
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