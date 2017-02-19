
$(function() {

    var boton = $(".clickable");

    cargarTramasYConfigXML(boton);

    boton.click(function() {

        //imprimirTrama("0001");
        //imprimirXML();
        //var configuracion = obtenerConfdesdeXML(xml);
        //var biblioteca = cargarBiblioteca("0001", tramas, configuracion);
        var conf = new Configuracion(xml);
        var biblioteca= new Biblioteca(conf, tramas);
        console.log(biblioteca);


        // console.log(conf);

        //var biblio= cargarBiblioteca(key,tramas, configuracion);
        //console.log(biblioteca);
        //parserXML("0001");
        //carga
        //sacarFecha("30 09:58:04:471988 03E#F1039A0C9E0B0800");
        //sacarValores("30 09:58:04:471988 03E#F1039A0C9E0B0800");


  //fin del procesamiento xml
       //mascaraHexBin( "F1039A0C9E0B0800",0, 3);


    });

});


