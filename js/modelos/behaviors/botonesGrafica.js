/**
 * Created by alumno on 11/04/17.
 */

// <button type="button" id="limitederecho" class="btn btn-default">'+
// '<span class="glyphicon glyphicon-indent-right"></span>'+
// '</button>'+
//
function aplicarListenersBotones(ventanaGrafica){
    var grafica= ventanaGrafica.getGrafica();
    var graficaMaestra= ventanaGrafica.getGraficaMaestra();

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
                    cambiarxMin(datosOrdenados[x], null);
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
                    cambiarxMin(datosOrdenados[x], null);
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
            cambio= cambiarxMin(datoxmin,datoxmax);
            if(datoxmax!=null)
                cambiarxMax(datoxmax);
        }
        if(datoxmin==null || !cambio){
            return true;
        }else{
            return false;
        }
    }
    function retroceder(){
        var datoxmin=null;
        var datoxmax=null;
        var cambio=null;
        for (var x = datosOrdenados.length-1; x >=0; x--) {
            if (datoxmin==null && datosOrdenados[x] < graficaMaestra.valuesBox.xmin) {
                datoxmin=datosOrdenados[x];
            }
            if(datoxmax==null && datosOrdenados[x] < graficaMaestra.valuesBox.xmax){
                datoxmax=datosOrdenados[x];
            }
        }
        if(datoxmin!=null){
            cambio= cambiarxMin(datoxmin,datoxmax);
            if(datoxmax!=null)
                cambiarxMax(datoxmax);
        }
        if(datoxmin==null || !cambio){
            return true;
        }else{
            return false;
        }
    }


//TODO mirar si hace falta valuesBox
    function cambiarxMin(dato,datoMax){
        if(dato<graficaMaestra.valuesBox.xmax || datoMax>graficaMaestra.valuesBox.xmin){
            graficaMaestra.valuesBox.xmin = dato;
            graficaMaestra.options.annotation.annotations[0].xMin = dato;
            ventanaGrafica.actualizarGraficas();
            return true;
        }else{
            return false;
        }

    }
    function cambiarxMax(dato){
        if(dato>graficaMaestra.valuesBox.xmin) {
            graficaMaestra.valuesBox.xmax = dato;
            graficaMaestra.options.annotation.annotations[0].xMax = dato;
            ventanaGrafica.actualizarGraficas();
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
        }, 600);
    }
    //Aqui.

    $("#pause").click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
            $("#play").removeClass('active');
        }
    });


    $("#pasosiguiente").click(function(){
        reproducir();
    });

    $("#pasoanterior").click(function(){
       retroceder();
    });

    $("#bandera1").click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $("#bandera2").prop("disabled", false);
        }else{
            $(this).addClass('active');
            $("#bandera2").prop("disabled", true);
        }
    });

    $("#bandera2").click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $("#bandera1").prop("disabled", false);

        }else{
            $(this).addClass('active');
            $("#bandera1").prop("disabled", true);
        }
    });




}
