/**
 * Created by Rodrigo Martinez
 */
/**
 * Clase en la que se encuentran definido las variables
 * @param nombre
 * @param tipo
 * @constructor
 */
function Variable (nombre, tipo){

    var nombre = nombre; // EJ. Voltaje
    var tipo = tipo; // EJ Uint32
    var valores = []; // arrayInterno que contiene los distintos valores
    var size=0;

    /**
     * Función por la que obtenemos el nombre de una variable
     * @returns {*}
     */
    this.getNombre = function() {
        return nombre;
    };
    /**
     * Función que obtenemos el tipo de variable
     * @returns {*}
     */
    this.getTipo = function() {
        return tipo;
    };
    /**
     * Función que obtenemos los valores de una variable
     * @returns {Array}
     */
    this.getValores = function() {
        return valores;
    };
    /**
     * Función por la cual guardamos los distintos valores dentro de una variable
     * @param valor
     */
    this.setValores = function(valor){
        valores[size]=valor;
        size++;
    }

}