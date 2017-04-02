/**
 * Created by alumno on 2/04/17.
 */
function OpcionesVariable() {

    var opciones = {};
//Nombre de la variable
    opciones["label"] = "Temperatura";
//Nombre del punto
    opciones["backgroundColor"] = window.chartColors.red;
//    //Nombre del color
    opciones["borderColor"] = window.chartColors.red;
//Opciones para que se adapte
    opciones["pointRadius"] = 2;
    opciones["steppedLine"] = false; //Si queremos que sea de tipo cronograma
    opciones["fill"] = false;
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


    this.getOpciones = function() {
        return opciones;
    }
}