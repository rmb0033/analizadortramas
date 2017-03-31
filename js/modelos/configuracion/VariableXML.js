/**
 * Created by alumno on 19/02/17.
 */
/**
 * Clase VariableXML
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
     *
     * @returns {*}
     */
    this.getId = function() {
        return id;
    };
    /**
     *
     * @returns {*}
     */
    this.getTipo = function() {
        return tipo;
    };
    /**
     *
     * @returns {*}
     */
    this.getByteEntrada = function() {
        return byteEntrada;
    };
    /**
     *
     * @returns {*}
     */
    this.getByteSalida = function() {
        return byteSalida;
    }

}
