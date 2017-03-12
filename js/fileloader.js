
var tramas = {};
var xml;


function colocarCheckBox(biblioteca) {

    var variables = biblioteca.getClaves();
    var grupoCheckbox="";
    for (nombreVariable in variables) {
        grupoCheckbox += '' +
            '<div class="checkbox ' + variables[nombreVariable] + '">' +
            '<label><input type="checkbox" value="">' + variables[nombreVariable] + '</label>' +
            '</div>';
    }
    $(".ventana-variables").html(grupoCheckbox);
}

function cargarArchivoXML(pathArchivoConfiguracion) {

    readConfigXMLFile(pathArchivoConfiguracion);

}


function cargarTramas() {
    // TODO LOCALIZAR TODOS LOS FILES DENTRO DE /TRAMAS
    var peticionesAjax = [];
    peticionesAjax.push(cargarTramaDeFichero("tramas/0001", "0001"));
    peticionesAjax.push(cargarTramaDeFichero("tramas/0002", "0002"));
    return peticionesAjax;
}

function cargarTramaDeFichero(pathFichero, nombreFichero) {
    return $.ajax({
        url:pathFichero,
        success: function(data){
            tramas[nombreFichero] = procesarTrama(data);
        }
    });
}

function procesarTrama(ficheroTrama) {
    //Split para dividir el buffer de texto en varios.
    var tramaSplitted = ficheroTrama.split("\n");
    return tramaSplitted;
}

function readConfigXMLFile(pathFichero) {
    return $.ajax({
        url:pathFichero,
        success: function(data) {
            xml = data;
        }
    });
}
