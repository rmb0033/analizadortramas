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

    this.getConfiguracion = function() {
        return config;
    };
    this.addOpcionVariable= function(opcion){
        //opcion = new OpcionesVariable().getOpciones();
        datosVariable.push(opcion);
    };
    this.getOpciones = function(){
      //Crear configuración
        datosGrafica["datasets"]=datosVariable;
        config = {
            type: 'line',
            data: datosGrafica,
            options: {
                responsive: true,
                title:{
                    display:true,
                    text:"Gráfica temporal"
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
                    }, ],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        }
                    }]
                }
            }
        };
    };


    this.pintarGrafica = function (){
            var ctx = document.getElementById("canvasGrafica").getContext("2d");

            window.myLine = new Chart(ctx, config);

        };
    // }


}