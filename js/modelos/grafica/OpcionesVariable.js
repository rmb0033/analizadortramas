/**
 * Created by Rodrigo Martinez
 */

/**
 * Clase en la que se encuentran definido las variables
 * @constructor
 */
function OpcionesVariable() {
    var color;
    var opciones = {};
    opciones["label"] = "Temperatura";
    opciones["backgroundColor"] = color;
    opciones["borderColor"] = color;
    opciones["pointRadius"] = 0.5;
    opciones["steppedLine"] = false; //Si queremos que sea de tipo cronograma
    opciones["fill"] = false;
    opciones["pointStyle"]="circle";
    opciones["borderWidth"]= 1;


    /**
     * Función para guardar los datos
     * @param datos
     */
    this.setDatos = function(datos){
        opciones["diccionario"]=datos;
    };
    /**
     * FUnción para marcar el grosor de linea
     * @param grosorLinea
     */
    this.setGrosorLinea= function(grosorLinea){
        var grosor;
        switch(grosorLinea){
            case "small/normal":grosor=1;break;
            case "extra small":grosor=0.2;break;
            case "small":grosor=0.5;break;
            case "normal":grosor=1.6;break;
            case "large":grosor=2;break;
            case "extra large":grosor=3;break;
        }
        opciones["borderWidth"]= grosor;
    };
    /**
     * Función para marcar la dimensión del punto
     * @param dimension
     */
    this.setDimensionPunto= function(dimension){
        var grosor;
        switch(dimension){
            case "small/normal":grosor=0.5;break;
            case "extra small":grosor=0.1;break;
            case "small":grosor=0.25;break;
            case "normal":grosor=0.8;break;
            case "large":grosor=1;break;
            case "extra large":grosor=1.5;break;
        }
        opciones["pointRadius"] = grosor;
    };
    /**
     * Función para marcar los colores
     * @param tipoColor
     */
    this.setColor=function(tipoColor){
        switch (tipoColor){
            case "Random": color='#' + (Math.random().toString(16) + '0000000').slice(2, 8); break;
            case "Black":color='rgb(0, 0, 0)';break;
            case "Red":color='rgb(255, 0, 0)';break;
            case "Blue":color='rgb(0, 0, 255)';break;
            case "Orange":color='rgb(255, 165, 0)';break;
            case "Pink":color='rgb(255, 192, 203)';break;
            case "Brown":color='rgb(165, 42, 42)';break;
            case "Purple": color='rgb(128, 0, 128)';break;
            case "Yellow":color='rgb(255, 255, 0)'; break;
        }
        opciones["borderColor"] = color;
        opciones["backgroundColor"]=color;
    };

    /**
     * Función para decir que tipo de cronograma es
     * @param booleano
     */
    this.tipoCronograma= function(booleano){
        if(booleano=="True"){
            opciones["steppedLine"] =true;
        }else{
            opciones["steppedLine"] =false;
        }
    };
    /**
     * Función para establecer el nombre de una variable
     * @param nombreVariable
     */
    this.setNombreVariable= function(nombreVariable){
        opciones["label"]=nombreVariable;
    };
    /**
     * Función para indicar que tipo de puntero se trata
     * @param tipodePuntero
     */
    this.setTipoPuntero = function(tipodePuntero){
        opciones["pointStyle"]=tipodePuntero;
    };

    /**
     * Función para obtener la variable junto a sus opciones
     * @returns {{}}
     */
    this.getOpciones = function() {
        return opciones;
    }
}