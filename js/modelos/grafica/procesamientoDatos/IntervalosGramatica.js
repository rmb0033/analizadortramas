/**
 * Created by Rodrigo Martinez
 */

/**
 * Clase en la que se encuentran definido los intervalos de la gramática
 * @param ventanaGrafica
 * @param codigo
 * @constructor
 */
function IntervalosGramatica(ventanaGrafica,codigo){
    var intervalos=[];
    var diccionarioDatos= ventanaGrafica.getDiccionario();

    var code= codigo;
    code=code.toLowerCase();
    var sentencias=[];
    var separadores=[];
    var contador=0;
    //Acción cuando se ejecuta
    calcularIntervalos();
    /**
     * Función para obtener los intervalos una vez ya calculados
     * @returns {Array}
     */
    this.getIntervalos = function(){
        return intervalos;
    };
    /**
     * Función principal donde calculamos los intervalos
     */
    function calcularIntervalos(){
        getSentencias(code);
        intervalos=procesarCodigo();

    }

    /**
     * Función donde obtenemos las sentencias de una query
     * @param code
     */
    function getSentencias(code){
        while(contador<code.length){
            var token= getToken();
            if(token==null){
                alert("Not found variable");
                break;
            }

            var operador= getOperador();
            if(operador==null){
                alert("Not found operator");
                break;
            }

            var comparador=getComparador();
            if(comparador!=null){
                sentencias.push([token,operador,comparador]);
            }
            else{
                alert("Not found value");
            }
            if(!obtenerSeparador()){
                break;
            }
        }
    }

    /**
     * Función en la que obtenemos el separador
     * @returns {boolean}
     */
    function obtenerSeparador(){
        var separador=[];
        var encontrado=false;
        while(!encontrado){
            if(esLetra((code[contador]))){
                encontrado=true;
            }else{
                contador++;
                if(contador>code.length){
                    return false;
                }
            }
        }
        while(esLetra(code[contador])){
            separador.push(code[contador]);
            contador++;
            if(contador>code.length){
                return false;
            }
        }
        separador=separador.join('');
        if(separador=="and" || separador=="or"){
            separadores.push(separador);
            return true;
        }else{
            alert(separador+ " is not valid like a logic connector.");
            sentencias=[];
            return false;
        }
        return false;
    }


    /**
     * Función que nos dice si es o no es una letra
     * @param caracter
     * @returns {boolean}
     */
    function esLetra(caracter){
        if(caracter>="a" && caracter<="z"){
            return true;
        }
        else{
            return false;
        }
    }


    /**
     * Función que utilizamos para saber si es un número
     * @param caracter
     * @returns {boolean}
     */
    function esNumero(caracter){
        if(caracter>="0" && caracter<="9"){
            return true;
        }
        else{
            return false;
        }
    }


    /**
     * Función que utilizamos para saber si es un operador
     * @param caracter
     * @returns {boolean}
     */
    function esOperador(caracter){
        if(caracter==">" || caracter=="<" || caracter=="=" || caracter=="!"){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Función que utilizamos para obtener el token que queremos comparar (variable)
     * @returns {*}
     */
    function getToken(){
        var token=[];
        var contenedorEspacios=[];

        while(!esOperador(code[contador])){
            if(token.length==0 && code[contador]==" "){
                contador++;
                if(contador>code.length){
                    return null;
                }
            }
            else if(code[contador]==" "){
                contenedorEspacios.push(code[contador]);
                contador++;
                if(contador>code.length){
                    return null;
                }
            }else{
                if(contenedorEspacios.length>0){
                    for(var espacios in contenedorEspacios){
                        token.push(contenedorEspacios[espacios]);
                    }
                    contenedorEspacios=[];
                }
                token.push(code[contador]);
                contador++;
                if(contador>code.length){
                    return null;
                }
            }
        }
        return token.join('');
    }


    /**
     * Función para obtener el operador
     * @returns {*}
     */
    function getOperador(){
        var operador=[];
        while(esOperador(code[contador])){
            operador.push(code[contador]);
            contador++;
            if(contador>code.length){
                return null;
            }
        }
        operador=operador.join('');
        if(operador==">" || operador==">=" || operador=="<" || operador=="<="
            ||operador=="==" || operador=="!=" || operador=="="){
            return operador;
        }
        return null;



    }

    /**
     * Función para obtener el número que queremos comparar
     * @returns {*}
     */
    function getComparador(){
        var numero=[];
        var encontrado=false;
        var negativo=false;
        while(!encontrado){
            if(esNumero((code[contador]))){
                encontrado=true;
            }else{
                if(code[contador]=="-"){
                    encontrado=true;
                    negativo=true;
                }
                contador++;
                if(contador>code.length){
                    return null;
                }
            }
        }
        while(esNumero(code[contador])){
            numero.push(code[contador]);
            contador++;
            if(contador>code.length){
                return null;
            }
        }
        if(negativo){
            return 0-parseInt(numero.join(''));
        }else{
            return parseInt(numero.join(''));
        }
    }


    /**
     * Función en la que procesamos el código
     * @returns {Array}
     */
    function procesarCodigo(){
        var solucion=[];
        if(validacionVariables() && sentencias.length-1==separadores.length && sentencias.length!=0){


            var solucion=procesarSentencia(sentencias[0]);
            for(var i=0; i<separadores.length;i++){
                if(separadores[i]=="and"){
                    solucion=logicaAND(solucion, sentencias[i+1]);
                }
                else{
                    solucion=logicaOR(solucion, sentencias[i+1]);

                }
            }
        }
        return solucion;
    }


    /**
     * Función con la que sabemos si un dato está en ese intervalo
     * @param dato
     * @param intervalo
     * @returns {boolean}
     */
    function estaEnElIntervalo(dato,intervalo){
        if(dato<intervalo[0][1]){
            return false;
        }
        else if(dato==intervalo[0][1] && intervalo[0][0]){
            return true;
        }
        else if(dato==intervalo[1][1] && intervalo[1][0]){
            return true;
        }
        else if(dato<intervalo[1][1]){
            return true;
        }
        return false;
    }

    /**
     * FUnción en la que se aplica el conector AND de 2 sentencias
     * @param solucion
     * @param sentencia
     * @returns {Array}
     */
    function logicaAND(solucion, sentencia){
        var intervalo=[];
        var solucionIntervalos=[];
        var nombreVariable= sentencia[0];
        var intervaloAbierto=false;
        var tamano=0;
        var ultimaiteracion;
        for(var variable in diccionarioDatos){
            if(nombreVariable==diccionarioDatos[variable]["label"].toLowerCase()){
                for(var x in diccionarioDatos[variable]["diccionario"]){
                    tamano++;
                }
            }
        }

        for(var variable in diccionarioDatos){
            var indiceIntervalo=0;
            if(nombreVariable==diccionarioDatos[variable]["label"].toLowerCase()){
                var datos= diccionarioDatos[variable]["diccionario"];
                var keys = Object.keys(datos);
                keys=keys.sort();

                for(var x=0; x<keys.length;x++) {
                    var valor=keys[x];
                    if(!isNaN(valor)){
                        ultimaiteracion=valor;
                    }

                    while(indiceIntervalo<solucion.length && valor>solucion[indiceIntervalo][1][1] ){
                        indiceIntervalo++;
                    }

                    if((evaluador(datos[valor][1],sentencia[2],sentencia[1])) &&
                        (indiceIntervalo<solucion.length && estaEnElIntervalo(valor,solucion[indiceIntervalo]))){
                        if(!intervaloAbierto){
                            var segmento=[];
                            segmento.push(true, datos[valor][0]);
                            intervalo.push(segmento);
                            intervaloAbierto=true;
                        }
                    }
                    //Si no se cumple la condición y el intervalo esta abierto
                    else{
                        if(intervaloAbierto){
                            intervaloAbierto=false;
                            var segmento=[];
                            segmento.push(false, datos[valor][0]);
                            intervalo.push(segmento);
                            solucionIntervalos.push(intervalo);
                            intervalo=[];
                        }
                    }
                }
                if(intervaloAbierto){
                    intervaloAbierto=false;
                    var segmento=[];
                    segmento.push(true, datos[ultimaiteracion][0]);
                    intervalo.push(segmento);
                    solucionIntervalos.push(intervalo);
                    intervalo=[];
                }
            }
        }
        return solucionIntervalos;
    }


    /**
     * Función en la que se aplica el conector OR de 2 sentencias
     * @param solucion
     * @param sentencia
     * @returns {Array}
     */
    function logicaOR(solucion, sentencia){

        var intervalo=[];
        var solucionIntervalos=[];
        var nombreVariable= sentencia[0];
        var intervaloAbierto=false;
        var tamano=0;
        var ultimaiteracion;
        for(var variable in diccionarioDatos){
            if(nombreVariable==diccionarioDatos[variable]["label"].toLowerCase()){
                for(var x in diccionarioDatos[variable]["diccionario"]){
                    tamano++;
                }
            }
        }

        for(var variable in diccionarioDatos){
            var indiceIntervalo=0;
            if(nombreVariable==diccionarioDatos[variable]["label"].toLowerCase()){
                var datos= diccionarioDatos[variable]["diccionario"];
                var keys = Object.keys(datos);
                keys=keys.sort();

                for(var x=0; x<keys.length;x++) {
                    var valor=keys[x];
                    if(!isNaN(valor)){
                        ultimaiteracion=valor;
                    }

                    while(indiceIntervalo<solucion.length && valor>solucion[indiceIntervalo][1][1] ){
                        indiceIntervalo++;
                    }

                    if((evaluador(datos[valor][1],sentencia[2],sentencia[1])) ||
                        (indiceIntervalo<solucion.length && estaEnElIntervalo(valor,solucion[indiceIntervalo]))){
                        if(!intervaloAbierto){
                            var segmento=[];
                            segmento.push(true, datos[valor][0]);
                            intervalo.push(segmento);
                            intervaloAbierto=true;
                        }
                    }
                    //Si no se cumple la condición y el intervalo esta abierto
                    else{
                        if(intervaloAbierto){
                            intervaloAbierto=false;
                            var segmento=[];
                            segmento.push(false, datos[valor][0]);
                            intervalo.push(segmento);
                            solucionIntervalos.push(intervalo);
                            intervalo=[];
                        }
                    }
                }
                if(intervaloAbierto){
                    intervaloAbierto=false;
                    var segmento=[];
                    segmento.push(true, datos[ultimaiteracion][0]);
                    intervalo.push(segmento);
                    solucionIntervalos.push(intervalo);
                    intervalo=[];
                }
            }
        }
        return solucionIntervalos;
    }


    /**
     * FUnción para procesar la sentencia en particular
     * @param sentencia
     * @returns {Array}
     */
    function procesarSentencia(sentencia){
        var intervalo=[];
        var solucionIntervalos=[];
        var nombreVariable= sentencia[0];
        var intervaloAbierto=false;
        var tamano=0;
        var ultimaiteracion;
        for(var variable in diccionarioDatos){
            if(nombreVariable==diccionarioDatos[variable]["label"].toLowerCase()){
                for(var x in diccionarioDatos[variable]["diccionario"]){
                    tamano++;
                }
            }
        }

        for(var variable in diccionarioDatos){
            if(nombreVariable==diccionarioDatos[variable]["label"].toLowerCase()){
                var datos= diccionarioDatos[variable]["diccionario"];
                var keys = Object.keys(datos);
                keys=keys.sort();
                for(var x=0; x<keys.length;x++) {
                    var valor=keys[x];
                    if(!isNaN(valor)){
                        ultimaiteracion=valor;
                    }

                    if(evaluador(datos[valor][1],sentencia[2],sentencia[1])){
                        if(!intervaloAbierto){
                            var segmento=[];
                            segmento.push(true, datos[valor][0]);
                            intervalo.push(segmento);
                            intervaloAbierto=true;
                        }
                    }
                    //Si no se cumple la condición y el intervalo esta abierto
                    else{

                        if(intervaloAbierto){

                            intervaloAbierto=false;
                            var segmento=[];
                            segmento.push(false, datos[valor][0]);
                            intervalo.push(segmento);
                            solucionIntervalos.push(intervalo);
                            intervalo=[];
                        }
                    }
                }
                if(intervaloAbierto){
                    intervaloAbierto=false;
                    var segmento=[];
                    segmento.push(true, datos[ultimaiteracion][0]);
                    intervalo.push(segmento);
                    solucionIntervalos.push(intervalo);
                    intervalo=[];
                }
            }
        }
        return solucionIntervalos;

    }

    /**
     * FUnción que interpreta la lógica de la query a javascript
     * @param valor1
     * @param valor2
     * @param comparador
     * @returns {boolean}
     */
    function evaluador(valor1, valor2, comparador){
        switch(comparador){
            case ">":
                if(valor1>valor2){
                    return true;
                }
                else{
                    return false;
                }
            case ">=":
                if(valor1>=valor2){
                    return true;
                }
                else{
                    return false;
                }
            case "<":
                if(valor1<valor2){
                    return true;
                }
                else{
                    return false;
                }
            case "<=":
                if(valor1<=valor2){
                    return true;
                }
                else{
                    return false;
                }
            case "=":
                if(valor1==valor2){
                    return true;
                }
                else{
                    return false;
                }
            case "==":
                if(valor1==valor2){
                    return true;
                }
                else{
                    return false;
                }
            case "!=":
                if(valor1!=valor2){
                    return true;
                }
                else{
                    return false;
                }
        }
    }


    /**
     * Función por la que sabremos si las variables son correctas
     * @returns {boolean}
     */
    function validacionVariables(){
        for(var x in sentencias){
            var encontrado=false;

            var nombreVariable= sentencias[x][0];

            for(var variable in diccionarioDatos){
                // console.log(nombreVariable,diccionarioDatos[variable]["label"].toLowerCase());
                if(nombreVariable==diccionarioDatos[variable]["label"].toLowerCase()){
                    encontrado=true;
                    break;
                }

            }
            if(!encontrado){
                alert(nombreVariable +" is not a variable");
                return false;
            }

        }
        return true;
    }



}