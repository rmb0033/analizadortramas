/**
 * Created by Rodrigo Martinez
 */

/**
 * Clase en la que se encuentran definidos los comportamientos de los botones de los filtros.
 * @constructor
 */
function BotonesFiltraje(){
    //contructor
    desactivarFuncionesBusqueda();
    desactivarFuncionesFiltro();

    /**
     * Funcion que desactiva los botones de las funciones de busqueda
     */
    function desactivarFuncionesBusqueda(){
        $("#busquedaizq").prop("disabled", true);
        $("#busquedader").prop("disabled", true);
        $("#igualarb1").prop("disabled", true);
        $("#igualarb2").prop("disabled", true);
    }

    /**
     * Funcion que activa los botones de busqueda
     */
    function activarFuncionesBusqueda(){
        $("#busquedaizq").prop("disabled", false);
        $("#busquedader").prop("disabled", false);
        $("#igualarb1").prop("disabled", false);
        $("#igualarb2").prop("disabled", false);
    }

    /**
     * Funcion que desactiva el botón de filtro
     */
    function desactivarFuncionesFiltro(){
        $("#borrarfiltro").prop("disabled", true);
    }


    /**
     * Funcion que activa el botón de filtro
     */
    function activarFuncionesFiltro(){
        $("#borrarfiltro").prop("disabled", false);

    }

    /**
     * Función donde se define el comportamiento del botón búsqueda
     */
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

    /**
     * Función donde se define el funcionamiento del botón filtrado
     */
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



    /**
     * Función donde se define el funcionamiento del cursor 1
     */
    $("#bandera1").click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $("#bandera2").prop("disabled", false);
        }else{
            $(this).addClass('active');
            $("#bandera2").prop("disabled", true);
        }
    });




    /**
     * Función donde se define el funcionamiento del cursor 2
     */
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