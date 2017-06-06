/**
 * Created by Rodrigo Martinez
 */

/**
 * Clase en la que se encuentran definido las variables dentro de cada trama
 * @param id
 * @param variablesXML
 * @constructor
 */
function TramaXML(id, variablesXML) {

    var id = id;
    var variables = variablesXML;  // diccionario de VariableXML <VariableXML.id, VariableXML>

    /**
     * Función que devuelve el ID de la trama
     * @returns {*}
     */
    this.getId = function() {
        return id;
    };
    /**
     * Función que devuelve el diccionario de variables
     * @returns {*}
     */
    this.getVariables = function() {
        return variables;
    }
}
