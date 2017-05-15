
function InterfazGrafica(fileLoader, contenedor, contenedorVariables) {

    var contenedorFicheros=contenedor;
    var ficheros = fileLoader.getCargadorTramas().getNombreFicheros();

    inyectarHTMLGrafica();


    function inyectarHTMLGrafica() {

        //Codigo HTML
        $("#modalcabecera").html('<h4 class="modal-title">Fast Graph</h4>');
        $("#modalcuerpo").html('<div id="contenedorModal" class=container><div>');

        $("#contenedorModal").html(
            '<div class="container" id="archivosFileloader"></div>' +
            '<div class="container" id="tipoGrafica"></div>' +
            '<div class="container" id="modoCuerda"></div>' +
            '<div class="container" id="autoescala"></div>'+
            '<div class="container"><input id="ymin" type="text" class="col-xs-5" placeholder="Axis Y (MAX)"></div>'+
            '<div class="container"><input id="ymax" type="text" class="col-xs-5" placeholder="Axis Y (MIN)"></div>');


        $("#archivosFileloader").html(
            '<span>Files </span>' +
            '<select id="archivos" class="selectpicker ventana-archivos" multiple>' +
            '</select>');

        $("#botondeguardar").html('<button type="button" id="guardar" class="btn btn-success">' +
            '<span class="glyphicon glyphicon-floppy-disk"> Save</span>' +
            '</button>');


        $("#tipoGrafica").html('<span>Chart Type </span><select id="tipografico" class="selectpicker">' +
            '<option>Temporal Chart</option>' +
            '<option>X Y Chart</option>' +
            '</select>');
        $("#modoCuerda").html(' <span>Line Type </span><select id="tipolinea" class="selectpicker">' +
            '<option>Line</option>' +
            '<option>Distended line</option>' +
            '</select>');

        $("#autoescala").html(' <span>Auto-axes adjustment</span><select id="autoesc" class="selectpicker">' +
            '<option>True</option>' +
            '<option>False</option>' +
            '</select>');





        for (var nombreFichero in ficheros) {
            $('#archivos').append('<option id="'+ ficheros[nombreFichero]+'">' + ficheros[nombreFichero] + '</option>');
        }
        // ymin ymax
        $('#guardar').click(function(){
            // if($('#ymin').val().length==0 && )
            if(($("#ymin").val().length==0 || getNumero($("#ymin").val())!=null)
                && ($("#ymax").val().length==0 || getNumero($("#ymax").val())!=null) &&
                $('#archivos').val().length>0){
                var nuevaVar={};
                nuevaVar["archivos"]=$('#archivos').val();
                nuevaVar["tipoGrafica"]=$('#tipografico').val();
                nuevaVar["tipoCuerda"]=$('#tipolinea').val();
                nuevaVar["autoajuste"]=$('#autoesc').val();
                nuevaVar["ymin"]=$('#ymin').val();
                nuevaVar["ymax"]=$('#ymax').val();
                contenedorFicheros.shift();
                contenedorFicheros.push(nuevaVar);
                if(contenedorVariables.length>0){
                    var cambio=false;
                    for(var x in contenedorVariables){
                        var dimension=0;
                        for (var y in contenedorVariables[x]){
                            dimension++;
                        }
                        if((dimension>6 && $('#tipografico').val()=="X Y Chart") || (
                            dimension<8 && $('#tipografico').val()=="Temporal Chart")){
                            cambio=true;
                            break;
                        }
                    }
                    if(cambio){
                        for(var x=0; x<contenedorVariables.length;x++){
                            contenedorVariables.shift();
                        }
                    }
                }
                alert("Saved data");
            }


        });
        if(contenedorFicheros.length>0){
            for(var x in contenedorFicheros){

                $('#archivos').val(contenedorFicheros[x]["archivos"]);
                $('#tipografico').val(contenedorFicheros[x]["tipoGrafica"]);
                $('#tipolinea').val(contenedorFicheros[x]["tipoCuerda"]);
                $('#autoesc').val(contenedorFicheros[x]["autoajuste"]);
                $('#ymin').val(contenedorFicheros[x]["ymin"]);
                $('#ymax').val(contenedorFicheros[x]["ymax"]);
                $('#archivos').selectpicker('refresh');
                $('#tipografico').selectpicker('refresh');
                $('#tipolinea').selectpicker('refresh');
                $('#autoesc').selectpicker('refresh');

            }
        }

        $('#archivos').selectpicker('refresh');
        $('#tipografico').selectpicker('refresh');
        $('#tipolinea').selectpicker('refresh');
        $('#autoesc').selectpicker('refresh');


    }
    function getNumero(cadena){
        var cadenaTexto=cadena;
        var numero=[];
        var encontrado=false;
        var negativo=false;
        var contador=0;
        while(!encontrado){
            if(esNumero((cadenaTexto[contador]))){
                encontrado=true;
            }else{
                if(cadenaTexto[contador]=="-"){
                    encontrado=true;
                    negativo=true;
                }
                contador++;
                if(contador>cadenaTexto.length){
                    return null;
                }
            }
        }
        while(esNumero(cadenaTexto[contador])){
            numero.push(cadenaTexto[contador]);
            contador++;
            if(contador>cadenaTexto.length){
                return null;
            }
        }
        if(negativo){
            return 0-parseInt(numero.join(''));
        }else{
            return parseInt(numero.join(''));
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

}