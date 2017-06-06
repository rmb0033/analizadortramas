/**
 * Created by Rodrigo Martinez
 */

/**
 * Clase en la que se encuentran definidos los datos de cada variable.
 * @param fecha
 * @param fichero
 * @param valor
 * @constructor
 */
function Valor(fecha, fichero, valor) {

    var fecha = fecha;
    var fichero = fichero;
    var valor = valor;
    /**
     * Funcion que obtenemos la fecha en string
     * @returns {*}
     */
    this.getFecha = function() {
        return fecha;
    };
    /**
     * Función que obtenemos el nombre de fichero que lo contiene
     * @returns {*}
     */
    this.getFichero = function() {
        return fichero;
    };
    /**
     * Función que obtenemos el valor de una función
     * @returns {*}
     */
    this.getValor = function() {
        return valor;
    };
    /**
     * Función que obtenemos el valor de la decha en ms
     * @returns {number}
     */
    this.getFechams = function (){

        //Cambiamos year por año por problemas de compatibilidad ASCI
        var year=fichero[0]+fichero[1]+fichero[2]+fichero[3];
        var mes=fichero[4]+fichero[5];
        var dia=(fecha[0])+(fecha[1]);
        var hora=fecha[3]+fecha[4];
        var minutos=fecha[6]+fecha[7];
        var segundos=fecha[9]+fecha[10];
        var ms="";
        for(var y=12; y<fecha.length-3;y++){
            ms+=fecha[y];
        }
        year= parseInt(year);
        mes = parseInt(mes) -1;
        dia=parseInt(dia);
        hora=parseInt(hora);
        minutos=parseInt(minutos);
        segundos=parseInt(segundos);
        ms= parseInt(ms);
        return Date.UTC(year,mes,dia,hora,minutos,segundos,ms);
    };


}