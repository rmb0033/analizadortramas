/**
 * Created by alumno on 12/03/17.
 */
//TODO

function OpcionesGrafica(){

    var datosGrafica={};
    var datosVariable=[];
    var color = Chart.helpers.color;
    var timeFormat = 'MM/DD/YYYY HH:mm:ss:SSS';
    var config;
    var grafica=null;

    function simularEvento(x,y, sizeX, sizeY){
        this.x=x;
        this.y=y;
        this.native=true; //emulamos que es un mouseEvent real
    }
    function encontrarPuntoMasProximo(e){
        var ejeX=e.offsetX;
        var maxEjeX=$("#canvasGrafica").width();
        var maxEjeY=$("#canvasGrafica").height();

        for(var x=0; x<maxEjeX; x++){
            for(var y=0; y<maxEjeY; y++){
                //Si la diferencia en el eje x
                var diferenciaIzquierda=ejeX-x;
                var diferenciaDerecha=ejeX+x;
                if(diferenciaIzquierda>=0){
                    //hacemos comprobaciones
                    var activeElement = grafica.getElementAtEvent(new simularEvento(diferenciaIzquierda,y));
                    if(activeElement.length>0){
                        return grafica.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index];
                    }
                }
                if(diferenciaDerecha<=maxEjeX){
                    var activeElement = grafica.getElementAtEvent(new simularEvento(diferenciaDerecha,y));
                    if(activeElement.length>0){
                        return grafica.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index];
                    }
                }
                if(diferenciaDerecha>maxEjeX && diferenciaIzquierda<0){
                    break;
                }


            }

        }
        return null;

    };

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
                        console.log(grafica.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index]);

                    }else{
                        console.log(encontrarPuntoMasProximo(e));
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
            $(".grafica").html('<canvas id="canvasGrafica" class="canvas"></canvas>');

            grafica = new Chart(document.getElementById("canvasGrafica").getContext("2d"), config);
            // console.log(window.myLine);
            var puntosGraficados=0;
            for(var x in grafica.data.datasets){
                puntosGraficados+=grafica.data.datasets[x].data.length;
            }
            console.log("Puntos graficados: "+puntosGraficados);
    };
    // }


}