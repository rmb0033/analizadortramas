/**
 * Created by alumno on 8/05/17.
 */
function BusquedaDatos(grafica){
    var codigo;
    var intervalos;
    var diccionarioDatos;
    var busquedas=[];
    var indice=0;


    $('#busqueda').click(function() {
        if($(this).hasClass('active')){
            codigo = $('#texto').val();
            var gramatica=new IntervalosGramatica(grafica, codigo);
            intervalos=gramatica.getIntervalos();

            if(intervalos.length==0){
                alert("Query has not been resolved: data not found");
            }
            else{
                diccionarioDatos=grafica.getDiccionario();

                busquedaDatosDiccionario();

                if(busquedas.length>0){
                    grafica.insertarPuntero(busquedas[indice],"f3");
                }
            }
        }
        else{
            busquedas=[];
            indice=0;
        }

    });

    $("#busquedaizq").click(function () {
        if(indice>0 && busquedas.length>0){
            indice--;
            grafica.insertarPuntero(busquedas[indice],"f3");
        }
    });
    $("#busquedader").click(function () {
        if(indice<busquedas.length-1 && busquedas.length>0){
            indice++;
            grafica.insertarPuntero(busquedas[indice],"f3");
        }
    });

    $("#igualarb1").click(function() {
        if(busquedas.length>0){
            grafica.obtenerTabla(busquedas[indice],"f1");
        }
    });

    $("#igualarb2").click(function() {
        grafica.obtenerTabla(busquedas[indice],"f2");
    });






    function busquedaDatosDiccionario() {
        var graficaContenido=grafica.getGrafica();
        for (var vargrafica in graficaContenido.config.data.datasets) {
            var nombre = graficaContenido.config.data.datasets[vargrafica]["label"];
            busquedaDatosDiccionarioVariable(nombre);
        }
    }


    function busquedaDatosDiccionarioVariable(nombre) {
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
                            break;
                        }
                        else if (estaEnElIntervalo(clave, intervalos[indiceIntervalo])) {
                            busquedas.push(datos[clave][0]);
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
