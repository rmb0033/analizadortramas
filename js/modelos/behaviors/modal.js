/**
 * Created by alumno on 12/03/17.
 */
/**
 * Comportamientos de modal
 */
// $(function() {
//TODO declarar statics
function iniciarModal(fileLoader) {

    //Activamos la carga de fichero.
    $("#elegir-archivo").change(function() {
        var file = $("#elegir-archivo").prop('files')[0];
        if (file) {
            console.log("Cambio detectado");
            fileLoader.getCargadorXML().cargarConfiguracionJS(file);
            $("#elegir-archivo-aceptar").prop("disabled", false);
        }
    });

    //Comportamiento cuando clickamos en aceptar
    $("#elegir-archivo-aceptar").click(function() {
        var operaciones=[];
        operaciones.push($("#myModal").modal('hide'));
        operaciones.push($(".spinner").hide());
        operaciones.push($(".cargadorDatos").show());
        $.when.apply(this, operaciones).done(function() {
            fileLoader.actualizarBiblioteca();
            var cadenaHTMLVar = '<span style="color:#f9fbff">VARIABLES :</span>';
            cadenaHTMLVar += '<select id="ventana-variables" class="selectpicker ventana-variables" multiple>';
            $("#contenedorVariablesRapida").html(cadenaHTMLVar);
            cBoxVariables(fileLoader.getBiblioteca());
            $(".cargadorDatos").hide();
        });
    });


    //Comportamiento cuando el modal se oculta (Se clicka fuera o se da cancelar)
    $('#myModal').on('hidden.bs.modal', function () {
        $(".spinner").hide();
    });

    //Configuración del lector de archivos
    $(":file").filestyle({icon: false});
}

// });
//TODO completar bienvenida
function modalBienvenida() {
    var ficheros=cargarDirectorioFicheros();
    // var fileLoader = new CargadorFicheros(ficheros);
    $("#modalBienvenida").modal();
    actualizarDatapicker(ficheros);
    // //Activamos la carga de fichero.
    $("#ventana-ficheros-bienvenida").change(function() {
        $("#continue-modal").prop("disabled", false);
    });

    // //Comportamiento cuando el modal se oculta (Se clicka fuera o se da cancelar)
    $('#modalBienvenida').on('hidden.bs.modal', function () {
        $(".spinner").hide();
        $(".cargadorDatos").show();
        //TODO ficheros tiene que tener el directorio real de los ficheros, si se cambia hay que filtrarlo
        ficheros= cargarFicheros();
        if(ficheros.length>0){
            var fileLoader = new CargadorFicheros(ficheros);
            var peticionesAjax = fileLoader.getCargadorTramas().getpeticionesAjax();
            peticionesAjax.push(fileLoader.getCargadorXML().cargarConfiguracionDefecto("config_prueba.xml"));
            $.when.apply(this, peticionesAjax).done(function() {
                fileLoader.actualizarBiblioteca();
                cBoxVariables(fileLoader.getBiblioteca());
                cBoxFicheros(fileLoader);

                aplicarListerVariables(fileLoader);
                aplicarListenerTipoGrafica();
                $(".cargadorDatos").hide();
                iniciarModal(fileLoader);
                // iniciarModal(fileLoader);


            });
        }
        else{
            $(".spinner").show();
            $("#modalBienvenida").modal();
        }


    });
    $( "#boton-configuracion" ).click(function() {
        // console.log("Funciona");
        $(".spinner").show();
    });


}


/**

 * Herramienta testing. * Funcion que no es mia.
 * @param milliseconds
 */
function dormir(milliseconds) {
    var start = new Date().getTime();
    while(true){
        if ((new Date().getTime() - start) > milliseconds){
            console.log(start, new Date().getTime());
            break;
        }
    }
}
function cargarDirectorioFicheros(){
    var ficheroFiltrado=[];
    //TODO trata de errores (si no encuentra nada en el directorio)
    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        var ficherosSinProcesar = this.responseText.toString();
        if(ficherosSinProcesar ==""){
            alert("No correct files found into default directory");
            return;
        }
        var ficheroSinFiltrar=ficherosSinProcesar.split(",");

        for(var indiceFichero in ficheroSinFiltrar){
            ficheroFiltrado[indiceFichero]=[];
            for(var indiceString=0; indiceString<ficheroSinFiltrar[indiceFichero].length; indiceString++){
                var caracter=ficheroSinFiltrar[indiceFichero][indiceString];
                while(ficheroFiltrado[indiceFichero].length==0 && indiceString<ficheroSinFiltrar[indiceFichero].length
                &&(!(caracter>="a" && caracter<="z") && !(caracter>="A" && caracter<="Z"))) {
                    indiceString++;
                    caracter=ficheroSinFiltrar[indiceFichero][indiceString];
                }
                if(caracter!=']' && caracter!='[' && caracter!="\\" && caracter!='"'){
                    ficheroFiltrado[indiceFichero]+=caracter;
                }
                // console.log(ficheroFiltrado[indiceFichero]);
            }
        }
        // console.log(ficheroFiltrado);
    };
    oReq.open("get", "listar-ficheros.php", false);
    //                               ^ Don't block the rest of the execution.
    //                                 Don't wait until the request finishes to
    //                                 continue.
    oReq.send();
    return ficheroFiltrado;
}
function actualizarDatapicker(ficheros) {
    for (var nombreFichero in ficheros) {
        // console.log(ficheros[nombreFichero]);
        $('#ventana-ficheros-bienvenida').append('<option id="'+ ficheros[nombreFichero]+'">' + ficheros[nombreFichero] + '</option>');
    }

    $('#ventana-ficheros-bienvenida').selectpicker('refresh');
}
/**
 * Cargamos los ficheros del datapicker en el sistema
 * @returns {*|jQuery}
 */
function cargarFicheros() {
    return $("#ventana-ficheros-bienvenida").val();

}