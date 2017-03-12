$(function() {

    var file;
    var peticionesAjax =  cargarTramas(); //Tarda 8 segundos

    $("#myModal").modal();

    $('#myModal').on('hidden.bs.modal', function () {
        // TODO AQUI SE VA A MOSTRAR LA PANTALLA DE CARGA

        if (!file) {
            console.log("Se carga archivo de configuración por defecto");
            peticionesAjax.push(readConfigXMLFile("config_prueba.xml")); // Tarda 0.5 segundos
        }

        $.when.apply(this, peticionesAjax).done(function() {
            var conf = new Configuracion(xml); //Tarda 0.5 segundos
            var biblioteca = new Biblioteca(conf, tramas); //Tardar 5 segundos.
            colocarCheckBox(biblioteca);
            // TODO AQUI SE VA A ELIMINAR LA PANTALLA DE CARGA
        });
    });

    $("#elegir-archivo").change(function() {
        $("#elegir-archivo-aceptar").prop("disabled", false);
    });

    $("#elegir-archivo-aceptar").click(function() {
        file = $("#elegir-archivo").prop('files')[0];
        if (file) {
            fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);
        }
    });

    function receivedText() {
        var parser = new DOMParser();
        xml = parser.parseFromString(fr.result, "text/xml");
        console.log(xml);
        $("#myModal").modal('hide');
    }

    $(":file").filestyle({icon: false});

    $(".ventana-variables").html("");

});


