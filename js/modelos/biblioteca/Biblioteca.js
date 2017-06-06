/**
 * Created by Rodrigo Martinez
 * Clase en la que que se define la biblioteca.
 */

/**
 * Clase en la que que se define la biblioteca.
 * @param configuracion
 * @param archivosTramas
 * @constructor
 */
function Biblioteca (configuracion, archivosTramas) {
    //Tenemos que hacer un getTramas una vez que recibamos el objeto de las tramas

    var variables = cargarBiblioteca(configuracion, archivosTramas); //dicionario de variables. Cada variable contiene un array de valores.
    //Necesario debido a un bug de las tramas por el cual, a veces el reloj del dataloger no funcionaba correctaente
    var fechaAnteriorTrama= null;
    /**
     * Función que devuelve variables en forma de objeto (diccionario)
     */
    this.getVariables = function() {
        return variables;
    };


    /**
     *Función que devuelve las variables en forma de lista
     * @returns {Array}
     */
    this.getClaves = function() {
        return Object.keys(this.getVariables());
    };




    /**
     * Funcion que recibe un diccionario con tramas, obtiene la trama correspondiente y manda procesarla
     * @param configuracion
     * @param archivosTramas
     * @returns {{}}
     */
    function cargarBiblioteca(configuracion, archivosTramas) {
        var biblioteca = {};
        //TODO test tiempo
        // var start = new Date().getTime();
        for (var key in archivosTramas) { //Recorre los archivos
            var configuracionTramas=configuracion.getConfiguracionXML();
            // Creamos una variable donde almacenaremos la ultima trama, y comprobaremos la fecha y el valor
            // debido un bug de los datos
            fechaAnteriorTrama= null;
            for (var numTrama in archivosTramas[key]) { //Recorre las lineas de trama
                var trama = archivosTramas[key][numTrama];
                var nombreTrama = obtenerIDcontenedor(trama); //obtiene el id del contenedor
                //si es asi tenemos que añadir la supuesta configuración de ese tipo aqui
                if (nombreTrama in configuracionTramas) { //comprueba si el contenedor está especificado en el xml
                    var configuracionTrama = configuracionTramas[nombreTrama];
                    //tenemos que comprobar si la fecha es correcta, para ello a la funcion le pasaremos la fecha
                    //de la ultima trama
                    biblioteca = procesamientoTramas(key, trama, configuracionTrama, biblioteca);
                }

            }
        }
        return biblioteca;
    }





    /**
     * Función por la cual obtenemos el id del contenedor
     * @param trama
     * @returns {Array}
     */
    function obtenerIDcontenedor(trama){
        //TODO más elegante la solucion
        var contenedor = [];
        var sizeTrama = trama.length;
        for(var i=0;i<sizeTrama;i++){
            if(trama[i]=="#"){
                founded=true;
                contenedor[0]=trama[i-3];
                contenedor[1]=trama[i-2];
                contenedor[2]=trama[i-1];

            }
        }
        contenedor=contenedor.join('');
        return contenedor;
    }





    /**
     * Función por que procesamos las ramas y las añadimos a la biblioteca
     * @param key
     * @param trama
     * @param configuracionTrama
     * @param bibliotecaOld
     * @returns {*}
     */
    function procesamientoTramas(key, trama, configuracionTrama,bibliotecaOld){
        var bibliotecaActualizada=bibliotecaOld;
        var configuracionVariables = configuracionTrama.getVariables();
        for(var nombreVariable in configuracionVariables){ //O(n)
            // Deberiamos comprobar si existe la variable. Si existe entrariamos a ella
            //ConfiguracionVariable es el id de cada variable

            if(nombreVariable in bibliotecaActualizada){
                var variable=bibliotecaActualizada[nombreVariable];
            }else{
                var variable= new Variable(nombreVariable, configuracionVariables[nombreVariable].getTipo());
            }
            variable.setValores(obtenerValor(key,trama, configuracionVariables[nombreVariable])); // O(n^2)
            bibliotecaActualizada[nombreVariable]=variable;


        }
        return bibliotecaActualizada;
    }





    /**
     * Función por que obtenemos valor por cada trama
     * @param key
     * @param trama
     * @param cnfgVariable
     * @returns {Valor}
     */
    function obtenerValor(key, trama,cnfgVariable){
        var fecha=sacarFecha(trama);
        if(fechaAnteriorTrama!= null){
            if(fechaAnteriorTrama>fecha){
                fecha= repararErrorFecha(fecha );
                valor = new Valor(fecha, key, valorDato);
                if(fecha==null){
                    return null;
                }
            }
        }
        var valorDato=mascaraHexBin(sacarValores(trama),cnfgVariable.getByteEntrada(),
            cnfgVariable.getByteSalida(),cnfgVariable.getTipo()); //O(n^2)
        var valor = new Valor(fecha, key, valorDato);
        fechaAnteriorTrama=fecha;
        return valor;
    }


    /**
     * Función donde que reparamos la fecha
     * @param fecha
     * @returns {*}
     */
    function repararErrorFecha(fecha){
        // 10:09:50:59:979244 > : 23:23:59:59:005158
        var digito1Segundos=10;
        var digito2Segundos=9;
        var digito1Minutos=7;
        var digito2Minutos=6;
        var digito2Hora=3;
        var digito1Hora=4;
        fecha=fecha.split("");
        for(var digito=digito1Segundos; digito>=0;digito--){
            if(digito==digito1Segundos || digito==digito1Minutos || digito==digito1Hora){
                if(fecha[digito]=="9"){
                    fecha[digito]="0";
                }
                else{
                    fecha[digito]=parseInt(fecha[digito]+1).toString();
                    break;
                }
            }
             if(digito==digito2Segundos ||digito==digito2Minutos ){
                if(fecha[digito]=="5"){
                    fecha[digito]="0";
                }
                else{
                    fecha[digito]=parseInt(fecha[digito]+1).toString();
                    break;
                }
            }
            if(digito==digito2Hora){
                if(fecha[digito]=="2"){
                    //ignoramos el dato si justo cambia de día
                    return null;
                }
                else{
                    fecha[digito]=parseInt(fecha[digito]+1).toString();
                    // console.log("salimos en hora"+digito);
                    break;
                }

            }
        }
        fecha=fecha.join('');
        return fecha;
    }



    /**
     * Función que recibe una trama y te devuelve la fecha con formato DIA:HORAS:MINUTOS:SEGUNDOS:MILISEGUNDOS
     * @param tram
     * @returns {*}
     */
    function sacarFecha(tram){
        var sizeTrama= tram.length;
        var espacios=2;
        var fecha = [];
        var i = 0;
        while(espacios>0 && i<sizeTrama){
            if(tram[i]==" "){
                espacios--;
                if(espacios>0){
                    fecha[i]=':';
                }
            }else {
                fecha[i]=tram[i];
                fecha.join(tram[i]);
            }
            i++;
        }
        fecha=fecha.join('');
        //procesamiento
        if(fecha.length>0){
            return fecha;
        }
        else{
            return null;
        }
    }






    /**
     * Función que saca los valores de una trama
     * @param tram
     * @returns {*}
     */
    function sacarValores(tram) {
        var datos = [];
        var j=0;
        var founded = false;
        var sizeTrama = tram.length;
        for(var i=0;i<sizeTrama;i++){
            if(founded && ((tram[i]>='A' && tram[i]<='F') || ((tram[i]>='0' && tram[i]<='9')))){
                datos[j]=tram[i];
                j++;
            }else{
                if(tram[i]=="#"){
                    founded=true;
                }
            }
        }
        datos=datos.join('');
        if(datos.length==16){
            return datos;
        }
        else{
            console.log("Error");
            return null;
        }
        // console.log(datos);
    }






    /**
     * Función que obtenemos el binario de ascii
     * @param valorASCI
     * @returns {Array}
     */
    function obtenerBinariodeASCI(valorASCI){
        var binario= parseInt(valorASCI, 16).toString(2);
        var ceros=valorASCI.toString().length * 4 - binario.length;
        var solucionBinario=[];
        if(ceros>0){
            for(var i=0; i<ceros; i++){
                solucionBinario[i]=0;
            }
            solucionBinario=solucionBinario.concat(binario);
            solucionBinario=solucionBinario.join('');
            solucionBinario=solucionBinario.toString();
        }
        else{
            solucionBinario=binario;
        }

        return solucionBinario;

    }





    /**
     * Función donde calculamos el valor booleano de una función
     * @param dat
     * @param inicio
     * @param final
     * @returns {Array}
     */
    function calcularValorBoolean(dat, inicio, final){
        dat = parseInt(dat, 16);
        dat= dat.toString(2);
        var solucion=[];
        var contador=inicio;
        while(contador<=final) {
            solucion[contador]=dat[contador];
            contador++;
        }
        //Pasamos la solucion a decimal
        solucion=solucion.join('');
        solucion=parseInt(solucion, 2);
        return solucion;
    }



    /**
     * Función donde calculamos el valor con signo
     * @param valorASCI
     * @returns {Number}
     */
    function calcularValorSigned(valorASCI){
        var solucion= parseInt(valorASCI, 16);
        var solucionBinario= obtenerBinariodeASCI(valorASCI);
        if(solucionBinario[0]=="1"){
            var sacarComplemento2=[];

            for(var i in solucionBinario){
                if(solucionBinario[i]=="1"){
                    sacarComplemento2.push("0");

                }
                else{
                    sacarComplemento2.push("1");
                }
            }
            solucionBinario =sacarComplemento2.join('');
            solucion=-parseInt(solucionBinario,2) - 1;
        }

        return solucion;
    }






    /**
     * Función que transforma de BigEndian a LittleEndian
     * @param inicio
     * @param final
     * @param dat
     * @returns {Array}
     */
    function obtenerASCILittleEndian(inicio, final, dat){
        var byteInicioASCI= Math.floor(inicio/4);
        var byteFinalASCI= Math.floor(final/4);
        var valorASCI=[];
        //Añadimos cada byte de atras hacia delante (en hexadecimal 2 datos es un byte).
        for (var index=byteFinalASCI; index>=byteInicioASCI;index=index-2){
            valorASCI.push(dat[index-1]);
            valorASCI.push(dat[index]);
        }
        valorASCI=valorASCI.join('');
        return valorASCI;
    }




    /**
     *Función que calcula el valor unsigned
     * @param valorASCI
     * @returns {Number}
     */
    function calcularValorUnSigned(valorASCI){
        if(parseInt(valorASCI, 16) >60000){
            // console.log(valorASCI);
        }
        return parseInt(valorASCI, 16);
    }


    /**
     *  Función que aplica una mascara de hexadecimal a binario.
     * @param dat
     * @param inicio
     * @param final
     * @param tipo
     * @returns {*}
     */
    function mascaraHexBin(dat, inicio, final, tipo){
        var inicio= parseInt(inicio);
        var final=parseInt(final);
        if(inicio>final){
            console.error("Máscara mal aplicada");
            return null
        }
        //TODO encapsular en función
        if(tipo!="boolean"){
            var valorASCI=obtenerASCILittleEndian(inicio, final, dat); //O(N)
            var solucion = calcularValorUnSigned(valorASCI);
            if(tipo=="int8" || tipo=="int16" || tipo=="int32" || tipo=="int64"){
                solucion=calcularValorSigned(valorASCI); //O(N)

            }
        }
        else{
            var solucion=calcularValorBoolean(dat, inicio, final);
        }
        return solucion;

    }


}