
function cBoxVariables(biblioteca) {

    var variables = biblioteca.getClaves();
    var grupoCheckboxV="";
    for (var nombreVariable in variables) {
        $('#ventana-variables').append('<option id="'+ variables[nombreVariable]+'"val="'+ variables[nombreVariable]+'" >' + variables[nombreVariable] + '</option>');
    }
    $('.ventana-variables').selectpicker('refresh');


}


function cBoxFicheros(fileLoader) {
    var ficheros = fileLoader.getCargadorTramas().getNombreFicheros();
    for (var nombreFichero in ficheros) {
        $('#ventana-ficheros').append('<option id="'+ ficheros[nombreFichero]+'">' + ficheros[nombreFichero] + '</option>');
    }
    $('#ventana-ficheros').selectpicker('refresh');

}


//TODO Hacer singleton fileLoader, eliminar codigo repetido cargando las variables y ficheros -> convirtiendo a clase (var global)

function aplicarListerVariables(fileLoader) {
    $("#ventana-variables").change(function() {
        cargarOpciones(fileLoader);


        // cargarOpciones(fileLoader);
    });
    $("#ventana-ficheros").change(function() {
        cargarOpciones(fileLoader);


        // cargarOpciones(fileLoader);
    });
}

function cargarVariablesOpciones(fileLoader) {
    return $("#ventana-variables").val();
}

function cargarFicherosOpciones(fileLoader) {
    return $("#ventana-ficheros").val();

}

function cargarOpciones(fileLoader) {
    //TODO hacer clase parametros grafica y otra con checkboxes
    var variables = cargarVariablesOpciones(fileLoader);
    var ficheros= cargarFicherosOpciones(fileLoader);
    var tipoGrafica = "Gráfica temporal";
    //TODO en la version alfa solo vamos a tener grafica temporal
    // var tipoGrafica= $("#selector-graficas").val();
    var opciones={};
    opciones["variables"]=variables;
    opciones["ficheros"]=ficheros;
    opciones["tipoGrafica"]=tipoGrafica;
    if(variables.length >0 & ficheros.length >0) {
        obtenerDatosFecha(fileLoader, opciones);
    }
}

function aplicarListenerTipoGrafica() {
    $("#selector-graficas").change(function() {
        // $("#grafica").html("");
        //TODO resetear checkboxes tambien
    });

}

function obtenerDatosFecha(fileLoader, opciones) {

    var opcVariables = opciones["variables"];
    var opcFicheros = opciones["ficheros"];
    var variblesCargadasBiblioteca = fileLoader.getBiblioteca().getVariables();

    //Nuestra solucion será un unico array o varios arrays
    opciones["datos"]=obtenerDatosGraficaTemporal(opcVariables,opcFicheros,variblesCargadasBiblioteca);
    //TODO para la version alfa no vamos a tener selector de gráficas
    //     switch (opciones["tipoGrafica"]) {
    //         case "Gráfica temporal":
    //             // console.log("Temporal opciones");
    //             opciones["datos"]=obtenerDatosGraficaTemporal(opcVariables,opcFicheros,variblesCargadasBiblioteca);
    //             break;
    //         case "Gráfica X Y" :
    //             // console.log("Temporal grafica");
    //             opciones["datos"]=obtenerDatosGraficaXY(opcVariables,opcFicheros,variblesCargadasBiblioteca);
    //             break;
    //     }
    // console.log(solucion);
    dibujarGrafica(opciones);
};


function obtenerDatosGraficaTemporal(opcionesVariables,opcionesFichero,variblesCargadasBiblioteca ) {
    var solucion=[];
    for (var indexVariable in opcionesVariables){
        var solucionVariable=[];
        // var index=0; //Nos interesa el orden en el que los añadimos
        var valoresVar =variblesCargadasBiblioteca[opcionesVariables[indexVariable]].getValores();
        for(var indexValor in valoresVar){
            // for(var indF=0;indF<opcionesFichero.length; indF++){
            //     if(opcionesFichero[x]==valoresVar[indexValor].getFichero()){

            if($.inArray(valoresVar[indexValor].getFichero(),opcionesFichero)>-1){
                // console.log("encontrado");
                var solVal=[];
                // console.log("P"+valoresVar[indexValor].getFechams());
                //Guardamos tambien la fecha porque luego al iterarla con Object.keys, la fecha
                //que estamos usando como entrada del diccionario se convierte a un string y queremos que sea
                //un objeto de tipo Date.UTC
                solVal[0]=valoresVar[indexValor].getFechams();
                solVal[1]=valoresVar[indexValor].getValor();

                solucionVariable[valoresVar[indexValor].getFechams()]=solVal;
                // if(valoresVar[indexValor].getFechams()==){
                //     valoresVar[indexValor]
                // }

                // index++;
            }
        }


        var keys = Object.keys(solucionVariable);
        keys.sort();
        var solucionOrdenada=[];
        for(var i=0; i<keys.length;i++){
            var clave= keys[i];
            var valoresOrdenados=[];
            valoresOrdenados[0]=solucionVariable[clave][0];
            valoresOrdenados[1]=solucionVariable[clave][1];
            solucionOrdenada[i]=valoresOrdenados;
        }
        var dibujoGrafica= {};
        dibujoGrafica["name"]=opcionesVariables[indexVariable];
        dibujoGrafica["data"]=solucionOrdenada;
        solucion.push(dibujoGrafica);
    }
    return solucion;

}
function obtenerDatosGraficaXY(opcionesVariables,opcionesFichero,variblesCargadasBiblioteca ){
    var solucion=[];
    var valores=[];
    for (var indexVariable in opcionesVariables){
        valores.push(indexVariable);
    }

    var valores1= variblesCargadasBiblioteca[opcionesVariables[valores[0]]].getValores();
    var valores2= variblesCargadasBiblioteca[opcionesVariables[valores[1]]].getValores();
    //Nos aseguramos que el numero de valores de 1 sea menor o igual que el numero de valores de 2
    if(valores1.length>valores2.length){
        valores2= variblesCargadasBiblioteca[opcionesVariables[valores[1]]].getValores();
        valores1= variblesCargadasBiblioteca[opcionesVariables[valores[0]]].getValores();
    }
    var indexSolucionDatos=0;
    var SolucionDatos=[];
    for(var indexValor in valores1){
        if(($.inArray(valores1[indexValor].getFichero(),opcionesFichero)>-1)
            && $.inArray(valores2[indexValor].getFichero(),opcionesFichero)>-1){
            var solVal=[];
            solVal[0]=valores1[indexValor].getValor();
            solVal[1]=valores2[indexValor].getValor();
            SolucionDatos[indexSolucionDatos]=solVal;
            indexSolucionDatos++;
        }
    }
    var dibujoGrafica= {};
    dibujoGrafica["name"]=opcionesVariables[0]+ " / "+opcionesVariables[1];
    dibujoGrafica["data"]=SolucionDatos;
    solucion.push(dibujoGrafica);
    return solucion;
}