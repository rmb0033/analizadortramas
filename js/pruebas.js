
    // public HashMap<String, Variable> variables;     // variables en un mapa con key nombre de la variable y tipoespecial como value
    //
    //
    // public Variable {
    //     public String tipoValor;
    //     public HashMap<Date, Valor> valores;
    // }
    //
    // public Valor {
    //     public int cantidad;
    //     public Date fecha;
    //     public Strinc fichero;
    //     // public boolean activa; METADATOS
    // }
    // console.log(biblioteca.getClaves());
    //Debuger diccionario
    // for(variable in biblioteca.getVariables()){
    //     var v= biblioteca.getVariables()[variable];
    //     console.log("Nombre : "+v.getNombre()+" | Tipo: "+v.getTipo());
    //     // console.log(v.getValores().length);
    //     for(valor in v.getValores()){
    //         val= v.getValores()[valor];
    //         console.log("Fecha : "+val.getFecha()+" Fichero:  "+ val.getFichero()+"  Valor:  "+ val.getValor())
    //     }
    // }

    // var biblioteca = {
    //     "voltaje": {
    //         tipoValor: "INT32",
    //         valores: { // ESTO NO PUEDE SER UN HASHMAP DEBE SER UN ARRAY
    //             1455549588: {
    //                 fecha: 1455549588,
    //                 valor: 3063,
    //                 fichero: "0001"
    //             },
    //             1455549589: {
    //                 fecha: 1455549588,
    //                 valor: 453,
    //                 fichero: "0001"
    //             },
    //             1455549580: {
    //                 fecha: 1455549588,
    //                 valor: 2,
    //                 fichero: "0002"
    //             },
    //         }
    //
    //     },
    //     "encendido": {
    //         tipoValor: "BOOL",
    //         valores: {
    //             1455549588: {
    //                 fecha: 1455549588,
    //                 valor: true,
    //                 fichero: "0001"
    //             },
    //             1455549589: {
    //                 fecha: 1455549588,
    //                 valor: false,
    //                 fichero: "0001"
    //             }
    //         }
    //
    //     }
    // }

    // GRAFICA -> VOLTAJE -> 0001
    // var voltajes = {};
    // for (valor in variables["voltaje"].valores) {
    //     if (valor.fichero == "0001") {
    //         voltajes["valor.fecha"] = valor;
    //     }
    // }
    // DIBUJAR GRAFICA

    // 1455549588: {
    //     fecha: 1455549588,
    //         tipoValor: "INT32",
    //         valor: 56
    // },
    // 1455549432: {
    //     fecha: 1455549432,
    //         tipoValor: "INT32",
    //         valor: 12
    // },
    // 1455549543: {
    //     fecha: 1455549543,
    //         tipoValor: "INT32",
    //         valor: 455
    // }











    // JAVA
    // public class Vector2() {
    //     public float x;
    //     public float y;
    // }
    //
    // JAVASCRIPT
    // var vector2 = {
    //     "x": 0,
    //     "y": 0
    // }

// var parser = new DOMParser()
//
// var mapas = {
//     nombre: "juan",             // PROPERTIES
//     apellidos: "albarracin",
//     series: [
//         "narcos", "dexter"      // ARRAY
//     ],
//     amigos: {                   // HASHMAP (Diccionario)
//         "pepe": true,
//         manolo: false,
//         antonio: "no procede",
//         andres: 123
//     }
// }

// var parser = new DOMParser()
//
// var mapas = {
//     nombre: "juan",             // PROPERTIES
//     apellidos: "albarracin",
//     series: [
//         "narcos", "dexter"      // ARRAY
//     ],
//     amigos: {                   // HASHMAP (Diccionario)
//         "pepe": true,
//         manolo: false,
//         antonio: "no procede",
//         andres: 123
//     }
// }

//  ESTO ES EN ESENCIA JQUERY
// $(function() {
    // $("#consola, #idprueba").html("Resultado " + mapas.series[1])
    // $(".hoverable").html("Resultado " + mapas.series[0])
    // $("#idprueba").html("Resultado " + mapas.amigos["andres"])
// });

    // for(x in xml.getElementsByTagName("trama").item.length){
    // }
    //Aceso a atributos
    // x = xmlDoc.getElementsByTagName('book')[0].attributes;
    // //acceso a hijos
    // txt = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;

    // Herramientas. No pueden ir instanciadas dentro de la clase como métodos.
    // SINGLETON

    // var ConfTools = (function () {
    //     var instance;
    //
    //     function createInstance() {
    //         var object = new Object("I am the instance");
    //         return object;
    //     }
    //
    //     return {
    //         getInstance: function () {
    //             if (!instance) {
    //                 instance = createInstance();
    //             }
    //             return instance;
    //         }
    //     };
    //
    //
    //
    //
    //
    // })();





    // <!--<h1 id="idprueba">hola mundo2</h1>-->
    // <!--<h1 class="hoverable">Hoverable</h1>-->
    //     <!--<h1 class="clickable">Clickable 2</h1>-->
    // <!--<h3>Consola:</h3>-->
    // <!--<h2 id="consola"></h2>-->