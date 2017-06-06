/**
 * Created by Rodrigo Martinez
 */


/**
 * Clase en la que se define la interfaz gráfica de importar junto a su funcionamiento
 * @param fileLoader
 * @param contenedorGraf
 * @param contenedorVar
 * @constructor
 */
function Importar(fileLoader, contenedorGraf, contenedorVar){
    var archivo;
    var ficheros = fileLoader.getCargadorTramas().getNombreFicheros();
    var variables= fileLoader.getBiblioteca().getClaves();
    var contenedorVariables=contenedorVar;
    var contenedorFicheros=contenedorGraf;


    $("#modalcabecera").html('<h4 class="modal-title">Import JSON</h4>');

    $("#modalcuerpo").html('<div id="contenedorModal" class=container><div>');

    $("#contenedorModal").html('<div class="container" id="archivosFileloader"></div>'+
        '<div class="container"><input id="cargarJson" ' +
        'type="file" class="filestyle" data-icon="false">');

    $("#archivosFileloader").html(
        '<span>Files </span>' +
        '<select id="archivos" class="selectpicker ventana-archivos" multiple>' +
        '</select>');

    $("#botondeguardar").html('<button type="button" id="guardar" class="btn btn-success">' +
        '<span class="glyphicon glyphicon-floppy-disk"> Import</span>' +
        '</button>');


        for (var nombreFichero in ficheros) {
        $('#archivos').append('<option id="'+ ficheros[nombreFichero]+'">' + ficheros[nombreFichero] + '</option>');
        }


        $('#archivos').selectpicker('refresh');



    $('#guardar').click(function(){
        importar();
    });

    $("#cargarJson").change(function() {
        var file = $("#cargarJson").prop('files')[0];
        if(file){
            cargarJSON(file);
        }
    });
    /**
     * Función en la que importamos el JSON
     */
    function importar(){
        if(comprobarVariables() && $('#archivos').val().length>0){
            while(contenedorVariables.length>0){
                contenedorVariables.shift();
            }
            while(contenedorFicheros.length>0){
                contenedorFicheros.shift();
            }
            //TODO nos pueden dar variables incorrectas
            for(var x in archivo[0]){
                contenedorVariables.push(archivo[0][x]);
            }
            var contTemp={};
            for(var y in archivo[1][0]){
                if(y=="archivos"){
                    contTemp["archivos"]=$('#archivos').val();
                }else{
                    contTemp[y]=archivo[1][0][y];
                }
            }
            contenedorFicheros.push(contTemp);
            alert("Saved data");
        }else{
            alert("No compatible file");
        }
    }

    /**
     * Función en la que cargamos el JSON
     * @param file
     */
    function cargarJSON(file){
        fr = new FileReader();
        fr.readAsText(file);
        fr.onload = textoaJson;

    };
    /**
     * Convierte un objeto tipo texto a uno json
     */
    function textoaJson() {
        archivo= JSON.parse(fr.result);
    }

    /**
     * Comprobamos si están las variables en el array
     * @returns {boolean}
     */
    function comprobarVariables(){
        for(var x in archivo[0]){
            if($.inArray(archivo[0][x]["variable"],variables)>-1) {
            }else{
                alert(archivo[0][x]["variable"] + " not found.");
                return false;
            }
        }
        if(archivo[0].length==0){
            return false;
        }
        return true;
    }

}