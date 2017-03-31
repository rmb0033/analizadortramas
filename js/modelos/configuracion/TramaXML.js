/**
 * Created by alumno on 19/02/17.
 */

/**
 *
 * @param id
 * @param variablesXML
 * @constructor
 */
function TramaXML(id, variablesXML) {

    var id = id;
    var variables = variablesXML;  // diccionario de VariableXML <VariableXML.id, VariableXML>


    this.getId = function() {
        return id;
    }

    this.getVariables = function() {
        return variables;
    }
}
