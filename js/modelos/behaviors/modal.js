/**
 * Created by alumno on 12/03/17.
 */
/**
 * Comportamientos de modal
 */
// $(function() {

function iniciarModal(fileLoader) {
    var file;
    //Esto puede ir aqui o en cualquier otro script


    var peticionesAjax = fileLoader.getCargadorTramas().getpeticionesAjax();

    //Se inicializa el modal
    $("#myModal").modal();


    //Activamos la carga de fichero.
    $("#elegir-archivo").change(function() {
        $("#elegir-archivo-aceptar").prop("disabled", false);
    });


    //Comportamiento cuando clickamos en aceptar
    $("#elegir-archivo-aceptar").click(function() {
        file = $("#elegir-archivo").prop('files')[0];
        if (file) {
            fileLoader.getCargadorXML().cargarConfiguracionJS(file);
            $("#myModal").modal('hide');
        }
    });


    //Comportamiento cuando el modal se oculta (Se clicka fuera o se da cancelar)
    $('#myModal').on('hidden.bs.modal', function () {

        if (!file) {
            peticionesAjax.push(fileLoader.getCargadorXML().cargarConfiguracionDefecto("config_prueba.xml"));
        }

        $.when.apply(this, peticionesAjax).done(function() {
            fileLoader.actualizarBiblioteca();
            //TODO aqui deberia ir el funcionamiento de las opciones de la gráfica
            cBoxVariables(fileLoader.getBiblioteca());
            cBoxFicheros(fileLoader);

            //TODO no entiendo porque tiene que estar dentro de la función
            // cBoxAccion();

            // dormir(3000); // TODO DESCOMENTAR ESTA LINEA PARA PROBAR EL SPINNER DE CARGA
            $(".spinner").hide();
        });
    });

    //Configuración del lector de archivos
    $(":file").filestyle({icon: false});
}

// });



/**

 * Herramienta testing. * Funcion que no es mia.
 * @param milliseconds
 */
function dormir(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}
