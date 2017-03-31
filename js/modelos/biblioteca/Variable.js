/**
 * Created by alumno on 19/02/17.
 */

// function Variable(nombre, tipo, valores) {
function Variable (nombre, tipo){

    var nombre = nombre; // EJ. Voltaje
    var tipo = tipo; // EJ Uint32
    var valores = []; // arrayInterno que contiene los distintos valores
    var size=0;


    this.getNombre = function() {
        return nombre;
    }
    this.getTipo = function() {
        return tipo;
    }
    this.getValores = function() {
        return valores;
    }

    this.setValores = function(valor){
        valores[size]=valor;
        size++;
    }

}