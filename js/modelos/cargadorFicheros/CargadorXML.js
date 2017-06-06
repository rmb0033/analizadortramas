/**
 * Created by Rodrigo Martinez
 * Clase en la que se carga el XML
 */

function CargadorXML(){

    var xml;
    this.getXML = function() {
        return xml;
    };

    /**
     * Carga de configuración por defecto
     * @param pathFichero
     * @returns {*}
     */
    this.cargarConfiguracionDefecto= function(pathFichero) {
        return $.ajax({
            url:pathFichero,
            success: function(data) {
                xml = data;
            }
        });
    };
    /**
     * Carga la configuración desde un archivo de la maquina local
     * @param file
     */
    this.cargarConfiguracionJS=function (file){
        xml=null;
        fr = new FileReader();
        fr.readAsText(file);
        fr.onload = textoaXML;

    };
    /**
     * Convierte un objeto tipo texto a uno xml
     */
    function textoaXML() {
        var parser = new DOMParser();
        xml = parser.parseFromString(fr.result, "text/xml");
        console.log("Parseo completado");
    }
}