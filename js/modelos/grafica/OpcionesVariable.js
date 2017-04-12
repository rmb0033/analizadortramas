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
    opciones["backgroundColor"] = window.chartColors.red;
//    //Color de la linea
    opciones["borderColor"] = window.chartColors.red;
//Opciones para que se adapte
    opciones["pointRadius"] = 0.5;
    opciones["steppedLine"] = false; //Si queremos que sea de tipo cronograma
    opciones["fill"] = false;
    opciones["pointStyle"]="circle";
    opciones["borderWidth"]= 1;



    this.setDatos = function(datos){
        opciones["diccionario"]=datos;
    };
    this.setGrosorLinea= function(grosorLinea){
        opciones["borderWidth"]= grosorLinea;
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
    this.setNombreVariable= function(nombreVariable){
        opciones["label"]=nombreVariable;
    };

    this.setTipoPuntero = function(tipodePuntero){
        opciones["pointStyle"]=tipodePuntero;
    };


    this.getOpciones = function() {
        return opciones;
    }
}