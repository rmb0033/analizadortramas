
var tramas = {};
var xml;

function cargarTramasYConfigXML(boton) {

    boton.hide();

    // TODO LOCALIZAR TODOS LOS FILES DENTRO DE /TRAMAS
    //Realizamos la acción una vez cargado estos ficheros
    readTextFile("tramas/0001", "0001", boton);
    readTextFile("tramas/0002", "0002", boton);

    readConfigXMLFile("config_prueba.xml");
}

function imprimirTrama(index) {
    // imprimirTrama("0001");
    // imprimirXML();
    console.log(tramas[index]);
}



function imprimirXML() {
    // TODO ACABAR EL PARSER DEL ARCHIVO CONFIG.XML
    console.log(xml);
    // var cosas = xml.getElementsByTagName("configuracionTrama");
    //
    // cosas.forEach(function(entry) {
    //     console.log(entry);
    // }, this);
}


function readTextFile(file, key, boton) {
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
            boton.show();

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

