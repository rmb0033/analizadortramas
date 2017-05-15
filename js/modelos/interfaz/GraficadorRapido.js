/**
 * Created by alumno on 15/05/17.
 */
function GraficadoRapido(fileLoader, contenedorFich, contenedorVar) {
    var contenedorVariables=contenedorVar;
    var contenedorFicheros=contenedorFich;
    var ficheros = fileLoader.getCargadorTramas().getNombreFicheros();
    var variables = fileLoader.getBiblioteca().getClaves();

    $("#modalcabecera").html('<h4 class="modal-title">Chart Settings</h4>');
    $("#modalcuerpo").html('<div id="contenedorModal" class=container><div>');
    $("#contenedorModal").html('<div class="container" id="tipoGrafica"></div>' +
            '<div class="container" id="graficadoRapido"></div>');

    $("#tipoGrafica").html('<span>Chart Type </span><select id="tipografico" class="selectpicker">' +
        '<option>Temporal Chart</option>' +
        '<option>X Y Chart</option>' +
        '</select>');




    $('#tipografico').selectpicker('refresh');

    if($('#tipografico').val()=="Temporal Chart"){
        inyectarHTMLGRT();
    }
    else{
        inyectarHTMLGRXY();
    }

    $('#tipografico').change(function(){
        if($('#tipografico').val()=="Temporal Chart"){
            $("#graficadoRapido").html('');
            inyectarHTMLGRT();
        }
        else{
            $("#graficadoRapido").html('');
            inyectarHTMLGRXY();
        }
    });





    function inyectarHTMLGRT() {

        //Codigo HTML

        $("#graficadoRapido").html(
            '<div class="container" id="archivosFileloader"></div>' +
            '<div class="container" id="variablesFileloader"></div>');

        $("#archivosFileloader").html(
            '<span>Files </span>' +
            '<select id="archivos" class="selectpicker ventana-archivos" multiple>' +
            '</select>');
        $("#variablesFileloader").html(
            '<span>Variables </span>'+
            '<select id="variablesFileloaderL" class="selectpicker ventana-variables" multiple>'+
            '</select>');



        for (var nombreVariable in variables) {
            $('#variablesFileloaderL').append('<option id="'+ variables[nombreVariable]+'"val="'+ variables[nombreVariable]+'" >' + variables[nombreVariable] + '</option>');
        }

        for (var nombreFichero in ficheros) {
            $('#archivos').append('<option id="'+ ficheros[nombreFichero]+'">' + ficheros[nombreFichero] + '</option>');
        }



        $('#archivos').selectpicker('refresh');
        $('#variablesFileloaderL').selectpicker('refresh');

        $("#botondeguardar").html('<button type="button" id="guardar" class="btn btn-success">' +
            '<span class="glyphicon glyphicon-floppy-disk"> Save</span>' +
            '</button>');

        // ymin ymax
        $('#guardar').click(function(){
            // if($('#ymin').val().length==0 && )

            if($('#archivos').val().length>0 && $('#variablesFileloaderL').val().length){
                while(contenedorVariables.length>0){
                    contenedorVariables.shift();
                }
                while(contenedorFicheros.length>0){
                    contenedorFicheros.shift();
                }
                var contTempFich={};


                for(var x in $('#variablesFileloaderL').val()){
                    var variable=$('#variablesFileloaderL').val()[x];
                    var contTempVar={};
                    contTempVar["nombre"]=variable+ " FG";
                    contTempVar["variable"]=variable;
                    contTempVar["color"]="Random";
                    contTempVar["grosorlinea"]="small/normal";
                    contTempVar["grosorpunto"]="small/normal";
                    contTempVar["cronograma"]="False" ;
                    contTempVar["escalado"]=1;
                    contTempVar["desplazamiento"]=0;
                    contenedorVariables.push(contTempVar);
                }

                contTempFich["archivos"]=$('#archivos').val();
                contTempFich["tipoGrafica"]=$('#tipografico').val();
                contTempFich["tipoCuerda"]="Line";
                contTempFich["autoajuste"]="False";
                contTempFich["ymin"]='';
                contTempFich["ymax"]='';
                contenedorFicheros.push(contTempFich);
                alert("Saved data");
            }



        });


    }

    function inyectarHTMLGRXY(){
        $("#graficadoRapido").html(
            '<div class="container" id="archivosFileloader"></div>' +
            '<div class="container" id="variablesFileloaderC1"></div>'+
            '<div class="container" id="variablesFileloaderC2"></div>');

        $("#archivosFileloader").html(
            '<span>Files </span>' +
            '<select id="archivos" class="selectpicker ventana-archivos" multiple>' +
            '</select>');
        $("#variablesFileloaderC1").html(
            '<span>Variable X </span>'+
            '<select id="variablesFileloader1" class="selectpicker ventana-variables">'+
            '</select>');
        $("#variablesFileloaderC2").html(
            '<span>Variable Y </span>'+
            '<select id="variablesFileloader2" class="selectpicker ventana-variables">'+
            '</select>');


        for (var nombreVariable in variables) {
            $('#variablesFileloader1').append('<option id="'+ variables[nombreVariable]+'"val="'+ variables[nombreVariable]+'" >' + variables[nombreVariable] + '</option>');
            $('#variablesFileloader2').append('<option id="'+ variables[nombreVariable]+'"val="'+ variables[nombreVariable]+'" >' + variables[nombreVariable] + '</option>');
        }

        for (var nombreFichero in ficheros) {
            $('#archivos').append('<option id="'+ ficheros[nombreFichero]+'">' + ficheros[nombreFichero] + '</option>');
        }



        $('#archivos').selectpicker('refresh');
        $('#variablesFileloader1').selectpicker('refresh');
        $('#variablesFileloader2').selectpicker('refresh');

        $("#botondeguardar").html('<button type="button" id="guardar" class="btn btn-success">' +
            '<span class="glyphicon glyphicon-floppy-disk"> Save</span>' +
            '</button>');


        $('#guardar').click(function(){


            if($('#archivos').val().length>0 ){

                while(contenedorVariables.length>0){
                    contenedorVariables.shift();
                }
                while(contenedorFicheros.length>0){
                    contenedorFicheros.shift();
                }

                var contTempVar={};
                contTempVar["nombre"]=$("#variablesFileloader1").val()+ " / "+$("#variablesFileloader2").val() +" FG";
                contTempVar["variableX"]=$('#variablesFileloader1').val();
                contTempVar["variableY"]=$('#variablesFileloader2').val();
                contTempVar["color"]="Random";
                contTempVar["grosorlinea"]="small/normal";
                contTempVar["grosorpunto"]="small/normal";
                contenedorVariables.push(contTempVar);

                var contTempFich={};
                contTempFich["archivos"]=$('#archivos').val();
                contTempFich["tipoGrafica"]=$('#tipografico').val();
                contTempFich["tipoCuerda"]="Line";
                contTempFich["autoajuste"]="False";
                contTempFich["ymin"]='';
                contTempFich["ymax"]='';
                contenedorFicheros.push(contTempFich);
                alert("Saved data");
            }



        });


    }

}