/**
 * Created by alumno on 11/04/17.
 */

// <button type="button" id="limitederecho" class="btn btn-default">'+
// '<span class="glyphicon glyphicon-indent-right"></span>'+
// '</button>'+
//
function aplicarListenersBotones(){

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


$("#limiteizquierdo").click(function(){
    if($(this).hasClass('active')){
        $(this).removeClass('active');
        $("#limitederecho").prop("disabled", false);
        activarFuncionesReproduccion();

    }else{
        $(this).addClass('active');
        $("#limitederecho").prop("disabled", true);
        desactivarFuncionesReproduccion();

    }
});

    $("#limitederecho").click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $("#limiteizquierdo").prop("disabled", false);
            activarFuncionesReproduccion();

        }else{
            $(this).addClass('active');
            $("#limiteizquierdo").prop("disabled", true);
            desactivarFuncionesReproduccion();

        }
    });




// '<button type="button" id="moverizquierda" class="btn btn-default">'+
// '<span class="glyphicon glyphicon-chevron-left"></span>'+
// '</button>'+
//
// '<button type="button" id="moverDerecha" class="btn btn-default">'+
// '<span class="glyphicon glyphicon-chevron-right"></span>'+
// '</button>'+
// '<button type="button" id="play" class="btn btn-default">'+
// '<span class="glyphicon glyphicon-play"></span>'+
// '</button>'+
// '<button type="button" id="pause" class="btn btn-default">'+
// '<span class="glyphicon glyphicon-pause"></span>'+
// '</button>'+
// '<button type="button" id="pasoanterior" class="btn btn-default">'+
// '<span class="glyphicon glyphicon-backward"></span>'+
// '</button>'+
// '<button type="button" id="pasosiguiente" class="btn btn-default">'+
// '<span class="glyphicon glyphicon-forward"></span>'+
// '</button>'+
}
