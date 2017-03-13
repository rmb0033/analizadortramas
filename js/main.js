/**
 * Created by alumno on 12/03/17.
 */
// function getfecha(fecha){
//
//     // return Date.UTC(año, mes, dia, hora, )
//     //TODO tiene que cogertelo del fichero
//     var año=2000;
//     var mes=1;
//     var dia=(fecha[0])+(fecha[1]);
//     var hora=fecha[3]+fecha[4];
//     var minutos=fecha[6]+fecha[7];
//     var segundos=fecha[9]+fecha[10];
//     var ms="";
//     for(var y=13; y<fecha.length-3;y++){
//         ms+=fecha[y];
//     }
//     dia=parseInt(dia);
//     hora=parseInt(hora);
//     minutos=parseInt(minutos);
//     segundos=parseInt(segundos);
//     return Date.UTC(año,mes,hora,minutos,segundos,ms);
// }
$(function() {

    var fileLoader = new CargadorFicheros();

    iniciarModal(fileLoader);
    // getfecha("30 09:58:04:471988")

    var variables = ["0001", "0002"];
    dato = "0001";

    if(dato in variables){
        console.log("Porque hostias no va");
    }


});

