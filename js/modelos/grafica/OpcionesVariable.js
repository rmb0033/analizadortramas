/**
 * Created by alumno on 2/04/17.
 */
function OpcionesVariable() {
    //Tipo de entradas que deberia recibir esta clase
    //Color de linea
    //Color color del punto
    //Tamaño puntero
    //Tipo de puntero
    //Cronograma o no
    //Datos
    //Nombre de la variable
    var opciones = {};
//Nombre de la variable
    opciones["label"] = "Temperatura";
//Color del punto
    opciones["backgroundColor"] = window.chartColors.blue;
//    //Color de la linea
    opciones["borderColor"] = window.chartColors.red;
//Opciones para que se adapte
    opciones["pointRadius"] = 2;
    opciones["steppedLine"] = false; //Si queremos que sea de tipo cronograma
    opciones["fill"] = false;
    opciones["pointStyle"]="circle";
    opciones["data"] = [{
        x: Date.UTC(2017, 9, 21, 10, 20, 15, 999),
        y: 1
    }, {
        x: Date.UTC(2017, 9, 21, 10, 20, 16, 200),
        y: 2
    }, {
        x: Date.UTC(2017, 9, 21, 10, 20, 17, 200),
        y: 3
    },
        {
            x: Date.UTC(2017, 9, 21, 10, 20, 18, 200),
            y: 1
        }];

    this.setDatos = function(datos){
        opciones["data"]=datos;
    };

    this.setColorPunto = function(color){
        opciones["backgroundColor"]=color;
    };

    this.setColorLinea = function(color){
        opciones["borderColor"] = color;
    };
    this.setDimensionPunto= function(dimension){
        opciones["pointRadius"] = dimension;
    };

    this.tipoCronograma= function(booleano){
        opciones["steppedLine"] = booleano;
    };
    this.setNombreVarialbe= function(nombreVariable){
        opciones["label"]=nombreVariable;
    };

    this.setTipoPuntero = function(tipodePuntero){
        opciones["pointStyle"]=tipodePuntero;
    };


    this.getOpciones = function() {
        return opciones;
    }
}