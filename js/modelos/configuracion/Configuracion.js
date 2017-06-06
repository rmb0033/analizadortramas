/**
 * Created by Rodrigo Martinez
 */


/**
 * Clase en la que se construye el archivo Configuración a través de un xml
 * @param xml
 * @constructor
 */
function Configuracion(xml) {
    var configuracionXML = obtenerConfdesdeXML(xml);// diccionario de TramaXML <TramaXML.id, TramaXML>




    /**
     * Función que devuelve el objeto configuracion
     * @returns {{}}
     */
    this.getConfiguracionXML = function(){
        return configuracionXML;
    };



    /**
     * Función que calcula la configuración desde el xml
     * @param xml
     * @returns {{}}
     */
    function obtenerConfdesdeXML(xml){
        var configuracion={};
        var RaizTramas=xml.getElementsByTagName("trama");
        //recorremos todas las tramas
        for(var i = 0; i < RaizTramas.length; i++) {
            var tramasXML= RaizTramas[i];
            var nombreTrama=tramasXML.id;
            configuracion[nombreTrama]=new TramaXML(nombreTrama, calcularVariablesTrama(tramasXML));// diccionario de TramaXML <TramaXML.id, TramaXML>
            // añadir variables a biblioteca
        }
        return configuracion;
    };

    /**
     * Función que calcula las variables de cada trama
     * @param tramasXML
     * @returns {{}}
     */
    function calcularVariablesTrama(tramasXML){
        var variables={};
        var RaizVariables=tramasXML.childNodes;
        for(var j=0;j<RaizVariables.length;j++) {
            var variablesXML=RaizVariables[j];
            var hijo = RaizVariables[j].nodeName;
            if (hijo != "#text") {
                //Aqui tenemos cada variable
                var nombreVariable = variablesXML.id;
                var raizAtributos= variablesXML.childNodes;
                var atributos = getAtributoVariable(raizAtributos);
                var variableXML = new VariableXML(nombreVariable, atributos["tipo"], atributos["startBit"], atributos["endBit"]);
                variables[nombreVariable]=variableXML;

            }
        }

        return variables;
    };


    /**
     * Función que calcula los atributos de cada variable
     * @param raizAtributos
     * @returns {{}}
     */
    function getAtributoVariable(raizAtributos){
        var atributos={};
        for (var k = 0; k < raizAtributos.length; k++) {
            var nombreAtributo = raizAtributos[k].nodeName;
            if (nombreAtributo != "#text") {
                var valorAtributo = raizAtributos[k].childNodes[0].nodeValue;
                atributos[nombreAtributo]=valorAtributo;
            }
        }
        return atributos;
    };
}






























