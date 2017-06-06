/**
 * Created by Rodrigo Martinez
 */
/**
 * Clase en la que se encuentran definido la funcionalidad de busqueda de datos.
 * @param grafica
 * @constructor
 */
function BusquedaDatos(grafica){
    var codigo;
    var intervalos;
    var diccionarioDatos;
    var busquedas=[];
    var indice=0;
    var punto=-1;
    var nuevaconsulta=false;
    var insertadoBusqueda=false;

    /**
     * Función que aplica funcionalidad al botón busqueda
     */
    $('#busqueda').click(function() {
        if($(this).hasClass('active')){
            realizarBusqueda();
            if(busquedas.length>0){
                grafica.insertarPuntero(busquedas[indice],"f3");
                punto=busquedas[indice];
                buscarZoom();
            }
        }
        else{
            busquedas=[];
            indice=0;
        }

    });
    /**
     * Función que sirve para realizar la busqueda
     */
    function realizarBusqueda(){
        codigo = $('#texto').val();
        var gramatica=new IntervalosGramatica(grafica, codigo);
        intervalos=gramatica.getIntervalos();

        if(intervalos.length==0){
            alert("Query has not been resolved: data not found");
        }
        else{
            diccionarioDatos=grafica.getDiccionario();

            busquedaDatosDiccionario();

        }
    }

    /**
     * Función que te hace el zoom automático una vez encontrado el valor
     */
    function buscarZoom(){
        var min=[];
        var max=[];
        for(var x in grafica.getGraficaMaestra().config.data.datasets){
            var minimo=0;
            for(var dato in grafica.getGraficaMaestra().config.data.datasets[x].data){
                // console.log(grafica.getGraficaMaestra().config.data.datasets[x].data);
                // console.log();
                var punto=grafica.getGraficaMaestra().config.data.datasets[x].data[dato]["x"];
                if(busquedas[indice]<punto){
                    if(minimo!=0){
                        min.push(minimo);
                    }
                    max.push(punto);
                    break;
                }else if(busquedas[indice]>punto){
                    minimo= punto;
                }
            }
        }
        if(max.length>0 && min.length>0){

            var izq = Math.min.apply(null, min);
            var der = Math.max.apply(null, max);
            if(izq!=null && der!=null){
                grafica.getGraficaMaestra().valuesBox.xmax = der;
                grafica.getGraficaMaestra().options.annotation.annotations[0].xMax = der;
                grafica.getGraficaMaestra().valuesBox.xmin = izq;
                grafica.getGraficaMaestra().options.annotation.annotations[0].xMin = izq;

                grafica.actualizarGraficas();
            }
        }
    }


    /**
     * Función que te añade el cursor hacia la izquierda
     */
    function calcularUPCizq(){
        //Para ello recorrer punteros donde name="f3"
        realizarBusqueda();
        var nuevopunto=-1;
        for(var x in busquedas){
            if(busquedas[x]>=punto){
                break;
            }
            else{
                nuevopunto=x;

            }
        }
        if(nuevopunto>=0){
            indice=nuevopunto;
            grafica.insertarPuntero(busquedas[indice],"f3");
            buscarZoom();
            punto=busquedas[indice];
        }

    }


    /**
     * Función que te añade el cursor hacia la derecha
     */
    function calcularUPCder(){
        //Para ello recorrer punteros donde name="f3"
        realizarBusqueda();
        for(var x in busquedas){
            if(busquedas[x]>punto){
                indice=x;
                grafica.insertarPuntero(busquedas[indice],"f3");
                buscarZoom();
                punto=busquedas[indice];
                break;
            }
        }
    }


    /**
     * Función para detecta si se ha añadido una nueva consulta
     */
    $('#texto').on('input',function(e){
        nuevaconsulta=true;
    });




    /**
     * Función para realizar una busqueda hacia la izquierda
     */
    $("#busquedaizq").click(function () {
        if(nuevaconsulta) {
            calcularUPCizq();
            nuevaconsulta = false;
        }else{
            if(indice>0 && busquedas.length>0){
                indice--;
                grafica.insertarPuntero(busquedas[indice],"f3");
                punto=busquedas[indice];
                buscarZoom();

            }
        }

    });



    /**
     * Función para realizar una búsqueda hacia la derecha
     */
    $("#busquedader").click(function () {
        if(nuevaconsulta){
            calcularUPCder();
            nuevaconsulta=false;
        }else{
            if(indice<busquedas.length-1 && busquedas.length>0){
                indice++;
                grafica.insertarPuntero(busquedas[indice],"f3");
                punto=busquedas[indice];
                buscarZoom();
            }
        }
    });

    /**
     * Función para igualar la busqueda al cursor 1
     */

    $("#igualarb1").click(function() {
        if(busquedas.length>0){
            grafica.obtenerTabla(busquedas[indice],"f1");
        }
    });



    /**
     * Función para igualar la búsqueda al cursor 2
     */
    $("#igualarb2").click(function() {
        grafica.obtenerTabla(busquedas[indice],"f2");
    });


    /**
     * Función que busca la variable de la busqueda en el diccionario
     */
    function busquedaDatosDiccionario() {
        insertadoBusqueda=false;
        var graficaContenido=grafica.getGrafica();
        for (var vargrafica in graficaContenido.config.data.datasets) {
            var nombre = graficaContenido.config.data.datasets[vargrafica]["label"];
            busquedaDatosDiccionarioVariable(nombre);
        }
    }

    /**
     * Función que te crea los distintos puntos donde se cumple la búsqueda y lo almacena
     * @param nombre
     */
    function busquedaDatosDiccionarioVariable(nombre) {
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
                            break;
                        }
                        else if (estaEnElIntervalo(clave, intervalos[indiceIntervalo])) {
                            if(!insertadoBusqueda){
                                insertadoBusqueda=true;
                                busquedas=[];
                            }
                            busquedas.push(datos[clave][0]);


                        }

                    }

                }
            }


        }
    }


    /**
     * Función que comprobamos si está en el intervalo
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
