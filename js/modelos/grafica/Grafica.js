/**
 * Created by alumno on 12/03/17.
 */
var datitos=[
    [Date.UTC(1970, 9, 21), 0],
    [Date.UTC(1970, 10, 4), 0.28],
    [Date.UTC(1970, 10, 9), 0.25],
    [Date.UTC(1970, 10, 27), 0.2],
    [Date.UTC(1970, 11, 2), 0.28],
    [Date.UTC(1970, 11, 26), 0.28],
    [Date.UTC(1970, 11, 29), 0.47],
    [Date.UTC(1971, 0, 11), 0.79],
    [Date.UTC(1971, 0, 26), 0.72],
    [Date.UTC(1971, 1, 3), 1.02],
    [Date.UTC(1971, 1, 11), 1.12],
    [Date.UTC(1971, 1, 25), 1.2],
    [Date.UTC(1971, 2, 11), 1.18],
    [Date.UTC(1971, 3, 11), 1.19],
    [Date.UTC(1971, 4, 1), 1.85],
    [Date.UTC(1971, 4, 5), 2.22],
    [Date.UTC(1971, 4, 19), 1.15],
    [Date.UTC(1971, 5, 3), 0]
];



function dibujarGrafica(opciones) {
    switch (opciones["tipoGrafica"]) {
        case "Gráfica temporal":graficaTemporal(opciones);break;
        case "Gráfica X Y" :graficaXY(opciones) ;break;
        case "Gráfica X Y Z": graficaXYZ(opciones);break;
    }



}
function graficaTemporal(opciones){
    // console.log("Funciona bien con:");
    // console.log(datitos);
    // console.log("Funciona mal con:");
    // console.log(opciones["datos"][0]);
    Highcharts.stockChart('grafica', {
        chart: {
            zoomType: 'x'
        },
        rangeSelector: {
            selected: 1
        },

        plotOptions: {
            series: {
                showInNavigator: true
            }
        },

        series : opciones["datos"]
        // series: [{
        //     showInNavigator: true,
        //     name: 'Prueba',
        //     data: opciones["datos"]
        //
        //
        // }]
    });
}
function graficaXY(opciones){
    console.log("Opciones:");
    // console.log();
    console.log(opciones["datos"][0]["data"][0]);
    Highcharts.chart('grafica', {
        chart: {
            type: 'scatter',
            zoomType: 'x'
        },
        title: {
            text: opciones["tipoGrafica"]
        },
    series: opciones["datos"]
        ,
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                lineWidth: 1
            }
        },


    });
}
function graficaXYZ(opciones){

}




