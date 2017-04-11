/**
 * Created by alumno on 12/03/17.
 */
//TODO

function OpcionesGrafica(){
    //TODO diferenciar llamadas #canvas o #canvasMaestro, tenemos que pasar el #creado o algo
    //estudiar aplicabilidad
    var datosGrafica={};
    var datosVariable=[];
    var color = Chart.helpers.color;
    var timeFormat = 'MM/DD/YYYY HH:mm:ss:SSS';
    var config;
    var configMaestro;
    var grafica=null;
    var graficaMaestra=null;

    var cantidadDiezmado=450;
    var cantidadDiezmadoGMaestra=100;

    function simularEvento(x,y, sizeX, sizeY){
        this.x=x;
        this.y=y;
        this.native=true; //emulamos que es un mouseEvent real
    }
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
    function obtenerInformacionPunto(activeElement, graficaDeseada){
        var resultado=graficaDeseada.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index];
        resultado["label"]=graficaDeseada.data.datasets[activeElement[0]._datasetIndex].label;
        return resultado;
    }
    this.getConfiguracion = function() {
        return config;
    };
    this.addOpcionVariable= function(opcion){
        datosVariable.push(opcion);
    };
    this.setTipodeCuerda= function(tipoCuerda){
        if(tipoCuerda=="Cuerda"){
            config["options"]["elements"]["line"]["tension"]=0.4;
        }
        else if(tipoCuerda=="Recta"){
            config["options"]["elements"]["line"]["tension"]=0.0001;
        }

    };
    this.setTipoGrafica=function(tipoGrafica){
        if(tipoGrafica=="tiempo"){
            config["options"]["scales"]["xAxes"]=[{
                type: "time",
                display: true,
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
                    display: true,
                    labelString: 'Date'
                }
            } ];
        }

    };
    this.setLeyendaEjeX= function(leyendaEjex){

    };
    this.setLeyendaEjeY= function(leyendaEjex){

    };

    //Variables que debería recibir por interfaz
    //Tipo de cuerda
    //Tipo de gráfica (tiempo o x,y)
    //Leyenda gráfica eje x
    //Leyenda gráfica eje y
    this.getOpciones = function(){
        //Crear configuración
        datosGrafica["datasets"]=datosVariable;
        config = {
            type: 'line',
            data: datosGrafica,
            options: {
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
                        display: true,
                        scaleLabel:{
                            display: false
                        }

                    }] ,
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        }
                    }]
                },
                zoom: {
                    enabled: true,
                    drag: true,
                    mode: 'x'
                },
                onClick: function(e) {
                    var activeElement = grafica.getElementAtEvent(e);
                    if(activeElement.length>0){
                        var resultado=grafica.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index];
                        resultado["label"]=grafica.data.datasets[activeElement[0]._datasetIndex].label;
                    }else{
                        var resultado=encontrarPuntoMasProximo(e,grafica, "#canvasGrafica");
                    }
                    var puntosObtenidos=[];
                    puntosObtenidos=encontrarPuntosizquierda(resultado);
                    puntosObtenidos.push(resultado);
                }
            },

        };
        getGraficaMaestra();
    };

    function encontrarPuntosizquierda(resultado){
        var puntos=[];
        var ejex= resultado["x"];
        if(grafica.data.datasets.length>1){
            for(var x=0; x<grafica.data.datasets.length;x++){
                if(resultado["label"]!= grafica.data.datasets[x].label){
                    var puntoEncontrado={};
                    for(var y=grafica.data.datasets[x].data.length-1; y>=0;y--){
                        if(grafica.data.datasets[x].data[y]["x"]<ejex){
                            puntoEncontrado["x"]=grafica.data.datasets[x].data[y]["x"];
                            puntoEncontrado["y"]=grafica.data.datasets[x].data[y]["y"];
                            puntoEncontrado["label"]=grafica.data.datasets[x].label;
                            puntos.push(puntoEncontrado);
                            break;
                        }
                    }
                }
            }
        }
        return puntos;
    }



    function getGraficaMaestra(){
        configMaestro = {
            type: 'scatter',
            data: datosGrafica,
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
                graficaMaestra.update();
            }
        }
        else if(($("#limitederecho").hasClass('active'))){
            if(puntoEjeX>graficaMaestra.valuesBox.xmin) {
                actualizarBorde(graficaMaestra, "xMax", puntoEjeX);
                graficaMaestra.valuesBox.xmax = puntoEjeX;
                graficaMaestra.update();
            }
        }
    }
    function actualizarBorde(grafica, cadenaTexto,puntoEjeX ){
        for(x in grafica.options.annotation.annotations){
            if(grafica.options.annotation.annotations[x]["id"]=="Grafica morada"){
                grafica.options.annotation.annotations[x][cadenaTexto]=puntoEjeX;
                break;
            }
        }

    }

    this.pintarGrafica = function (){
        if(grafica!=null){
            console.log("Recreando grafica");
            grafica.destroy();
        }
        $(".grafica").html("");
        $(".grafica").html('<canvas id="canvasGrafica" class="canvas"></canvas>'+
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
            '<span class="glyphicon glyphicon-backward"></span>'+
            '</button>'+
            '<button type="button" id="pasosiguiente" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-forward"></span>'+
            '</button>'+

            '</div>');
        grafica = new Chart(document.getElementById("canvasGrafica").getContext("2d"), config);
        // console.log(window.myLine);
        var puntosGraficados=0;
        for(var x in grafica.data.datasets){
            puntosGraficados+=grafica.data.datasets[x].data.length;
        }
        console.log("Puntos graficados: "+puntosGraficados);
    };

    this.pintarGraficaMaestra= function(){
        graficaMaestra = new Chart(document.getElementById("canvasMaestro").getContext("2d"), configMaestro);
        var puntosGraficados=0;
        for(var x in graficaMaestra.data.datasets){
            puntosGraficados+=graficaMaestra.data.datasets[x].data.length;
        }
        console.log("Puntos graficados Maestra: "+puntosGraficados);
        inicializarCaja(graficaMaestra);
        aplicarListenersBotones(grafica, graficaMaestra);
    };

    function obtenerValoresEjeX(grafica){
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
    }
    // }
    function inicializarCaja(grafica){
        var axisY = grafica.scales["y-axis-1"];
        var maxY = axisY.max;
        var minY = axisY.min;
        var axisX = obtenerValoresEjeX(grafica);
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
        grafica.options.scales.yAxes[0].ticks.max=maxY;
        grafica.valuesBox={xmin:minX, xmax:maxX};
        grafica.update();
    }

}