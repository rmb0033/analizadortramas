
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

    $("#selector-graficas").change(function() {
        $("#grafica").html("");
        cargarOpciones(fileLoader);

        //TODO resetear checkboxes tambien
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
    //aqui cargamos una u otra
    // var tipoGrafica = "Gráfica temporal";
    //TODO en la version alfa solo vamos a tener grafica temporal
    var tipoGrafica= $("#selector-graficas").val();
    var opciones={};
    opciones["variables"]=variables;
    opciones["ficheros"]=ficheros;
    opciones["tipoGrafica"]=tipoGrafica;
    //TODO hay que hacer un campo donde se pueda guardar esto
    opciones["maximoPuntos"]=600;


    if(tipoGrafica== "X Y chart"){
        if(variables.length ==2 & ficheros.length >0){
            obtenerDatosGraficaXY(fileLoader,opciones);
        }
    }
    else{
        if(variables.length >0 & ficheros.length >0) {
            obtenerDatosFecha(fileLoader, opciones);
        }
    }


}

//TODO quitar esta funcion
function obtenerDatosFecha(fileLoader, opciones) {


    var variblesCargadasBiblioteca = fileLoader.getBiblioteca().getVariables();

    obtenerDatosGraficaTemporal(opciones,variblesCargadasBiblioteca);


    // dibujarGrafica(opciones);
};


function obtenerDatosGraficaTemporal(opciones,variblesCargadasBiblioteca ) {
    var opcionGrafica= new OpcionesGrafica();
    var opcionesVariables = opciones["variables"];
    var opcionesFichero = opciones["ficheros"];
    var limitePuntos=opciones["maximoPuntos"];

    //Recorremos las variables seleccionadas por la interfaz
    for (var indexVariable in opcionesVariables){
        var opcionesVariable= new OpcionesVariable();
        var solucionVariable=[];
        // var index=0; //Nos interesa el orden en el que los añadimos
        var valoresVar =variblesCargadasBiblioteca[opcionesVariables[indexVariable]].getValores();
        //Obtenemos de la biblioteca las variables que vamos a graficar.
        for(var indexValor in valoresVar){
            //Comprobamos que la variable que está almacenada en la biblioteca, se encuentra en el fichero seleccionado
            //por el usuario
            if($.inArray(valoresVar[indexValor].getFichero(),opcionesFichero)>-1){
                var solVal=[];
                //Guardamos tambien la fecha porque luego al iterarla con Object.keys, la fecha
                //que estamos usando como entrada del diccionario se convierte a un string y queremos que sea
                //un objeto de tipo Date.UTC
                solVal[0]=valoresVar[indexValor].getFechams();
                solVal[1]=valoresVar[indexValor].getValor();

                solucionVariable[valoresVar[indexValor].getFechams()]=solVal;

            }
        }


        opcionesVariable.setNombreVariable(opcionesVariables[indexVariable]);
        opcionesVariable.setDatos(solucionVariable);
        opcionGrafica.addOpcionVariable(opcionesVariable.getOpciones());

    }
    //TODO cambiar estructura de llamadas, opcionGrafica deberia llamarse Grafica.
    //Cuando la creemos deberiamos pasarle
    opcionGrafica.getOpciones();
    opcionGrafica.setTipoGrafica("tiempo");
    opcionGrafica.pintarGrafica();
    opcionGrafica.pintarGraficaMaestra();

}


function obtenerDatosGraficaXY(fileLoader,opciones ){
    var variablesBiblioteca=fileLoader.getBiblioteca().getVariables();
    var opcionGrafica= new OpcionesGrafica();
    var opcionesVariables = opciones["variables"];
    var opcionesFichero = opciones["ficheros"];
    var limitePuntos=opciones["maximoPuntos"];
    var nombres=[];
    var paresDatos=[];
    //tenemos que ordenar las 2 colecciones con las que queremos trabajar
    for (var indexVariable in opcionesVariables){
        var solucionVariable={};
        var valoresVar =variablesBiblioteca[opcionesVariables[indexVariable]].getValores();
        for(var indexValor in valoresVar){
            //Comprobamos que la variable que está almacenada en la biblioteca, se encuentra en el fichero seleccionado
            //por el usuario
            if($.inArray(valoresVar[indexValor].getFichero(),opcionesFichero)>-1){
                var solVal=[];
                solVal[0]=valoresVar[indexValor].getFechams();
                solVal[1]=valoresVar[indexValor].getValor();
                solucionVariable[valoresVar[indexValor].getFechams()]=solVal;

            }
        }
        nombres.push(opcionesVariables[indexVariable]);
        paresDatos.push(solucionVariable);

    }

    var valores1=Object.keys(paresDatos[0]).sort();
    var valores2=Object.keys(paresDatos[1]).sort();
    // var sol=[];
    // sol[0]=paresDatos[0][valores1[i]][1];
    // sol[1]=paresDatos[1][valores2[j]][1];
    // tablaXY[paresDatos[1][valores2[j]][0]]=sol;
    var tablaXY=[];
    if(valores2.length>0 && valores1.length>0){
        var sincronizados=false;
        var i=0;
        var j=0;
        var valor1;
        var valor2;
        while(i<valores1.length && j <valores2.length){

            valor1=paresDatos[0][valores1[i]];
            valor2=paresDatos[1][valores2[j]];
            if(isNaN(valores1[i])){
                i++;
            }
            else if(isNaN(valores2[j])){
                j++;
            }
            else {
                if (valor1[0] < valor2[0]) {
                    if (!sincronizados) {
                        while (valor1[0] >= valor2[0] || i < valor1.length - 1) {
                            i++;
                            valor1 = paresDatos[0][valores1[i]];
                        }
                        if (i < valor1.length - 1) {
                            sincronizados = true;
                        } else {
                            break;
                        }
                    } else {
                        //Aqui deberia hacer las cosas normales
                        var sol = [];
                        sol[0] = valor1[1];
                        sol[1] = valor2[1];
                        tablaXY[valor1[0]] = sol;
                        i++;
                    }
                }
                else if (valor1[0] > valor2[0]) {
                    if (!sincronizados) {
                        while (valor1[0] <= valor2[0] || j < valor1.length - 1) {
                            j++;
                            valor2 = paresDatos[1][valores2[j]];
                        }
                        if (j < valor1.length - 1) {
                            sincronizados = true;
                        } else {
                            break;
                        }
                    } else {
                        var sol = [];
                        sol[0] = valor1[1];
                        sol[1] = valor2[1];
                        tablaXY[valor2[0]] = sol;
                        j++;
                    }
                }
                else if (valor1[0] = valor2[0]) {
                    if (!sincronizados) {
                        sincronizados = true;
                    }
                    var sol = [];
                    sol[0] = valor1[1];
                    sol[1] = valor2[1];
                    tablaXY[valor1[0]] = sol;
                    i++;
                    j++;
                }
            }
        }
    }
    var opcionesVariable= new OpcionesVariable();
    opcionesVariable.setNombreVariable("X Y");
    opcionesVariable.setDatos(tablaXY);
    opcionGrafica.addOpcionVariable(opcionesVariable.getOpciones());
    opcionGrafica.getOpciones();
    opcionGrafica.pintarGrafica();
    opcionGrafica.pintarGraficaMaestra();

}

