/**
 * Created by alumno on 12/03/17.
 */

function CargadorFicheros(ficheros) {
    var tramaLoader= new CargadorTramas(ficheros);
    var xmlLoader = new CargadorXML();
    var biblioteca;


    this.getBiblioteca=function(){
        return biblioteca;
    };

    this.getCargadorTramas=function(){
        return tramaLoader;
    };
    this.getCargadorXML=function(){
        return xmlLoader;
    };

    this.actualizarBiblioteca=function(){
        var conf=new Configuracion(xmlLoader.getXML());
        // console.log("LLamado constructor");
        biblioteca= new Biblioteca(conf, tramaLoader.getTramas())
    };
}



