/**
 * Created by alumno on 2/04/17.
 */
function OpcionesVariable() {
    // var color='#' + (Math.random().toString(16) + '0000000').slice(2, 8);
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



    this.setDatos = function(datos){
        opciones["diccionario"]=datos;
    };
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


    this.tipoCronograma= function(booleano){
        if(booleano=="True"){
            opciones["steppedLine"] =true;
        }else{
            opciones["steppedLine"] =false;
        }
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