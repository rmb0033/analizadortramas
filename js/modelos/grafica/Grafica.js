/**
 * Created by alumno on 12/03/17.
 */

function dibujarGrafica(nombre) {

    Highcharts.chart('grafica', {
        chart: {
            type: 'spline',
            inverted: true,
            zoomType: 'x'
        },
        title: {
            text: nombre
        },
        subtitle: {
            text: 'According to the Standard Atmosphere Model'
        },
        xAxis: {
            reversed: false,
            title: {
                enabled: true,
                text: 'Altitude'
            },
            labels: {
                formatter: function () {
                    return this.value + 'km';
                }
            },
            maxPadding: 0.05,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Temperature'
            },
            labels: {
                formatter: function () {
                    return this.value + '°';
                }
            },
            lineWidth: 2
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x} km: {point.y}°C'
        },
//            plotOptions: {
//                spline: {
//                    marker: {
//                        enable: false
//                    }
//                }
//            },




        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (e) {
                            console.log("listener al hacer click en un plot");
//                                hs.htmlExpand(null, {
//                                    pageOrigin: {
//                                        x: e.pageX || e.clientX,
//                                        y: e.pageY || e.clientY
//                                    },
//                                    headingText: "prueba",
//                                    maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
//                                    this.y + ' visits',
//                                    width: 200
//
//                                });
                        }
                    }
                },
                marker: {
                    lineWidth: 1
                }
            }
        },










        series: [
            {
                name: 'Temperature',
                marker: {
                    symbol: 'diamond'
                },
                data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
                    [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
            },
            {
                name: 'Encendido',
                marker: {
                    symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                },
                data: [[10, 15], [20, -50], [30, -56.5], [35, -46.5], [45, -22.1],
                    [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
            }
        ]
    });
}


