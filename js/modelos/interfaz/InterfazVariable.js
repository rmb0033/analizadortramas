/**
 * Created by alumno on 13/05/17.
 */
function InterfazVariable(fileloader, contenedorGrafica, contenedorVar){
    var variables = fileloader.getBiblioteca().getClaves();
    var contenedorVariables=contenedorVar;

    for(var x in contenedorGrafica){
        if((contenedorGrafica[x]["tipoGrafica"])=="Temporal Chart"){
            insertarHTMLTemporal();
        }
        else if((contenedorGrafica[x]["tipoGrafica"])=="X Y Chart"){
            insertarHTMLXY();
        }
    }

    function insertarHTMLTemporal(){

        //Codigo HTML

        $("#modalcabecera").html('');
        $("#modalcuerpo").html('');
        $("#botondeguardar").html('');
        $("#modalcabecera").html('<h4 class="modal-title">Variable Settings</h4>');
        $("#modalcuerpo").html('<div id="contenedorModal" class=container><div>');

        $("#contenedorModal").html('<div id="contenedorVariables" > </div>'+
            '<div class="container" id="variablesFileloader"></div>'+
            '<div class="container" id="color"></div>'+
            '<div class="container" id="grosorlinea"></div>'+
            '<div class="container" id="grosorpunto"></div>'+
            '<div class="container" id="cronograma"></div>'+
            '<div class="container"><input id="campotextovar" type="text" class="col-xs-5" placeholder="Insert a new name"></div>'+
            '<div class="container"><input id="textodesp" type="text" class="col-xs-5" placeholder="Displacement"></div>'+
            '<div class="container"><input id="textoesc" type="text" class="col-xs-5" placeholder="Scale"></div>');


        $("#variablesFileloader").html(
            '<span>Variable </span>'+
            '<select id="variablesFileloaderL" class="selectpicker ventana-variables">'+
            '</select>');

        $("#color").html('<span>Color </span><select id="selector-color" class="selectpicker">'+
            '<option>Random</option>'+
            '<option>Black</option>'+
            '<option>Red</option>'+
            '<option>Blue</option>'+
            '<option>Orange</option>'+
            '<option>Pink</option>'+
            '<option>Purple</option>'+
            '<option>Brown</option>'+
            '<option>Yellow</option>'+
            '</select>');
        $("#grosorlinea").html(' <span>Line Size </span><select id="selector-grosorlinea" class="selectpicker">'+
            '<option>small/normal</option>'+
            '<option>extra small</option>'+
            '<option>small</option>'+
            '<option>normal</option>'+
            '<option>large</option>'+
            '<option>extra large</option>'+
            '</select>');
        $("#grosorpunto").html(' <span>Point Size </span><select id="selector-grosorpunto" class="selectpicker">'+
            '<option>small/normal</option>'+
            '<option>extra small</option>'+
            '<option>small</option>'+
            '<option>normal</option>'+
            '<option>large</option>'+
            '<option>extra large</option>'+
            '</select>');
        $("#cronograma").html(' <span>Stepped line </span><select id="selector-cronograma" class="selectpicker">'+
            '<option>False</option>'+
            '<option>True</option>'+
            '</select>');




        $("#contenedorVariables").html('<select id="variablesLeidas" class="selectpicker ventana-variables" single>'+
            '</select>'+
            '<button type="button" id="nuevavar" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-file"> New</span>'+
            '</button>'+
            '<button type="button" id="modificar" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-edit"> Modify</span>'+
            '</button>'+
            '<button type="button" id="borrar" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-trash"> Delete</span>'+
            '</button>');

        //Rellenamos los selectpicker dinámicos
        for (var nombreVariable in variables) {
            $('#variablesFileloaderL').append('<option id="'+ variables[nombreVariable]+'"val="'+ variables[nombreVariable]+'" >' + variables[nombreVariable] + '</option>');
        }

        for (var nombreVariable in contenedorVariables) {
            $('#variablesLeidas').append('<option id="'+ contenedorVariables[nombreVariable]["nombre"]+'"val="'+
                contenedorVariables[nombreVariable]["nombre"]+'" >'
                + contenedorVariables[nombreVariable]["nombre"] + '</option>');
        }
        //Actualizamos los select picker

        $('#variablesLeidas').selectpicker('refresh');
        $('#variablesFileloaderL').selectpicker('refresh');
        $('#selector-color').selectpicker('refresh');
        $('#selector-grosorlinea').selectpicker('refresh');
        $('#selector-grosorpunto').selectpicker('refresh');
        $('#selector-cronograma').selectpicker('refresh');


        //Comportamiento cuando detecten cambio

        $('#variablesLeidas').change(function(){
            actualizarDatosInterfazTemporal();
        });





        //Comportamiento botones
        $("#borrar").click(function(){
            for(var x in contenedorVariables){
                if(contenedorVariables[x]["nombre"]==$('#variablesLeidas').val()) {
                    if (x > -1) {
                        contenedorVariables.splice(x, 1);
                    }
                    actualizarVarInterfaz();
                    actualizarDatosInterfazTemporal();
                }
            }
        });


        $("#modificar").click(function(){
            for(var x in contenedorVariables){
                if(contenedorVariables[x]["nombre"]==$('#variablesLeidas').val()){
                    if(activarGuardar()){
                        contenedorVariables[x]["nombre"]=$("#campotextovar").val();
                        contenedorVariables[x]["variable"]=$('#variablesFileloaderL').val();
                        contenedorVariables[x]["color"]=$('#selector-color').val();
                        contenedorVariables[x]["grosorlinea"]=$('#selector-grosorlinea').val();
                        contenedorVariables[x]["grosorpunto"]=$('#selector-grosorpunto').val();
                        contenedorVariables[x]["cronograma"]=$('#selector-cronograma').val();
                        if($("#textodesp").val().length>0){
                            contenedorVariables[x]["desplazamiento"]=getNumero($("#textodesp").val());
                        }else{
                            contenedorVariables[x]["desplazamiento"]=0;
                        }
                        if($("#textoesc").val().length>0){
                            contenedorVariables[x]["escalado"]=getNumero($("#textoesc").val());
                        }else{
                            contenedorVariables[x]["escalado"]=1;
                        }
                        actualizarVarInterfaz();
                        actualizarDatosInterfazTemporal();
                    }
                }
            }
        });


        $("#nuevavar").click(function(){
            if(activarGuardar()){
                var nuevaVar={};
                nuevaVar["nombre"]=$("#campotextovar").val();
                nuevaVar["variable"]=$('#variablesFileloaderL').val();
                nuevaVar["color"]=$('#selector-color').val();
                nuevaVar["grosorlinea"]=$('#selector-grosorlinea').val();
                nuevaVar["grosorpunto"]=$('#selector-grosorpunto').val();
                nuevaVar["cronograma"]=$('#selector-cronograma').val();
                if($("#textodesp").val().length>0){
                    nuevaVar["desplazamiento"]=$("#textodesp").val();
                }else{
                    nuevaVar["desplazamiento"]=0;
                }
                if($("#textoesc").val().length>0){
                    nuevaVar["escalado"]=$("#textoesc").val();
                }else{
                    nuevaVar["escalado"]=1;
                }
                contenedorVariables.push(nuevaVar);
                actualizarVarInterfaz();
                actualizarDatosInterfazTemporal();

            }

        });
    } //Fin interfaz opciones graficas temporal


    function insertarHTMLXY(){
        $("#modalcabecera").html('');
        $("#modalcuerpo").html('');
        $("#modalcabecera").html('<h4 class="modal-title">Variable Settings</h4>');
        $("#modalcuerpo").html('<div id="contenedorModal" class=container><div>');

        $("#contenedorModal").html(
            '<div class="container" id="variablesFileloader1"></div>'+
            '<div class="container" id="variablesFileloader2"></div>'+
            '<div class="container" id="color"></div>'+
            '<div class="container" id="grosorlinea"></div>'+
            '<div class="container" id="grosorpunto"></div>'+
            '<div class="container"><input id="campotextovar" type="text" class="col-xs-5" placeholder="Insert a new name"></div>');


        $("#variablesFileloader1").html(
            '<span>Variable Axis X </span>'+
            '<select id="variablesFileloaderL1" class="selectpicker ventana-variables">'+
            '</select>');
        $("#variablesFileloader2").html(
            '<span>Variable Axis Y </span>'+
            '<select id="variablesFileloaderL2" class="selectpicker ventana-variables">'+
            '</select>');

        $("#botondeguardar").html('<button type="button" id="guardar" class="btn btn-success">' +
            '<span class="glyphicon glyphicon-floppy-disk"> Save</span>' +
            '</button>');


        $("#color").html('<span>Color </span><select id="selector-color" class="selectpicker">'+
            '<option>Random</option>'+
            '<option>Black</option>'+
            '<option>Red</option>'+
            '<option>Blue</option>'+
            '<option>Orange</option>'+
            '<option>Pink</option>'+
            '<option>Brown</option>'+
            '<option>Purple</option>'+
            '<option>Yellow</option>'+
            '</select>');
        $("#grosorlinea").html(' <span>Line Size </span><select id="selector-grosorlinea" class="selectpicker">'+
            '<option>small/normal</option>'+
            '<option>extra small</option>'+
            '<option>small</option>'+
            '<option>normal</option>'+
            '<option>large</option>'+
            '<option>extra large</option>'+
            '</select>');
        $("#grosorpunto").html(' <span>Point Size </span><select id="selector-grosorpunto" class="selectpicker">'+
            '<option>small/normal</option>'+
            '<option>extra small</option>'+
            '<option>small</option>'+
            '<option>normal</option>'+
            '<option>large</option>'+
            '<option>extra large</option>'+
            '</select>');


        for (var nombreVariable in variables) {
            $('#variablesFileloaderL1').append('<option id="'+ variables[nombreVariable]+'"val="'+ variables[nombreVariable]+'" >' + variables[nombreVariable] + '</option>');
            $('#variablesFileloaderL2').append('<option id="'+ variables[nombreVariable]+'"val="'+ variables[nombreVariable]+'" >' + variables[nombreVariable] + '</option>');

        }

        $('#variablesFileloaderL1').selectpicker('refresh');
        $('#variablesFileloaderL2').selectpicker('refresh');
        $('#selector-color').selectpicker('refresh');
        $('#selector-grosorlinea').selectpicker('refresh');
        $('#selector-grosorpunto').selectpicker('refresh');

        $('#guardar').click(function(){
            if($('#campotextovar').val().length>0){
                contenedorVariables.shift();
                var nuevaVar={};
                nuevaVar["nombre"]=$("#campotextovar").val();
                nuevaVar["variableX"]=$('#variablesFileloaderL1').val();
                nuevaVar["variableY"]=$('#variablesFileloaderL2').val();
                nuevaVar["color"]=$('#selector-color').val();
                nuevaVar["grosorlinea"]=$('#selector-grosorlinea').val();
                nuevaVar["grosorpunto"]=$('#selector-grosorpunto').val();
                contenedorVariables.push(nuevaVar);
                alert("Saved data");

            }
        });
        if(contenedorVariables.length>0){
            for(var x in contenedorVariables){
                $("#campotextovar").val(contenedorVariables[x]["nombre"]);
                $('#variablesFileloaderL1').val(contenedorVariables[x]["variableX"]);
                $('#variablesFileloaderL2').val(contenedorVariables[x]["variableY"]);

                $('#selector-color').val(contenedorVariables[x]["color"]);
                $('#selector-grosorlinea').val(contenedorVariables[x]["grosorlinea"]);
                $('#selector-grosorpunto').val(contenedorVariables[x]["grosorpunto"]);

                $('#variablesFileloaderL1').selectpicker('refresh');
                $('#variablesFileloaderL2').selectpicker('refresh');
                $('#selector-color').selectpicker('refresh');
                $('#selector-grosorlinea').selectpicker('refresh');
                $('#selector-grosorpunto').selectpicker('refresh');
            }
        }

    }




    //Herramientas

    function activarGuardar(){
        if($("#campotextovar").val().length>0 && variableNueva($("#campotextovar").val())
            && ($("#textodesp").val().length==0 || getNumero($("#textodesp").val())!=null)
            && ($("#textoesc").val().length==0 || getNumero($("#textoesc").val())!=null)){
            return true;
        }else{
            return false;
        }
    }

    function variableNueva(cadena){
        for(var x in variables){
            if(variables[x]["Nombre"]==cadena){
                return false;
            }
        }
        return true;
    }

    function actualizarVarInterfaz(){

        $("#variablesLeidas").html('');

        for (var nombreVariable in contenedorVariables) {
            $('#variablesLeidas').append('<option id="'+ contenedorVariables[nombreVariable]["nombre"]+'"val="'+
                contenedorVariables[nombreVariable]["nombre"]+'" >'
                + contenedorVariables[nombreVariable]["nombre"] + '</option>');
        }
        $('#variablesLeidas').selectpicker('refresh');
    }

    function actualizarDatosInterfazTemporal(){
        for(var x in contenedorVariables){
            if(contenedorVariables[x]["nombre"]==$('#variablesLeidas').val()){
                $("#campotextovar").val(contenedorVariables[x]["nombre"]);
                $('#variablesFileloaderL').val(contenedorVariables[x]["variable"]);
                $('#selector-color').val(contenedorVariables[x]["color"]);
                $('#selector-grosorlinea').val(contenedorVariables[x]["grosorlinea"]);
                $('#selector-grosorpunto').val(contenedorVariables[x]["grosorpunto"]);
                $('#selector-cronograma').val(contenedorVariables[x]["cronograma"]);
                $("#textodesp").val(contenedorVariables[x]["desplazamiento"]);
                $("#textoesc").val(contenedorVariables[x]["escalado"]);
                $('#variablesLeidas').selectpicker('refresh');
                $('#variablesFileloaderL').selectpicker('refresh');
                $('#selector-color').selectpicker('refresh');
                $('#selector-grosorlinea').selectpicker('refresh');
                $('#selector-grosorpunto').selectpicker('refresh');
                $('#selector-cronograma').selectpicker('refresh');
            }
        }
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