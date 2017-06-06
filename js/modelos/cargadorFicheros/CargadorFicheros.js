/**
 * Created by Rodrigo Martinez
 */

/**
 * Clase en la que se cargar los ficheros.
 * @param ficheros
 * @constructor
 */
function CargadorFicheros(ficheros) {
    var tramaLoader= new CargadorTramas(ficheros);
    var xmlLoader = new CargadorXML();
    var biblioteca;

    /**
     * Funcion que nos da la biblioteca
     * @returns {*}
     */
    this.getBiblioteca=function(){
        return biblioteca;
    };
    /**
     * Función que nos devuelve las tramas
     * @returns {CargadorTramas}
     */
    this.getCargadorTramas=function(){
        return tramaLoader;
    };
    /**
     * Función que cargamos el XML
     * @returns {CargadorXML}
     */
    this.getCargadorXML=function(){
        return xmlLoader;
    };
    /**
     * Función por la cual calculamos el objeto configuración, y después la biblioteca
     */
    this.actualizarBiblioteca=function(){
        var conf=new Configuracion(xmlLoader.getXML());
        biblioteca= new Biblioteca(conf, tramaLoader.getTramas())
    };
}



