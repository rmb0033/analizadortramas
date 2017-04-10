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
                    console.log(puntosObtenidos);

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
            type: 'line',
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
                    var activeElement = graficaMaestra.getElementAtEvent(e);
                    if(activeElement.length>0){
                        console.log(graficaMaestra.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index]);

                    }else{
                        console.log(encontrarPuntoMasProximo(e,graficaMaestra, "#canvasMaestro"));
                        //calculamos punto relativo
                    }

                }
            },

        };
    };

    this.pintarGrafica = function (){
        if(grafica!=null){
            console.log("Recreando grafica");
            grafica.destroy();
        }
        $(".grafica").html("");
        $(".grafica").html('<canvas id="canvasGrafica" class="canvas"></canvas>'+
            '<div class="contenedorMaestro">'+
            '<canvas id="canvasMaestro" class="canvas"></canvas>'+
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
        // console.log(window.myLine);
        var puntosGraficados=0;
        for(var x in graficaMaestra.data.datasets){
            puntosGraficados+=graficaMaestra.data.datasets[x].data.length;
        }
        console.log("Puntos graficados Maestra: "+puntosGraficados);
    };

    // }


}