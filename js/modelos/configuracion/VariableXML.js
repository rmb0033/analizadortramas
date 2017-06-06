/**
 * Created by Rodrigo Martinez
 */

/**
 * Clase en la que se encuentran definido la disposición de las variables en el XML
 * @param id
 * @param tipo
 * @param byteEntrada
 * @param byteSalida
 * @constructor
 */
function VariableXML(id, tipo, byteEntrada, byteSalida) {
    var id = id;
    var tipo = tipo;
    var byteEntrada = byteEntrada;
    var byteSalida = byteSalida;

    /**
     * Funcion para obtener un ID
     * @returns {*}
     */
    this.getId = function() {
        return id;
    };
    /**
     * Función para obtener un tipo
     * @returns {*}
     */
    this.getTipo = function() {
        return tipo;
    };
    /**
     * Función para obtener un byte de entrada
     * @returns {*}
     */
    this.getByteEntrada = function() {
        return byteEntrada;
    };
    /**
     * Función para obtener el byte salida
     * @returns {*}
     */
    this.getByteSalida = function() {
        return byteSalida;
    }

}
