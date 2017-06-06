/**
 * Created by Rodrigo Martinez
 */
/**
 * Clase principal en la que se define el funcionamiento de la gráfica, junto a sus opciones.
 * @constructor
 */
function OpcionesGrafica(){
    //constructor
    var diccionarioDatos=[];
    var datosFiltrados=[];
    var timeFormat = 'MM/DD/YYYY HH:mm:ss:SSS';
    var config;
    var configMaestro;
    var grafica=null;
    var graficaMaestra=null;
    var comparadores={};
    var punteros=[];
    var self = this;
    var filtro;
    var busqueda;
    var tipografica="xy";
    var ejesautomaticos=true;

    /**
     * Función para obtener el tipo de gráfica
     * @returns {string}
     */
    this.getTipoGrafica=function(){
        return tipografica;
    };


    /**
     * Función para obtener los datos filtrados
     * @param nuevoResultadoFiltrado
     */
    this.setDatosFiltrados = function(nuevoResultadoFiltrado){
        datosFiltrados=JSON.parse(JSON.stringify(nuevoResultadoFiltrado));
        graficaMaestra.config.data.datasets=conectorDiccionario(null, null, 300);
        self.actualizarGraficas();

    };
    /**
     * Función para eliminar filtro
     */
    this.eliminarFiltro = function(){

        datosFiltrados=JSON.parse(JSON.stringify(diccionarioDatos));
        graficaMaestra.config.data.datasets=conectorDiccionario(null, null, 300);
        self.actualizarGraficas();

    };
    /**
     * Función para poder utilizar metodos publicos dentro de la misma función
     * @returns {OpcionesGrafica}
     */
    this.obtenerReferencia = function(){
        return this;
    };
    /**
     * Función para obtener la configuración de la gráfica
     * @returns {*}
     */
    this.getConfiguracion = function() {
        return config;
    };
    /**
     * Función para añadir nuevas variables a la gráfica
     * @param opcion
     */
    this.addOpcionVariable= function(opcion){
        diccionarioDatos.push(opcion);
        diccionarioDatos=self.getDiccionario();
    };
    /**
     * Función para añadir el tipo de cuerda de la gráfica
     * @param tipoCuerda
     */
    this.setTipodeCuerda= function(tipoCuerda){
        if(tipoCuerda=="Distended line"){
            config["options"]["elements"]["line"]["tension"]=0.4;
        }
        else if(tipoCuerda=="Line"){
            config["options"]["elements"]["line"]["tension"]=0.0001;
        }

    };
    /**
     * Función para añadir el tipo de gráfica
     * @param tipo
     */
    this.setTipoGrafica=function(tipo){
        tipografica=tipo;
        if(tipografica=="Temporal Chart"){
            config["options"]["scales"]["xAxes"]=[{
                type: "time",
                display: true,
                time: {

                    format: timeFormat,
                    tooltipFormat: 'MM/DD/YYYY HH:mm:ss:SSS'
                },
                ticks: {
                    minTicksLimit:1,
                    maxTicksLimit: 6,
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation: 0

                },
                //hasta aqui
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            } ];
        }

    };

    /**
     * Función para obtener las opciones
     */
    this.getOpciones = function(){
        //Crear configuración
        //conectorDiccionario(diccionarioDatos, max, min, numeroPuntos)
        datosFiltrados=JSON.parse(JSON.stringify(diccionarioDatos));
        config = {
            type: 'scatter',
            data: {datasets:conectorDiccionario(null, null, 700)},
            options: {
                animation: {
                    duration: 0
                },
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                tooltips: {
                    mode: 'nearest',
                    intersect: false
                },
                responsive: true,
                title:{
                    display:false
                },
                elements:{
                    line:{
                        tension: 0.0001 //Tipo linea
//                      tension: 0.4 //tipo de cuerda
                    }
                },

                scales: {
                    xAxes: [{
                        ticks:{},
                        display: true,
                        scaleLabel:{
                            display: false
                        }

                    }] ,
                    yAxes: [{
                        ticks:{},
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        }
                    }]
                },
                onClick: function(e) {

                    if ($("#bandera1").hasClass('active')) {
                        dibujarPuntero(e, "f1");
                    }
                    else if ($("#bandera2").hasClass('active')) {
                        dibujarPuntero(e, "f2");
                    }
                }
            },

        };

    };
    /**
     * Función para acotar la gráfica
     * @param dato
     */
    this.setMaxEjeYconf= function(dato){
        if(dato!=''){
            config.options.scales.yAxes[0].ticks["max"]=parseInt(dato);
        }
    };
    /**
     * Función para acotar la gráfica
     * @param dato
     */
    this.setMinEjeYconf=function(dato){
        if(dato!=''){
            config.options.scales.yAxes[0].ticks["min"]=parseInt(dato);
        }
    };
    /**
     * Función para acotar la gráfica
     * @param dato
     */
    this.setMaxEjeX= function(dato){
        if(dato!=''){
            grafica.options.scales.xAxes[0].ticks["max"]=dato;
        }
    };
    /**
     * Función para acotar la gráfica
     * @param dato
     */
    this.setMinEjeX=function(dato){
        if(dato!=''){
            grafica.options.scales.xAxes[0].ticks["min"]=dato;
        }
    };
    this.setMaxEjeY= function(dato){
        if(dato!=''){
            grafica.options.scales.yAxes[0].ticks["max"]=dato;
        }
    };
    /**
     * Función para acotar la gráfica
     * @param dato
     */
    this.setMinEjeY=function(dato){
        if(dato!=''){
            grafica.options.scales.yAxes[0].ticks["min"]=dato;
        }
    };
    /**
     * Función para acotar la gráfica automáticamente
     * @param dato
     */
    this.setAuto=function(dato){
        if(dato=="True"){
            ejesautomaticos=true;
        }else{
            ejesautomaticos=false;
        }

    };



    /**
     * Función para realizar un copiado profundo del diccionario
     */
    this.getDiccionario=function(){
        var nuevoDiccionario = JSON.parse(JSON.stringify(diccionarioDatos));
        for(var x in diccionarioDatos){
            var diccionarioVariable= diccionarioDatos[x]["diccionario"];
            nuevoDiccionario[x]["diccionario"]={};
            for(var variableDiccionario in diccionarioVariable){
                var datos=[];
                for(var y in diccionarioVariable[variableDiccionario]){
                    datos.push(diccionarioVariable[variableDiccionario][y]);
                }
                nuevoDiccionario[x]["diccionario"][variableDiccionario]=datos;
            }
        }
        return nuevoDiccionario;
    };

    /**
     * Función para obtener la tabla de los cursores
     * @param ejeX
     * @param flag
     */
    this.obtenerTabla=function(ejeX, flag){
        self.insertarPuntero(ejeX,flag);
        var puntosObtenidos=[];
        puntosObtenidos=encontrarPuntosizquierda(ejeX);
        comparadores[flag]=puntosObtenidos;
        obtenerPuntosTabla();
    };

    /**
     * Función para actualizar la gráfica
     */
    this.actualizarGraficas= function(){
        graficaMaestra.update();
        var min = graficaMaestra.valuesBox.xmin;
        var max = graficaMaestra.valuesBox.xmax;
        if(tipografica=="Temporal Chart"){
            grafica.config.data.datasets = conectorDiccionario(max, min, 700);
        }
        else{
            grafica.config.data.datasets = conectorXY(max, min, 700);
        }
        grafica.update();
    };

    /**
     * Función para pintar la gráfica junto a sus elementos
     */
    this.pintarGrafica = function (){
        if(grafica!=null){
            grafica.destroy();
        }
        $(".grafica").html("");
        $(".grafica").html('<div id="contenedorTemporal"></div>'+
            '<canvas id="canvasGrafica" class="canvas"></canvas>'+
            '<div class="contenedorMaestro">'+
            '<canvas id="canvasMaestro" class="canvas"></canvas>'+
            '</div>'+

            '<div class="contenedorBotones">'+
            '<button type="button" id="limiteizquierdo" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-indent-left"></span>'+
            '</button>'+
            '<button type="button" id="limitederecho" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-indent-right"></span>'+
            '</button>'+

            '<button type="button" id="moverizquierda" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-chevron-left"></span>'+
            '</button>'+

            '<button type="button" id="moverderecha" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-chevron-right"></span>'+
            '</button>'+
            '<button type="button" id="play" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-play"></span>'+
            '</button>'+
            '<button type="button" id="pause" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-pause"></span>'+
            '</button>'+
            '<button type="button" id="pasoanterior" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-step-backward"></span>'+
            '</button>'+
            '<button type="button" id="pasosiguiente" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-step-forward"></span>'+
            '</button>'+
            '<button type="button" id="stop" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-stop"></span>'+
            '</button>'+
            '<button type="button" id="cambvelocidad" class="btn btn-default">'+
            '<span id="velocidad">1x</span>'+
            '</button>'+
            '</div>'+
            '<div id="filtro" class="filtraje">'+
            '</div>');




        if(tipografica=="Temporal Chart"){
            var cadenaHTML='<input id="texto" type="text" class="form-control" placeholder="Insert a query">'+
                '<button type="button" id="filtrado" class="btn btn-default">'+
                '<span class="glyphicon glyphicon-filter"></span>'+
                '</button>'+

                '<button type="button" id="borrarfiltro" class="btn btn-default">'+
                '<span class="glyphicon glyphicon-trash"></span>'+
                '</button>'+

                '<button type="button" id="busqueda" class="btn btn-default controjo">'+
                '<span class="glyphicon glyphicon-search"></span>'+
                '</button>'+


                '<button type="button" id="busquedaizq" class="btn btn-default controjo">'+
                '<span class="glyphicon glyphicon-chevron-left"></span>'+
                '</button>'+

                '<button type="button" id="busquedader" class="btn btn-default controjo">'+
                '<span class="glyphicon glyphicon-chevron-right"></span>'+
                '</button>'+
                '<button type="button" id="igualarb1" class="btn btn-default banderaverde">'+
                '<span class="glyphicon glyphicon-flag"></span>'+
                '</button>'+
                '<button type="button" id="igualarb2" class="btn btn-default banderaazul">'+
                '<span class="glyphicon glyphicon-flag"></span>'+
                '</button>';

            var cadenaHTML2='<div class="contenedorBanderas">'   +
                '<button type="button" id="bandera1" class="btn btn-default banderaverde">'+
                '<span class="glyphicon glyphicon-flag"></span>'+
                '</button>'+
                '<button type="button" id="bandera2" class="btn btn-default banderaazul">'+
                '<span class="glyphicon glyphicon-flag"></span>'+
                '</button>'+
                '</div>'+
                '<div id="tabla" class="table-responsive">'+
                '</div>';
            $('#filtro').html(cadenaHTML);
            $('#contenedorTemporal').html(cadenaHTML2);
        }


        grafica = new Chart(document.getElementById("canvasGrafica").getContext("2d"), config);


        grafica.update();
        // grafica.options.scales["y-axis-1"]["ticks"]["max"]=grafica.scales["y-axis-1"]["max"];
        if(!ejesautomaticos){
            if(tipografica=="Temporal Chart"){
                self.setMaxEjeY(grafica.scales["y-axis-1"]["max"]);
                self.setMinEjeY(grafica.scales["y-axis-1"]["min"]);
            }else{
                self.setMaxEjeY(grafica.scales["y-axis-1"]["max"]);
                self.setMinEjeY(grafica.scales["y-axis-1"]["min"]);
                self.setMinEjeX(grafica.scales["x-axis-1"]["min"]);
                self.setMaxEjeX(grafica.scales["x-axis-1"]["max"]);
            }
            grafica.update();
        }
        var puntosGraficados=0;
        for(var x in grafica.data.datasets){
            puntosGraficados+=grafica.data.datasets[x].data.length;
        }
        console.log("Puntos graficados: "+puntosGraficados);
    };


    /**
     * Función para pintar la gráfica maestra o ventana temporal
     */
    this.pintarGraficaMaestra= function(){
        if(tipografica=="Temporal Chart"){
            getGraficaMaestra();
            graficaMaestra = new Chart(document.getElementById("canvasMaestro").getContext("2d"), configMaestro);
        }else{
            getGraficaMaestraXY();
            graficaMaestra = new Chart(document.getElementById("canvasMaestro").getContext("2d"), configMaestro);

        }

        var puntosGraficados=0;
        for(var x in graficaMaestra.data.datasets){
            puntosGraficados+=graficaMaestra.data.datasets[x].data.length;
        }
        console.log("Puntos graficados Maestra: "+puntosGraficados);
        inicializarCaja(graficaMaestra);
        graficaMaestra.update();
        aplicarListenersBotones(this);
        BotonesFiltraje();
        inicializarFiltraje();

    };


    /**
     * Función para obtener la referencia de la gráfica
     * @returns {*}
     */
    this.getGrafica=function(){
        return grafica;
    };
    /**
     * Función para obtener la referencia de la gráfica maestra
     * @returns {*}
     */
    this.getGraficaMaestra=function(){
        return graficaMaestra;
    };

    /**
     * Función para obtener los valores del eje x
     * @param grafica
     * @returns {{max: *, min: *}}
     */
    this.obtenerValoresEjeX=function (grafica){
        var valorMaximo=null;
        var valorMinimo=null;
        for(var x in grafica.data.datasets){
            if(valorMaximo==null && valorMinimo==null){
                valorMinimo=grafica.data.datasets[x].data[0]["x"];
                valorMaximo=grafica.data.datasets[x].data[grafica.data.datasets[x].data.length-1]["x"];
            }
            if(grafica.data.datasets[x].data[0]["x"]<valorMinimo ){
                valorMinimo=grafica.data.datasets[x].data[0]["x"];
            }
            if(grafica.data.datasets[x].data[grafica.data.datasets[x].data.length-1]["x"]>valorMaximo){
                valorMaximo=grafica.data.datasets[x].data[grafica.data.datasets[x].data.length-1]["x"];

            }
        }
        return {max:valorMaximo, min:valorMinimo};
    };

    /**
     * Función para insetar un puntero
     * @param ejeX
     * @param flag
     */
    this.insertarPuntero= function(ejeX, flag){

        var color;
        if("f1"==flag){
            color='rgba(11,122,27,0.75)';
        }else if("f2"==flag){
            color='rgba(7,186,207,0.75)';
        }else if("f3"==flag){
            color='rgba(255,0,0,0.75)';
        }
        if(punteros.length==0){
            var listaPunteros={
                drawTime: "afterDraw",
                annotations: punteros
            };
            grafica.options.annotation=listaPunteros;
        }
        var insertado=false;
        for(var x in punteros){
            if(punteros[x]["name"]==flag){
                punteros[x]={
                    name:flag,
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-1',
                    value: ejeX,
                    borderColor:color,
                    borderWidth: 2
                };
                insertado=true;
            }
        }
        if(!insertado){
            punteros.push({
                name:flag,
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis-1',
                value: ejeX,
                borderColor:color,
                borderWidth: 2
            });
        }
        grafica.update();
    };

    /**
     * Función para inicializar un filtraje
     */
    function inicializarFiltraje(){
        filtro=new FiltrajeDatos(self.obtenerReferencia());
        busqueda=new BusquedaDatos(self.obtenerReferencia());
    }

    /**
     * Clase que utilizamos para simular las pulsaciones dentro de los pixeles de la grafica
     * @param x
     * @param y
     * @param sizeX
     * @param sizeY
     */
    function simularEvento(x,y, sizeX, sizeY){
        this.x=x;
        this.y=y;
        this.native=true; //emulamos que es un mouseEvent real
    }

    /**
     * Función para encontrar el punto más proximo de una pulsación de click
     * @param e
     * @param graficaDeseada
     * @param idCanvas
     * @returns {*}
     */
    function encontrarPuntoMasProximo(e, graficaDeseada, idCanvas){
        var ejeX=e.offsetX;
        var maxEjeX=$(idCanvas).width();
        var maxEjeY=$(idCanvas).height();

        for(var x=0; x<maxEjeX; x++){
            for(var y=0; y<maxEjeY; y++){
                //Si la diferencia en el eje x
                var diferenciaIzquierda=ejeX-x;
                var diferenciaDerecha=ejeX+x;
                if(diferenciaIzquierda>=0){
                    //hacemos comprobaciones
                    var activeElement = graficaDeseada.getElementAtEvent(new simularEvento(diferenciaIzquierda,y));
                    if(activeElement.length>0){
                        return obtenerInformacionPunto(activeElement,graficaDeseada);
                    }
                }
                if(diferenciaDerecha<=maxEjeX){
                    var activeElement = graficaDeseada.getElementAtEvent(new simularEvento(diferenciaDerecha,y));
                    if(activeElement.length>0){
                        return obtenerInformacionPunto(activeElement,graficaDeseada);
                    }
                }
                if(diferenciaDerecha>maxEjeX && diferenciaIzquierda<0){
                    break;
                }


            }

        }
        return null;

    };

    /**
     * Función que nos devuelve la información de un punto calculado por su pixel.
     * @param activeElement
     * @param graficaDeseada
     */
    function obtenerInformacionPunto(activeElement, graficaDeseada){
        var resultado=graficaDeseada.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index];
        resultado["label"]=graficaDeseada.data.datasets[activeElement[0]._datasetIndex].label;
        return resultado;
    }


    /**
     * Funcción en la cual realizamos el diezmado para la gráfica
     * @param max
     * @param min
     * @param numeroPuntos
     */
    function conectorDiccionario(max, min, numeroPuntos){
        //clonamos el objeto
        var solucion = JSON.parse(JSON.stringify(datosFiltrados));
        var puntosTotales=0;
        var numeroVariables=0;
        for(var variable in datosFiltrados) {
            //Datos no tiene atributo lenght
            numeroVariables+=1;
            puntosTotales+=Object.keys(datosFiltrados[variable]["diccionario"]).length;
        }
        var numeroPuntosTrabajo=numeroPuntos/numeroVariables;

        for(var variable in datosFiltrados){

            var datos= datosFiltrados[variable]["diccionario"];

            // Diezmado y ordenamiento de los datos
            //Ordenamos la linea temporal podemos modularlo como como opcion
            var keys = Object.keys(datos);

            keys=keys.sort();


            var solucionOrdenada=[];
            var numeroDiezMado=parseInt((puntosTotales/numeroPuntosTrabajo)/datosFiltrados.length);
            if(numeroDiezMado==0){
                numeroDiezMado=1;
            }
            if(min==null || max==null){
                for(var i=0; i<keys.length;i+=numeroDiezMado){
                    var clave= keys[i];
                    var valoresOrdenados={};

                    valoresOrdenados["x"]=datos[clave][0];
                    valoresOrdenados["y"]=datos[clave][1];
                    solucionOrdenada.push(valoresOrdenados);

                }
                solucion[variable]["data"]=solucionOrdenada;
            }
            else{
                var menor=0;
                var mayor=0;
                for(var x=0;x<keys.length;x++){
                    var clave= keys[x];
                    if(datos[clave][0]>=min){
                        menor=x;
                        break;
                    }
                }
                for(var x=keys.length-1;x>=0;x--){
                    var clave= keys[x];
                    if(datos[clave][0]<=max && datos[clave][0]!=null){
                        mayor=x;
                        break;
                    }
                }


                var numeroDiezMado=parseInt(((mayor-menor)/numeroPuntosTrabajo)/datosFiltrados.length);
                if(!parseInt(((mayor-menor)/numeroPuntosTrabajo)%datosFiltrados.length))
                    numeroDiezMado++;

                if(numeroDiezMado==0){
                    numeroDiezMado=1;
                }
                for(var x=menor;x<=mayor;x+=numeroDiezMado) {
                    var clave= keys[x];
                    var valoresOrdenados={};
                    valoresOrdenados["x"]=datos[clave][0];
                    valoresOrdenados["y"]=datos[clave][1];
                    solucionOrdenada.push(valoresOrdenados);

                }
                solucion[variable]["data"]=solucionOrdenada;
            }
        }
        return solucion;
    };


    /**
     * Función que calculamos el punto del eje X
     * @param e
     * @param graficaDeseada
     * @param idCanvas
     * @returns {*}
     */
    function calcularEjeXPunto(e, graficaDeseada,idCanvas){

        var ejeX=e.offsetX;

        for(var x in graficaDeseada.config.data.datasets[0]._meta){


            if(graficaDeseada.config.data.datasets.length>0 && graficaDeseada.config.data.datasets[0]._meta[x].data.length>1){

                var x1=graficaDeseada.config.data.datasets[0]._meta[x].data[0]._model.x;
                var y1=graficaDeseada.config.data.datasets[0]._meta[x].data[0]._model.y;
                var ultimaposicion=graficaDeseada.config.data.datasets[0]._meta[x].data.length-1;
                var x2=graficaDeseada.config.data.datasets[0]._meta[x].data[ultimaposicion]._model.x;
                var y2=graficaDeseada.config.data.datasets[0]._meta[x].data[ultimaposicion]._model.y;


                var activeElement1 = graficaDeseada.getElementAtEvent(new simularEvento(x1, y1));
                var activeElement2 = graficaDeseada.getElementAtEvent(new simularEvento(x2, y2));


                if(activeElement1.length>0 && activeElement2.length>0){
                    var valorx1=graficaDeseada.data.datasets[activeElement1[0]._datasetIndex].data[activeElement1[0]._index].x;
                    var valorx2=graficaDeseada.data.datasets[activeElement2[0]._datasetIndex].data[activeElement2[0]._index].x;

                    var diferenciaPixel=Math.abs(x1-x2);
                    var diferenciaValor= Math.abs(valorx1-valorx2);

                    var escala=diferenciaValor/diferenciaPixel;
                    var diferencia=parseInt((ejeX-x1)*escala);
                    var solucion=valorx1+diferencia;
                    return solucion;
                }

            }
        }
        return null;
    }

    /**
     * Función con la cual dibujamos el puntero
     * @param e
     * @param flag
     */
    function dibujarPuntero(e, flag) {
        var ejeX=calcularEjeXPunto(e, grafica,"#canvasGrafica");


        if(ejeX!=null){
            self.obtenerTabla(ejeX, flag);
        }
    }


    /**
     * Función para obtener los puntos de la tabla una vez situados 2 cursores
     */
    function obtenerPuntosTabla(){
        if(Object.keys(comparadores).length==2){
            //recorremos del primer posición del array y buscamos el equivalente con el segundo
            var solucionesTabla=[];
            for (var x in comparadores["f1"]){
                var nombreVariable= comparadores["f1"][x]["label"];
                for(var y in comparadores["f2"]){
                    if(nombreVariable==comparadores["f2"][y]["label"]){
                        var contenidoFila=[];
                        contenidoFila.push(nombreVariable);
                        var numero1=comparadores["f1"][x]["y"];
                        var numero2=comparadores["f2"][y]["y"];
                        contenidoFila.push(numero1);
                        contenidoFila.push(numero2);
                        contenidoFila.push(Math.abs(numero1-numero2));
                        contenidoFila.push(numero1+numero2);
                        solucionesTabla.push(contenidoFila);
                    }
                }
            }
            if(solucionesTabla.length>0){
                $("#tabla").html(
                    '<table class="table">'+
                    '<thead>'+
                    '<tr>'+
                    '<th>Variable</th>'+
                    '<th>Value1(Green)</th>'+
                    '<th>Value2(Blue)</th>'+
                    '<th>Difference (Abs)</th>'+
                    '<th>Sum</th>'+
                    '</tr>'+
                    '</thead>'+
                    '<tbody id="resultados">'+
                    '</tbody>'+
                    '</table>');
                var cadenaHTML='';

                for(var fila in solucionesTabla){
                    cadenaHTML+='<tr>';
                    for(var columna in solucionesTabla[fila]){
                        cadenaHTML+='<td>'+solucionesTabla[fila][columna]+'</td>';
                    }
                    cadenaHTML+='</tr>';
                }
                $("#resultados").html(cadenaHTML);
            }
            else{
                $("#tabla").html('');
            }

        }
    }

    /**
     * Función dados 1 punto, te calcula todos los primeros puntos a la izquierda de cada variable
     * @param ejeX
     * @returns {Array}
     */
    function encontrarPuntosizquierda(ejeX){
        var puntos=[];
        if(grafica.data.datasets.length>=1){
            for(var x=0; x<grafica.data.datasets.length;x++){
                // if(resultado["label"]!= grafica.data.datasets[x].label){
                var puntoEncontrado={};
                for(var y=grafica.data.datasets[x].data.length-1; y>=0;y--){
                    if(grafica.data.datasets[x].data[y]["x"]<=ejeX){
                        puntoEncontrado["x"]=grafica.data.datasets[x].data[y]["x"];
                        puntoEncontrado["y"]=grafica.data.datasets[x].data[y]["y"];
                        puntoEncontrado["label"]=grafica.data.datasets[x].label;
                        puntos.push(puntoEncontrado);
                        break;
                    }
                }
                // }
            }
        }
        return puntos;
    }


    /**
     * Función por la cual obtenemos la gráfica maestra
     */
    function getGraficaMaestra(){
        configMaestro = {
            type: 'scatter',
            data: {datasets:conectorDiccionario(null, null, 300)},
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend:{
                    display:false
                },
                elements:{
                    line:{
                        tension: 0.0001 //Tipo linea
//                      tension: 0.4 //tipo de cuerda
                    }
                },
                tooltips: {enabled: false},
                hover: {mode: null},
                scales: {
                    xAxes: [{
                        type: "time",
                        display: false,
                        time: {

                            format: timeFormat,
                            tooltipFormat: 'MM/DD/YYYY HH:mm:ss:SSS'
                        },
                        ticks: {
                            autoSkip: true,
                            minTicksLimit:1,
                            maxTicksLimit: 8

                        },
                        //hasta aqui
                        scaleLabel: {
                            display: false,
                            labelString: 'Date'
                        }
                    } ],
                    yAxes:[{
                        display:false
                    }]
                },
                onClick: function(e) {
                    cambiarCaja(e);
                }
            },

        };
    };

    /**
     * Función con la cual modificamos la caja morada situada en la gráfica maestra o temporal
     * @param e
     */
    function cambiarCaja(e){
        var activeElement = graficaMaestra.getElementAtEvent(e);
        var punto;
        if(activeElement.length>0){
            punto=graficaMaestra.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index];
            punto["label"]=graficaMaestra.data.datasets[activeElement[0]._datasetIndex].label;
        }else{
            punto=encontrarPuntoMasProximo(e,graficaMaestra, "#canvasMaestro");
            //calculamos punto relativo
        }
        var puntoEjeX= punto["x"];
        if(($("#limiteizquierdo").hasClass('active'))){
            if(puntoEjeX<graficaMaestra.valuesBox.xmax){

                actualizarBorde(graficaMaestra,"xMin",puntoEjeX);
                graficaMaestra.valuesBox.xmin=puntoEjeX;
                self.actualizarGraficas();
            }
        }
        else if(($("#limitederecho").hasClass('active'))){
            if(puntoEjeX>graficaMaestra.valuesBox.xmin) {

                actualizarBorde(graficaMaestra, "xMax", puntoEjeX);
                graficaMaestra.valuesBox.xmax = puntoEjeX;
                self.actualizarGraficas();
            }
        }
    }


    /**
     * Función con la que moficamos los extremos de la caja morada
     * @param grafica
     * @param cadenaTexto
     * @param puntoEjeX
     */
    function actualizarBorde(grafica, cadenaTexto,puntoEjeX ){
        for(x in grafica.options.annotation.annotations){
            if(grafica.options.annotation.annotations[x]["id"]=="Grafica morada"){
                grafica.options.annotation.annotations[x][cadenaTexto]=puntoEjeX;
                break;
            }
        }

    }

    /**
     * Función con la que calculamos la gráfica maestra XY
     * @param diezmado
     */
    function calcularGraficaMaestraXY(diezmado) {
        var solucion = JSON.parse(JSON.stringify(datosFiltrados));
        var puntosTotales=0;
        for(var variable in datosFiltrados) {
            //Datos no tiene atributo lenght
            puntosTotales+=Object.keys(datosFiltrados[variable]["diccionario"]).length;
        }

        for(var variable in datosFiltrados){

            var datos= datosFiltrados[variable]["diccionario"];
            // var fallo= datosFiltrados[variable]["diccionario"];

            // Diezmado y ordenamiento de los datos
            //Ordenamos la linea temporal podemos modularlo como como opcion
            var keys = Object.keys(datos);

            keys=keys.sort();


            var solucionOrdenada=[];
            var numeroDiezMado=parseInt((puntosTotales/diezmado)/datosFiltrados.length);
            if(numeroDiezMado==0){
                numeroDiezMado=1;
            }

            for(var i=0; i<keys.length;i+=numeroDiezMado){
                var clave= keys[i];
                var valoresOrdenados={};

                valoresOrdenados["x"]=parseInt(clave);
                valoresOrdenados["y"]=datos[clave][0];
                solucionOrdenada.push(valoresOrdenados);

            }
            solucion[variable]["data"]=solucionOrdenada;

        }
        return solucion;
    }

    /**
     * Función con la que obtenemos los datos de la gráfica maestra XY
     */
    function getGraficaMaestraXY(){
        configMaestro = {
            type: 'scatter',
            data: {datasets:calcularGraficaMaestraXY(300)},
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend:{
                    display:false
                },
                elements:{
                    line:{
                        tension: 0.0001 //Tipo linea
//                      tension: 0.4 //tipo de cuerda
                    }
                },
                tooltips: {enabled: false},
                hover: {mode: null},
                scales: {
                    xAxes: [{
                        type: "time",
                        display: false,
                        time: {

                            format: timeFormat,
                            tooltipFormat: 'MM/DD/YYYY HH:mm:ss:SSS'
                        },
                        ticks: {
                            autoSkip: true,
                            minTicksLimit:1,
                            maxTicksLimit: 8

                        },
                        //hasta aqui
                        scaleLabel: {
                            display: false,
                            labelString: 'Date'
                        }
                    } ],
                    yAxes:[{
                        display:false
                    }]
                },
                onClick: function(e) {
                    cambiarCaja(e);
                }
            },

        };
    }


    /**
     * Función de conexión de datos para la gráfica XY
     * @param max
     * @param min
     * @param numeroPuntos
     */
    function conectorXY(max, min, numeroPuntos){
        //clonamos el objeto
        var solucion = JSON.parse(JSON.stringify(datosFiltrados));
        var puntosTotales=0;
        for(var variable in datosFiltrados) {
            //Datos no tiene atributo lenght
            puntosTotales+=Object.keys(datosFiltrados[variable]["diccionario"]).length;
        }

        for(var variable in datosFiltrados){

            var datos= datosFiltrados[variable]["diccionario"];
            // var fallo= datosFiltrados[variable]["diccionario"];

            // Diezmado y ordenamiento de los datos
            //Ordenamos la linea temporal podemos modularlo como como opcion
            var keys = Object.keys(datos);

            keys=keys.sort();


            var solucionOrdenada=[];
            var numeroDiezMado=parseInt((puntosTotales/numeroPuntos)/datosFiltrados.length);
            if(numeroDiezMado==0){
                numeroDiezMado=1;
            }
            if(min==null || max==null){
                for(var i=0; i<keys.length;i+=numeroDiezMado){
                    var clave= keys[i];
                    var valoresOrdenados={};

                    valoresOrdenados["x"]=datos[clave][0];
                    valoresOrdenados["y"]=datos[clave][1];
                    solucionOrdenada.push(valoresOrdenados);

                }
                solucion[variable]["data"]=solucionOrdenada;
            }
            else{
                var menor=0;
                var mayor=0;
                for(var x=0;x<keys.length;x++){
                    var clave= parseInt(keys[x]);
                    if(clave>=min){
                        menor=x;
                        break;
                    }
                }
                for(var x=keys.length-1;x>=0;x--){
                    var clave= parseInt(keys[x]);
                    if(clave<=max && clave!=null){
                        mayor=x;
                        break;
                    }
                }


                var numeroDiezMado=parseInt(((mayor-menor)/numeroPuntos)/datosFiltrados.length);
                if(!parseInt(((mayor-menor)/numeroPuntos)%datosFiltrados.length))
                    numeroDiezMado++;

                if(numeroDiezMado==0){
                    numeroDiezMado=1;
                }
                for(var x=menor;x<=mayor;x+=numeroDiezMado) {
                    var clave= keys[x];
                    var valoresOrdenados={};
                    valoresOrdenados["x"]=datos[clave][0];
                    valoresOrdenados["y"]=datos[clave][1];
                    solucionOrdenada.push(valoresOrdenados);

                }
                solucion[variable]["data"]=solucionOrdenada;
            }
        }
        return solucion;

    }


    /**
     * Función para inicializar la caja rosa del zoom
     * @param grafica
     */
    function inicializarCaja(grafica){
        var axisY = grafica.scales["y-axis-1"];
        var maxY = axisY.max;
        var minY = axisY.min;
        var axisX = self.obtenerValoresEjeX(grafica);
        var maxX = axisX.max;
        var minX = axisX.min;

        var cajaTemporal= {
            drawTime: "afterDraw",
            annotations: [{
                id: "Grafica morada",
                type: 'box',
                xScaleID: 'x-axis-1',
                yScaleID: 'y-axis-1',
                xMin: minX,
                xMax: maxX,
                yMin: minY,
                yMax: maxY,
                backgroundColor: 'rgba(101, 33, 171, 0.5)',
                borderColor: 'rgb(101, 33, 171)',
                borderWidth: 1,
            }]
        };
        grafica.options.annotation=cajaTemporal;
        grafica.options.scales.yAxes[0].ticks.min=minY;
        grafica.options.scales.yAxes[0].ticks.max=maxY;
        grafica.options.scales.xAxes[0].ticks.max=maxX;
        grafica.options.scales.xAxes[0].ticks.min=minX;
        grafica.valuesBox={xmin:minX, xmax:maxX};
    }




}