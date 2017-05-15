
//Función principal
//TODO cambiar nombre fichero
function CargarOpciones(fileLoader, opcionesGrafica, opcionesVariable) {

    var tipoGrafica=opcionesGrafica[0]["tipoGrafica"];

    if(tipoGrafica== "X Y Chart"){
        obtenerDatosGraficaXY(fileLoader,opcionesGrafica, opcionesVariable);
    }
    else{
        obtenerDatosGraficaTemporal(fileLoader,opcionesGrafica, opcionesVariable);
    }


    function obtenerDatosGraficaTemporal(fileLoader,opcionesGrafica, opcionesVariables) {
        var variblesCargadasBiblioteca = fileLoader.getBiblioteca().getVariables();
        var opcionGrafica= new OpcionesGrafica();
        var opcionesFichero = opcionesGrafica[0]["archivos"];

        //Recorremos las variables seleccionadas por la interfaz
        for (var indexVariable in opcionesVariables){
            var opcionesVariable= new OpcionesVariable();
            //TODO es un  hash no un array, arreglar en la clase de gráfica
            var solucionVariable=[];
            // aqui se deberia hacer toda la precarga de opciones de variable
            // opcionesVariables[indexVariable]["variable"] nombre de la variable REAL.

            var valoresVar =variblesCargadasBiblioteca[opcionesVariables[indexVariable]["variable"]].getValores();
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


            opcionesVariable.setNombreVariable(opcionesVariables[indexVariable]["nombre"]);
            opcionesVariable.setDatos(solucionVariable);
            opcionesVariable.setColor(opcionesVariables[indexVariable]["color"]);
            opcionesVariable.setDimensionPunto(opcionesVariables[indexVariable]["grosorpunto"]);
            opcionesVariable.setGrosorLinea(opcionesVariables[indexVariable]["grosorlinea"]);
            opcionesVariable.tipoCronograma(opcionesVariables[indexVariable]["cronograma"]);
            opcionGrafica.addOpcionVariable(opcionesVariable.getOpciones());

        }
        //TODO cambiar estructura de llamadas, opcionGrafica deberia llamarse Grafica.
        //Cuando la creemos deberiamos pasarle
        opcionGrafica.getOpciones();
        opcionGrafica.setTipoGrafica(tipoGrafica);
        opcionGrafica.setTipodeCuerda(opcionesGrafica[0]["tipoCuerda"]);
        opcionGrafica.setMinEjeYconf(opcionesGrafica[0]["ymin"]);
        opcionGrafica.setMaxEjeYconf(opcionesGrafica[0]["ymax"]);
        opcionGrafica.setAuto(opcionesGrafica[0]["autoajuste"]);



        opcionGrafica.pintarGrafica();
        opcionGrafica.pintarGraficaMaestra();

    }

    function obtenerDatosGraficaXY(fileLoader,opcionesGrafica, contenedorVariables ){


        var variablesBiblioteca = fileLoader.getBiblioteca().getVariables();
        var opcionGrafica= new OpcionesGrafica();
        var opcionesFichero = opcionesGrafica[0]["archivos"];



        var paresDatos=[];
        //tenemos que ordenar las 2 colecciones con las que queremos trabajar
        var opcionesVariables=[];
        opcionesVariables.push(contenedorVariables[0]["variableX"]);
        opcionesVariables.push(contenedorVariables[0]["variableY"]);

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
            paresDatos.push(solucionVariable);

        }

        var valores1=Object.keys(paresDatos[0]).sort();
        var valores2=Object.keys(paresDatos[1]).sort();

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
                            while (valor1[0] >= valor2[0] && i < valor1.length - 1) {
                                i++;
                                if(isNaN(valores1[i] && i<valores1.length)){
                                    i++;
                                }
                                else if(isNaN(valores2[j] && j <valores2.length)){
                                    j++;
                                }
                                else{
                                    valor1 = paresDatos[0][valores1[i]];
                                }
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
                            while (valor1[0] <= valor2[0] && j < valor1.length - 1) {
                                j++;
                                if(isNaN(valores1[i] && i<valores1.length)){
                                    i++;
                                }
                                else if(isNaN(valores2[j] && j <valores2.length)){
                                    j++;
                                }
                                else{
                                    valor2 = paresDatos[1][valores2[j]];
                                }
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
        opcionesVariable.setNombreVariable(contenedorVariables[0]["nombre"]);
        opcionesVariable.setDatos(tablaXY);
        opcionesVariable.setColor(contenedorVariables[0]["color"]);
        opcionesVariable.setDimensionPunto(contenedorVariables[0]["grosorpunto"]);
        opcionesVariable.setGrosorLinea(contenedorVariables[0]["grosorlinea"]);



        opcionGrafica.addOpcionVariable(opcionesVariable.getOpciones());
        opcionGrafica.getOpciones();

        opcionGrafica.setTipoGrafica(tipoGrafica);
        opcionGrafica.setTipodeCuerda(opcionesGrafica[0]["tipoCuerda"]);
        opcionGrafica.setMinEjeYconf(opcionesGrafica[0]["ymin"]);
        opcionGrafica.setMaxEjeYconf(opcionesGrafica[0]["ymax"]);
        opcionGrafica.setAuto(opcionesGrafica[0]["autoajuste"]);
        opcionGrafica.pintarGrafica();
        opcionGrafica.pintarGraficaMaestra();



    }
}








