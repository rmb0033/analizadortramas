/**
 * Created by alumno on 12/03/17.
 */

function CheckBoxes() {

    // var listaDeCheckBoxesVariables = [];
    // var listaDeCheckBoxesFicheros = [];
    //
    // function dameVariables() {
    //     for (checkbox in listaDeCheckBoxesVariables) {
    //         // checkbox.checked
    //     }
    // }


}

function cBoxVariables(biblioteca) {

    var variables = biblioteca.getClaves();
    var grupoCheckboxV="";
    for (nombreVariable in variables) {
        grupoCheckboxV += '' +
            '<div class="checkbox ' + variables[nombreVariable] + '">' +
            '<label><input type="checkbox" value="">' + variables[nombreVariable] + '</label>' +
            '</div>';
    }
    $(".ventana-variables").html(grupoCheckboxV);

    // for (nombreVariable in variables) {
    //     var variableCheckBox = $("." + variable[nombreVariable]);
    //     listaDeCheckBoxesVariables.push(variableCheckBox);
    // }


}


function cBoxFicheros(fileLoader) {
    var ficheros = fileLoader.getCargadorTramas().getNombreFicheros();
    var grupoCheckboxF="";
    for (nombreFichero in ficheros) {
        grupoCheckboxF += '' +
            '<div class="checkbox ' + ficheros[nombreFichero] + '">' +
            '<label><input type="checkbox" value="">' + ficheros[nombreFichero] + '</label>' +
            '</div>';
    }
    $(".ventana-ficheros").html(grupoCheckboxF);
}

function cBoxAccion() {
    $(".checkbox").mousedown(function() {
        console.log("prueba 1");
    });
}