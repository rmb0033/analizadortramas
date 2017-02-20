
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


function cargarTramasYConfigXML(cortinaCarga) {

    cortinaCarga.hide();

    readConfigXMLFile("config_prueba.xml");
    // TODO LOCALIZAR TODOS LOS FILES DENTRO DE /TRAMAS
    //Realizamos la acción una vez cargado estos ficheros
    readTextFile("tramas/0001", "0001", cortinaCarga);

    // readTextFile("tramas/0002", "0002", cortinaCarga);
}


function readTextFile(file, key, cortinaCarga) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        //test carga 5s
        var millisecondsToWait = 1000;
        setTimeout(function() {
            //final carga
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0) {
                    tramas[key] = procesarTrama(rawFile.responseText);
                }
            }

            // AQUI VAMOS A HABILITAR EL BOTON
            cortinaCarga.hide();

            var conf = new Configuracion(xml);
            var biblioteca= new Biblioteca(conf, tramas);

            colocarCheckBox(biblioteca);

        }, millisecondsToWait); //Fin test carga

    }
    rawFile.send(null);
}

function procesarTrama(entrada) {
    //Split para dividir el buffer de texto en varios.
    var tramaSplitted = entrada.split("\n");
    return tramaSplitted;
}

function readConfigXMLFile(file, key) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                parser = new DOMParser();
                xml = parser.parseFromString(rawFile.responseText,"text/xml");
            }
        }
    }
    rawFile.send(null);
}

