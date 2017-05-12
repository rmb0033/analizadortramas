/**
 * Created by alumno on 9/05/17.
 */
function BotonesFiltraje(){

    desactivarFuncionesBusqueda();
    desactivarFuncionesFiltro();
    function desactivarFuncionesBusqueda(){
        $("#busquedaizq").prop("disabled", true);
        $("#busquedader").prop("disabled", true);
        $("#igualarb1").prop("disabled", true);
        $("#igualarb2").prop("disabled", true);
    }


    function activarFuncionesBusqueda(){
        $("#busquedaizq").prop("disabled", false);
        $("#busquedader").prop("disabled", false);
        $("#igualarb1").prop("disabled", false);
        $("#igualarb2").prop("disabled", false);
    }
    function desactivarFuncionesFiltro(){
        $("#borrarfiltro").prop("disabled", true);
    }

    function activarFuncionesFiltro(){
        $("#borrarfiltro").prop("disabled", false);


    }

    $("#busqueda").click(function(){
        if($(this).hasClass('active')){

            $(this).removeClass('active');
            $("#filtrado").prop("disabled", false);
            desactivarFuncionesBusqueda();
            desactivarFuncionesFiltro();


        }else{
            $(this).addClass('active');
            $("#filtrado").prop("disabled", true);
            activarFuncionesBusqueda();
            desactivarFuncionesFiltro();
        }
    });


    $("#filtrado").click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $("#busqueda").prop("disabled", false);
            desactivarFuncionesFiltro();
            desactivarFuncionesBusqueda();

        }else{
            $(this).addClass('active');
            $("#busqueda").prop("disabled", true);
            activarFuncionesFiltro();
            desactivarFuncionesBusqueda();

        }
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