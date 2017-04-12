/**
 * Created by alumno on 11/04/17.
 */

// <button type="button" id="limitederecho" class="btn btn-default">'+
// '<span class="glyphicon glyphicon-indent-right"></span>'+
// '</button>'+
//
function aplicarListenersBotones(grafica, graficaMaestra){

    function desactivarFuncionesReproduccion(){
        $("#play").prop("disabled", true);
        $("#pause").prop("disabled", true);
        $("#pasoanterior").prop("disabled", true);
        $("#pasosiguiente").prop("disabled", true);
    }
    function activarFuncionesReproduccion(){
        $("#play").prop("disabled", false);
        $("#pause").prop("disabled", false);
        $("#pasoanterior").prop("disabled", false);
        $("#pasosiguiente").prop("disabled", false);
    }
    function desactivarFuncionesMovimiento(){
        $("#moverizquierda").prop("disabled", true);
        $("#moverderecha").prop("disabled", true);

    }
    function activarFuncionesMovimiento(){
        $("#moverizquierda").prop("disabled", false);
        $("#moverderecha").prop("disabled", false);

    }
    desactivarFuncionesMovimiento();
    $("#limiteizquierdo").click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $("#limitederecho").prop("disabled", false);
            activarFuncionesReproduccion();
            desactivarFuncionesMovimiento();

        }else{
            $(this).addClass('active');
            $("#limitederecho").prop("disabled", true);
            desactivarFuncionesReproduccion();
            activarFuncionesMovimiento();
        }
    });

    $("#limitederecho").click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $("#limiteizquierdo").prop("disabled", false);
            activarFuncionesReproduccion();
            desactivarFuncionesMovimiento();

        }else{
            $(this).addClass('active');
            $("#limiteizquierdo").prop("disabled", true);
            desactivarFuncionesReproduccion();
            activarFuncionesMovimiento();
        }
    });
    function obtenerTodosDatosEjex(grafica){
        var datos=[];
        for (var x in grafica.data.datasets){
            for(var y in grafica.data.datasets[x].data){
                datos.push(grafica.data.datasets[x].data[y]["x"]);
            }
        }
        return datos.sort();
    }



    var datosOrdenados= obtenerTodosDatosEjex(graficaMaestra);


    $("#moverizquierda").click(function(){
        // graficaMaestra
        for(var x=datosOrdenados.length-1;x>=0; x--) {
            if($("#limiteizquierdo").hasClass('active')) {
                if (datosOrdenados[x] < graficaMaestra.valuesBox.xmin) {
                    cambiarxMin(datosOrdenados[x]);
                    break;
                }
            }
            else{
                if (datosOrdenados[x] < graficaMaestra.valuesBox.xmax) {
                    cambiarxMax(datosOrdenados[x]);
                    break;
                }

            }
        }
    });
    $("#moverderecha").click(function(){
        for(var x=0;x<datosOrdenados.length; x++) {
            if($("#limiteizquierdo").hasClass('active')) {
                if (datosOrdenados[x] > graficaMaestra.valuesBox.xmin) {
                    cambiarxMin(datosOrdenados[x]);
                    break;
                }
            }
            else{
                if (datosOrdenados[x] > graficaMaestra.valuesBox.xmax) {
                    cambiarxMax(datosOrdenados[x]);
                    break;
                }

            }
        }
    });
    function reproducir() {
        var datoxmin=null;
        var datoxmax=null;
        var cambio=null;
        for (var x = 0; x < datosOrdenados.length; x++) {
            if (datoxmin==null && datosOrdenados[x] > graficaMaestra.valuesBox.xmin) {
                datoxmin=datosOrdenados[x];
            }
            if(datoxmax==null && datosOrdenados[x] > graficaMaestra.valuesBox.xmax){
                datoxmax=datosOrdenados[x];
            }
        }
        if(datoxmin!=null){
            cambio= cambiarxMin(datoxmin);
            if(datoxmax!=null)
                cambiarxMax(datoxmax);
        }
        if(datoxmin==null || !cambio){
            // console.log("fin");
            return true;
        }else{
            return false;
        }
    }
//TODO mirar si hace falta valuesBox
    function cambiarxMin(dato){
        if(dato<graficaMaestra.valuesBox.xmax){
            graficaMaestra.valuesBox.xmin = dato;
            graficaMaestra.options.annotation.annotations[0].xMin = dato;
            graficaMaestra.update();
            return true;
        }else{
            return false;
        }

    }
    function cambiarxMax(dato){
        if(dato>graficaMaestra.valuesBox.xmin) {
            graficaMaestra.valuesBox.xmax = dato;
            graficaMaestra.options.annotation.annotations[0].xMax = dato;
            graficaMaestra.update();
            return true;

        }
        else{
            return false;
        }
    }


    $("#play").click(function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $("#limiteizquierdo").prop("disabled", true);
            $("#limitederecho").prop("disabled", true);

            animacionReproduccion();



        }});
    //Función por la cual no bloquea la interfaz gráfica.
    function animacionReproduccion() {
        window.setTimeout(function() {
            //condición salida proceso segundo plano

            if($("#pause").hasClass('active') || reproducir()){
                $("#pause").removeClass('active');
                $("#play").removeClass('active');
                $("#limiteizquierdo").prop("disabled", false);
                $("#limitederecho").prop("disabled", false);
                return true;
            }
            else{
                animacionReproduccion();
            }
        }, 60);
    }

    $("#pause").click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
            $("#play").removeClass('active');
        }
    });

}
