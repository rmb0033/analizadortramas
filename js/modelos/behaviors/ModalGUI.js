/**
 * Created by Rodrigo Martinez
 */


/**
 * Clase principal donde se  encuentra el lanzamiento de la interfaz gráfica con los modales y donde invocamos
 * al cargador de ficheros
 * @constructor
 */
function ModalGUI() {
    var ficheros=cargarDirectorioFicheros();
    $("#modalBienvenida").modal();

    actualizarDatapicker(ficheros);

    /**
     * Función para activar la carga del fichero
     */
    $("#ventana-ficheros-bienvenida").change(function() {
        $("#continue-modal").prop("disabled", false);
    });

    /**
     * Función que define el comportamiento cuando el modal se oculta (Se clicka fuera o se da cancelar)
     */
    $('#modalBienvenida').on('hidden.bs.modal', function () {
        $(".spinner").hide();
        $(".cargadorDatos").show();
        ficheros= cargarFicheros();
        if(ficheros.length>0){

            var fileLoader = new CargadorFicheros(ficheros);
            var peticionesAjax = fileLoader.getCargadorTramas().getpeticionesAjax();
            peticionesAjax.push(fileLoader.getCargadorXML().cargarConfiguracionDefecto("config_prueba.xml"));
            //Forzamos sincronismo
            $.when.apply(this, peticionesAjax).done(function() {
                fileLoader.actualizarBiblioteca();
                aplicarListenerMenu(fileLoader);
                $(".cargadorDatos").hide();
                iniciarModal(fileLoader);
            });
        }
        else{
            $(".spinner").show();
            $("#modalBienvenida").modal();
        }

    });




    /**
     * Función que se encuentra el comportamiento del botón de configuración
     */
    $( "#boton-configuracion" ).click(function() {
        $(".spinner").show();
    });


    /**
     * Función que inicia el modal por el cual cargamos el XML
     * @param fileLoader
     */
    function iniciarModal(fileLoader) {

        /**
         * Función con la que activamos la carga del fichero
         */
        $("#elegir-archivo").change(function() {
            var file = $("#elegir-archivo").prop('files')[0];
            if (file) {
                fileLoader.getCargadorXML().cargarConfiguracionJS(file);
                $("#elegir-archivo-aceptar").prop("disabled", false);
            }
        });




        /**
         * Comportamiento cuando clickamos en aceptar
         */
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
                $(".cargadorDatos").hide();

            });
        });


        /**
         * Comportamiento cuando el modal se oculta (Se clicka fuera o se da cancelar)
         */
        $('#myModal').on('hidden.bs.modal', function () {
            $(".spinner").hide();
        });

        //Configuración del lector de archivos
        $(":file").filestyle({icon: false});
    }


    /**
     * Función que carga el directorio de ficheros
     * @returns {Array}
     */
    function cargarDirectorioFicheros(){
        var ficheroFiltrado=[];
        var oReq = new XMLHttpRequest(); //New request object
        oReq.onload = function() {
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
                }
            }
        };
        //mensaje bloqueante
        oReq.open("get", "listar-ficheros.php", false);
        oReq.send();
        return ficheroFiltrado;
    }


    /**
     * Función que sirve para actualizar el DataPicker.
     * @param ficheros
     */
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


    /**
     * Función por la cual aplicamos listener al menú superior que se encarga de manejar las vistas,
     * asi como definir su comportamiento
     * @param fileLoader
     */
    function aplicarListenerMenu(fileLoader){
        var contenedorVariable=[];
        var contenedorGrafica=[];
        var opcionesCargadas;
        //Carga por defecto al iniciar la aplicación
        GraficadoRapido(fileLoader,contenedorGrafica, contenedorVariable);
        $("#modalOpciones").modal();

        $("#opc-variable").click(function(){
            if(contenedorGrafica.length>0){
                new InterfazVariable(fileLoader,contenedorGrafica, contenedorVariable);
            }else{
                alert("You must set the chart settings first.");
                new InterfazGrafica(fileLoader,contenedorGrafica,contenedorVariable);
                $("#modalOpciones").modal();
            }
            $("#modalOpciones").modal();
        });

        $("#opc-grafico").click(function(){
            new InterfazGrafica(fileLoader,contenedorGrafica,contenedorVariable);
            $("#modalOpciones").modal();
        });

        $("#exportar").click(function(){
            var contenidoExportacion=[];
            if(contenedorVariable.length>0 && contenedorGrafica.length>0){
                contenidoExportacion.push(contenedorVariable);
                contenidoExportacion.push(contenedorGrafica);
                $("#modalOpciones").modal();

                new Exportar();

                var json=JSON.stringify(contenidoExportacion);
                var data = "text/json;charset=utf-8," + encodeURIComponent(json);
                $('<a href="data:' + data +
                    '" download="data.json"><h1> Download json file</h1></a>').appendTo('#Descargar');
            }
            else{
                alert("You must save your chart settings and variable settings first.")
            }
        });
        $("#importar").click(function(){
            new Importar(fileLoader, contenedorGrafica, contenedorVariable);
            $("#modalOpciones").modal();
        });
        $("#opc-gr").click(function(){
            new GraficadoRapido(fileLoader,contenedorGrafica, contenedorVariable);
            $("#modalOpciones").modal();
        });

        $('#modalOpciones').on('hidden.bs.modal', function () {

            if(contenedorGrafica.length>0 && contenedorVariable.length>0){
                opcionesCargadas= new CargadorOpciones(fileLoader, contenedorGrafica,contenedorVariable );
            }

        });

    }


}

