/**
 * Created by alumno on 12/03/17.
 */


$(function() {
    $(".cargadorDatos").hide();
    modalBienvenida();

    var opcionesVariable= new OpcionesVariable();
    var opcionGrafica= new OpcionesGrafica();



    opcionGrafica.addOpcionVariable(opcionesVariable.getOpciones());
    opcionGrafica.getOpciones();
    opcionGrafica.setTipoGrafica("tiempo");
    opcionGrafica.pintarGrafica();


});
