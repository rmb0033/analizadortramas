/**
 * Created by alumno on 8/05/17.
 */
function IntervalosGramatica(ventanaGrafica,codigo){
    var intervalos=[];
    var diccionarioDatos= ventanaGrafica.getDiccionario();
    console.log(diccionarioDatos);
    var code= "readed tag=27 or readed tag=1009";
    code=code.toLowerCase();
    var sentencias=[];
    var separadores=[];
    var contador=0;

    function getSentencias(code){
        while(contador<code.length){
            var token= getToken();
            if(token==null){
                break;
            }

            var operador= getOperador();
            if(operador==null){
                break;
            }

            var comparador=getComparador();
            if(comparador!=null)
                sentencias.push([token,operador,comparador]);
            if(!obtenerSeparador()){
                break;
            }
        }
        console.log(sentencias);
        console.log(separadores);
    }
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
        }
        return false;
    }

    function esLetra(caracter){
        if(caracter>="a" && caracter<="z"){
            return true;
        }
        else{
            return false;
        }
    }

    function esNumero(caracter){
        if(caracter>="0" && caracter<="9"){
            return true;
        }
        else{
            return false;
        }
    }
    function esOperador(caracter){
        if(caracter==">" || caracter=="<" || caracter=="=" || caracter=="!"){
            return true;
        }
        else{
            return false;
        }
    }
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

    function procesarCodigo(){
        var intervalo=[];
        var solucion=[];
        if(validacionVariables() && sentencias.length-1==separadores.length && sentencias.length!=0){
            for(var i=0; i<sentencias.length;i++){
                intervalo.push(procesarSentencia(sentencias[i]));
            }
            console.log(intervalo);
            var solucion=intervalo[0];
            console.log(solucion);
            for(var i=0; i<separadores.length;i++){
                if(separadores[i]=="and"){
                    solucion=logicaAND(solucion, intervalo[i+1]);
                }
                else{
                    solucion=logicaOR(solucion, intervalo[i+1]);
                }
            }
        }else{
            //TODO mensaje de error o quitar
        }
        console.log(solucion);
        return solucion;
    }
    function logicaAND(intervalo1, intervalo2){
        var solucion=[];
        for(var int1 in intervalo1){
            for(var int2 in intervalo2){
                var valorMin1=intervalo1[int1][0][1];
                var valorMin2=intervalo2[int2][0][1];
                var valorMax1=intervalo1[int1][1][1];
                var valorMax2=intervalo2[int2][1][1];
                var limiz=Math.max(valorMin1, valorMin2);
                var limderecho=Math.min(valorMax1, valorMax2);
                if(limderecho-limiz>=0){
                    //Comprobamos si se cumple el limite

                    if((limderecho==valorMax1 && intervalo1[int1][1][0])||
                        (limderecho==valorMax2 && intervalo2[int2][1][0]) ||
                        (limiz==limderecho && intervalo1[int1][1][0]
                        && intervalo2[int2][1][0])){
                        //es una caso favorable
                        var intervaloizq=[];
                        var intervaloder=[];
                        var nuevoIntervalo=[];
                        intervaloizq.push(true,limiz);
                        intervaloder.push(true,limderecho);
                        nuevoIntervalo.push(intervaloizq);
                        nuevoIntervalo.push(intervaloder);
                        solucion.push(nuevoIntervalo);

                    }else{
                        if(limderecho-limiz!=0){
                            var intervaloizq=[];
                            var intervaloder=[];
                            var nuevoIntervalo=[];
                            intervaloizq.push(true,limiz);
                            intervaloder.push(false,limderecho);
                            nuevoIntervalo.push(intervaloizq);
                            nuevoIntervalo.push(intervaloder);
                            solucion.push(nuevoIntervalo);
                        }
                    }

                }
            }
        }
        console.log(solucion);
        return solucion;

    }
    function logicaOR(intervalo1, intervalo2){
        var valor=[];
        for(var x in intervalo2){
            intervalo1.push(intervalo2[x]);
        }

        var cambio=false;
        for(var i=0;i<intervalo1.length;i++){
            for(var j=0;j<intervalo1.length;j++){
                if(i!=j){
                    if(intervalo1[i][1][1]>=intervalo1[j][0][1] &&
                        intervalo1[j][1][1]>=intervalo1[i][0][1]){
                        var limiz=Math.min(intervalo1[i][0][1], intervalo1[j][0][1]);
                        var limderecho=Math.max(intervalo1[i][1][1], intervalo1[j][1][1]);
                        var cerrado=false;
                        if((intervalo1[i][1][1]==limderecho && intervalo1[i][1][0])||
                            intervalo1[j][1][1]==limderecho && intervalo1[j][1][0]){
                            cerrado=true;
                        }
                        console.log(intervalo1[i][0][1],intervalo1[i][1][1]);
                        console.log(intervalo1[j][0][1],intervalo1[j][1][1]);
                        console.log(limiz,limderecho);
                        console.log("nueva encontrada de"+intervalo1.length);
                        var valorizq=[];
                        valorizq.push(true);
                        valorizq.push(limiz);
                        var valorder=[];
                        valorder.push(cerrado);
                        valorder.push(limderecho);
                        valor.push(valorizq);
                        valor.push(valorder);
                        cambio=true;
                        break;
                    }
                }
            }
            if(cambio){
                break;
            }
        }

        if(cambio){
            var nuevoIntervalo=[];
            for(var k=0; k<intervalo1.length;k++){
                if(k!=i && k!=j){
                    nuevoIntervalo.push(intervalo1[k]);
                }
            }
            nuevoIntervalo.push(valor);
            return logicaOR(nuevoIntervalo, []);
        }
        return intervalo1;
    }



    function estaEnArray(valor, arrayContenido){
        for(var x in arrayContenido){
            if(arrayContenido[x]==valor){
                return true;
            }
        }
        return false;
    }
    function procesarSentencia(sentencia){
        var intervalo=[];
        var solucionIntervalos=[];
        var nombreVariable= sentencia[0];
        var index=0;
        for(var variable in diccionarioDatos){
            if(nombreVariable==diccionarioDatos[variable]["label"].toLowerCase()){

                for(var x in diccionarioDatos[variable]["diccionario"]) {
                    if(evaluador(diccionarioDatos[variable]["diccionario"][x][1],sentencia[2],sentencia[1])){
                        if(index==0){
                            var segmento=[];
                            segmento.push(true, diccionarioDatos[variable]["diccionario"][x][0]);
                            intervalo.push(segmento);
                            index++;
                        }

                    }
                    else{
                        if(index==1){
                            index=0;
                            var segmento=[];
                            segmento.push(false, diccionarioDatos[variable]["diccionario"][x][0])
                            intervalo.push(segmento);
                            solucionIntervalos.push(intervalo);
                            intervalo=[];
                        }
                    }

                }
                if(index==1){
                    index=0;
                    var segmento=[];
                    segmento.push(true, diccionarioDatos[variable]["diccionario"][x][0]);
                    intervalo.push(segmento);
                    solucionIntervalos.push(intervalo);
                    intervalo=[];
                }
                break;
            }

        }
        return solucionIntervalos;


    }
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
                return false;
            }

        }
        return true;
    }

    getSentencias(code);
    procesarCodigo();

    this.getIntervalos = function(){
        return intervalos;
    }
}