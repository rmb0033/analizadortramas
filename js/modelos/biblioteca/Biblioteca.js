/**
 *
 * @param configuracion
 * @param archivosTramas
 * @constructor
 */
function Biblioteca (configuracion, archivosTramas) {
    //Tenemos que hacer un getTramas una vez que recibamos el objeto de las tramas

    var variables = cargarBiblioteca(configuracion, archivosTramas); //dicionario de variables. Cada variable contiene un array de valores.


    this.getVariables = function() {
        return variables;
    };

    this.getClaves = function() {
        return Object.keys(this.getVariables());
    };

    /**
     *
     * @param configuracion
     * @param archivosTramas
     * @returns {{}}
     */
    function cargarBiblioteca(configuracion, archivosTramas) {
        var biblioteca = {};
        //sacamos el nombre de la trama
        for (var key in archivosTramas) {
            var configuracionTramas=configuracion.getConfiguracionXML();
            //esto nos va a volver un diccionaro con nombreTrama = TramaXML;
            //tramaXML tiene una variableXML
            for (var nombreTrama in configuracionTramas) {
                //accedemos a la trama que queremos trabajar
                if(parseInt(nombreTrama)<archivosTramas[key].length){
                    var trama = archivosTramas[key][parseInt(nombreTrama)];
                    //nos devuelve un diccionario de configuración de variables de cada trama
                    var configuracionTrama = configuracionTramas[nombreTrama];
                    //Accedemos a la configuración de cada trama y la procesamos
                    biblioteca=procesamientoTramas(key,trama,configuracionTrama, biblioteca);
                }
            }
        }
        return biblioteca;
    }

    /**
     *
     * @param key
     * @param trama
     * @param configuracionTrama
     * @param bibliotecaOld
     * @returns {*}
     */
    function procesamientoTramas(key, trama, configuracionTrama,bibliotecaOld){
        var bibliotecaActualizada=bibliotecaOld;
        var configuracionVariables = configuracionTrama.getVariables();
        for(var nombreVariable in configuracionVariables){
            // Deberiamos comprobar si existe la variable. Si existe entrariamos a ella
            //ConfiguracionVariable es el id de cada variable

            if(nombreVariable in bibliotecaActualizada){
                var variable=bibliotecaActualizada[nombreVariable];
                variable.setValores(obtenerValor(key,trama, configuracionVariables[nombreVariable]));
                bibliotecaActualizada[nombreVariable]=variable;
            }else{
                var variable= new Variable(nombreVariable, configuracionVariables[nombreVariable].getTipo());
                variable.setValores(obtenerValor(key,trama, configuracionVariables[nombreVariable]));
                bibliotecaActualizada[nombreVariable]=variable;
            }

        }
        return bibliotecaActualizada;
    }

    /**
     *
     * @param key
     * @param trama
     * @param cnfgVariable
     * @returns {Valor}
     */
    function obtenerValor(key, trama,cnfgVariable){
        var fecha=sacarFecha(trama);
        var valorDato=mascaraHexBin(sacarValores(trama),cnfgVariable.getByteEntrada(), cnfgVariable.getByteSalida());
        var valor = new Valor(fecha, key, valorDato);
        return valor;
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
            //TODO mirar como se hacen tratamiento de errores en javascript
            console.log("Error");
            return null;
        }
    }
    /**
     * Funcion que saca de una trama el contenido en HEX
     * @param tram
     * @returns {*}
     */
    function sacarValores(tram) {
        var datos = [];
        var j=0;
        var founded = false;
        var sizeTrama = tram.length;
        for(var i=0;i<sizeTrama;i++){
            if(founded){
                datos[j]=tram[i];
                j++;
            }else{
                if(tram[i]=="#"){
                    founded=true;
                }
            }
        }
        datos=datos.join('');

        if(datos.length>0){
            return datos;
        }
        else{
            //TODO mirar como se hacen tratamiento de errores en javascript
            console.log("Error");
            return null;
        }

    }

    /**
     * Funcion que te saca los bits de HEXADECIMAL, y los traduce a decimal.
     * @param dat
     * @param inicio
     * @param final
     * @returns {*}
     */
    //Recibimos el dato en hex, lo tratamos y devolvemos en decimal
    function mascaraHexBin(dat, inicio, final){
        if(inicio>final){
            console.error("Máscara mal aplicada");
            return null
        }

        // console.log("Llega");
        dat = parseInt(dat, 16);
        dat= dat.toString(2);
        // console.log("inicio ",inicio );
        // console.log("final " , final);
        // console.log("En binario todo :"+ dat);
        var solucion=[]
        var contador=inicio;
        while(contador<=final) {
            solucion[contador]=dat[contador];
            contador++;
        }
        //Pasamos la solucion a decimal
        solucion=solucion.join('');
        // console.log("Datos obtenidos en binario :"+ solucion);
        solucion=parseInt(solucion, 2);
        // console.log("sol"+ solucion);
        return solucion;

    }


}