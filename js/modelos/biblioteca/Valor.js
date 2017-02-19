/**
 * Created by alumno on 19/02/17.
 */

function Valor(fecha, fichero, valor) {

    var fecha = fecha;
    var fichero = fichero;
    var valor = valor;


    this.getFecha = function() {
        return fecha;
    }

    this.getFichero = function() {
        return fichero;
    }

    this.getValor = function() {
        return valor;
    }

}