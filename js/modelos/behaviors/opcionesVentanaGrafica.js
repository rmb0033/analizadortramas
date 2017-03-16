/**
 * Created by alumno on 12/03/17.
 */

// grupoCheckboxF += '' +
//     '<div class="checkbox ' + ficheros[nombreFichero] + '">' +
//     '<label><input type="checkbox" value="">' + ficheros[nombreFichero] + '</label>' +
//     '</div>';

function CheckBoxes() {

    // var listaDeCheckBoxesVariables = [];
    // var listaDeCheckBoxesFicheros = [];
    //
    // function dameVariables() {
    //     for (checkbox in listaDeCheckBoxesVariables) {
    //         // checkbox.checked
    //     }
    // }


}

var consultaVariables = [];
var consultaFicheros = [];

function cBoxVariables(biblioteca) {

    var variables = biblioteca.getClaves();
    var grupoCheckboxV="";
    for (var nombreVariable in variables) {
        grupoCheckboxV += '' +
            '<div class="checkbox ' + variables[nombreVariable] + '">' +
            '<label><input id="'+ variables[nombreVariable]+'" type="checkbox" class="checkbox" value="">' + variables[nombreVariable] + '</label>' +
            '</div>';
    }
    $(".ventana-variables").html(grupoCheckboxV);


    // $( "#apagado" ).click(function() {
    //     console.log("apagado");
    // });
    // for (nombreVariable in variables) {
    //     var variableCheckBox = $("." + variable[nombreVariable]);
    //     listaDeCheckBoxesVariables.push(variableCheckBox);
    // }
    //aplicamos listener en cada variable
    // for (var nombreVariable in variables) {
    //     var variableCheckBox = $("." + variables[nombreVariable]);
    //     listaDeCheckBoxesVariables.push(variableCheckBox);
    //     console.log("Aplicamos configuración a :"+variables[nombreVariable]);
    //     // $("."+ variables[nombreVariable]).mousedown(function() {
    //     //     console.log(variables[nombreVariable]);
    //     // });
    // }
    //
    // console.log(listaDeCheckBoxesVariables);

}


function cBoxFicheros(fileLoader) {
    var ficheros = fileLoader.getCargadorTramas().getNombreFicheros();
    var grupoCheckboxF="";
    for (var nombreFichero in ficheros) {
        grupoCheckboxF += '' +
            '<div class="checkbox ' + ficheros[nombreFichero] + '">' +
            '<label><input id="'+ ficheros[nombreFichero]+'" type="checkbox" value="">' + ficheros[nombreFichero] + '</label>' +
            '</div>';
    }
    $(".ventana-ficheros").html(grupoCheckboxF);

    // for (nombreFichero in ficheros) {
    //     var variableCheckBox = $("." + ficheros[nombreFichero]);
    //     listaDeCheckBoxesFicheros.push(variableCheckBox);
    // }
}
//TODO Hacer singleton fileLoader, eliminar codigo repetido cargando las variables y ficheros -> convirtiendo a clase (var global)

function aplicarListerVariables(fileLoader) {
    var biblioteca=fileLoader.getBiblioteca();
    $(".checkbox").change(function() {
            // console.log("Refrescar grafica");
            cargarOpciones(fileLoader);
    })
}
function cargarVariablesOpciones(fileLoader){
    var variables = fileLoader.getBiblioteca().getClaves();
    var variablesCargadas=[];
    for(var i in variables){
        if($("#"+variables[i]).is(':checked')){
            variablesCargadas.push(variables[i]);
        }
    }
    return variablesCargadas;

}
function cargarFicherosOpciones(fileLoader){
    var ficheros = fileLoader.getCargadorTramas().getNombreFicheros();
    var variablesCargadas=[];
    for(var i in ficheros){
        if($("#"+ficheros[i]).is(':checked')){
            variablesCargadas.push(ficheros[i]);
        }
    }
    return variablesCargadas;

}

function cargarOpciones(fileLoader){
    //TODO hacer clase parametros grafica y otra con checkboxes
    var variables = cargarVariablesOpciones(fileLoader);
    var ficheros= cargarFicherosOpciones(fileLoader);
    var tipoGrafica= $("#selector-graficas").val();
    var opciones={};
    opciones["variables"]=variables;
    opciones["ficheros"]=ficheros;
    opciones["tipoGrafica"]=tipoGrafica;
    if(variables.length >0 & ficheros.length >0){
        obtenerDatosFecha(fileLoader, opciones);
    }
}

function aplicarListenerTipoGrafica()
{
    $("#selector-graficas").change(function() {
        $("#grafica").html("");
        //TODO resetear checkboxes tambien
    });

}

function obtenerDatosFecha(fileLoader, opciones) {

    var opcVariables = opciones["variables"];
    var opcFicheros = opciones["ficheros"];
    var variblesCargadasBiblioteca = fileLoader.getBiblioteca().getVariables();

    //Nuestra solucion será un unico array o varios arrays

        switch (opciones["tipoGrafica"]) {
            case "Gráfica temporal":
                // console.log("Temporal opciones");
                opciones["datos"]=obtenerDatosGraficaTemporal(opcVariables,opcFicheros,variblesCargadasBiblioteca);
                break;
            case "Gráfica X Y" :
                // console.log("Temporal grafica");
                opciones["datos"]=obtenerDatosGraficaXY(opcVariables,opcFicheros,variblesCargadasBiblioteca);
                break;
        }
    // console.log(solucion);
    dibujarGrafica(opciones);
};


function obtenerDatosGraficaTemporal(opcionesVariables,opcionesFichero,variblesCargadasBiblioteca ){
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
                    var solVal;
                    // console.log("P"+valoresVar[indexValor].getFechams());
                    solVal=valoresVar[indexValor].getValor();
                    solucionVariable[valoresVar[indexValor].getFechams()]=solVal;
                    // index++;
                }
            }
        var keys = Object.keys(solucionVariable);
        keys.sort();
        var solucionOrdenada=[];
        for(var i=0; i<keys.length;i++){
            var clave= keys[i];
            var valoresOrdenados=[];
            valoresOrdenados[0]=clave;
            valoresOrdenados[1]=solucionVariable[clave];
            solucionOrdenada[i]=valoresOrdenados;

        }
        // console.log(solucionOrdenada);
        // console.log("Tamaño :"+solucionOrdenada.length);
        //
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
            // console.log("P"+valoresVar[indexValor].getFechams());
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
    // console.log(solucion);
    return solucion;
}