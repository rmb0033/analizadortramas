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
    this.getFechams = function (){

        // return Date.UTC(año, mes, dia, hora, )
        //TODO tiene que cogertelo del fichero
        var año=2000;
        var mes=1;
        var dia=(fecha[0])+(fecha[1]);
        var hora=fecha[3]+fecha[4];
        var minutos=fecha[6]+fecha[7];
        var segundos=fecha[9]+fecha[10];
        var ms="";
        for(var y=12; y<fecha.length-3;y++){
            ms+=fecha[y];
        }
        dia=parseInt(dia);
        hora=parseInt(hora);
        minutos=parseInt(minutos);
        segundos=parseInt(segundos);
        // console.log("año"+año+"mes"+mes+"dia"+dia+"hora"+hora+"minutos"+minutos+"segundos"+segundos+"ms"+ms);
        return Date.UTC(año,mes,dia,hora,minutos,segundos,ms);
    }

}