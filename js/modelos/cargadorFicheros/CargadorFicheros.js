/**
 * Created by alumno on 12/03/17.
 */

function CargadorFicheros() {

    var tramaLoader= new CargadorTramas();
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
        biblioteca= new Biblioteca(conf, tramaLoader.getTramas())
    };
}




