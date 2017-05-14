/**
 * Created by alumno on 13/05/17.
 */
function InterfazVariable(fileloader, contenedorGrafica, contenedorVar){
    var variables = fileloader.getBiblioteca().getClaves();
    var contenedorVariables=contenedorVar;

    this.getContenedorVariables=function(){
      return contenedorVariables;
    };


    // if(tipoGrafica=="X Y"){
    //
    // }else{
    //     insertarHTMLTemporal();
    // }
    insertarHTMLTemporal();




    function insertarHTMLTemporal(){
        console.log("llega");
        $("#modalcabecera").html('');
        $("#modalcuerpo").html('');
        $("#modalcabecera").html('<h4 class="modal-title">Variable Settings</h4>');
        $("#modalcuerpo").html('<div id="contenedorModal" class=container><div>');

        $("#contenedorModal").html('<div id="contenedorVariables" > </div>'+
            '<div id="variablesFileloader"></div>'+
            '<div class="container" id="color"></div>'+
            '<div class="container" id="grosorlinea"></div>'+
            '<div class="container" id="grosorpunto"></div>'+
            '<div class="container" id="cronograma"></div>'+
            '<div class="container"><input id="campotextovar" type="text" class="col-xs-5" placeholder="Insert a new name"></div>'+
            '<div class="container"><input id="textodesp" type="text" class="col-xs-5" placeholder="Displacement"></div>'+
            '<div class="container"><input id="textoesc" type="text" class="col-xs-5" placeholder="Scale"></div>');


        // color



        $("#variablesFileloader").html('<div class="navbar-form navbar-right">'+
            '<span>Variable </span>'+
            '<select id="variablesFileloaderL" class="selectpicker ventana-variables">'+
            '</select></div>');

        $("#color").html('<span>Color </span><select id="selector-color" class="selectpicker">'+
            '<option>Random</option>'+
            '<option>Black</option>'+
            '<option>Red</option>'+
            '<option>Orange</option>'+
            '<option>Pink</option>'+
            '<option>Brown</option>'+
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


        for (var nombreVariable in variables) {
            $('#variablesFileloaderL').append('<option id="'+ variables[nombreVariable]+'"val="'+ variables[nombreVariable]+'" >' + variables[nombreVariable] + '</option>');
        }
        $("#contenedorVariables").html('<div class="navbar-form navbar-right">'+
            '<select id="variablesLeidas" class="selectpicker ventana-variables" single>'+
            '</select>'+
            '<button type="button" id="nuevavar" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-file"> New</span>'+
            '</button>'+
            '<button type="button" id="borrar" class="btn btn-default">'+
            '<span class="glyphicon glyphicon-trash"> Delete</span>'+
            '</button></div>');

        for (var nombreVariable in contenedorVariables) {
            $('#variablesLeidas').append('<option id="'+ contenedorVariables[nombreVariable]["nombre"]+'"val="'+
                contenedorVariables[nombreVariable]["nombre"]+'" >'
                + contenedorVariables[nombreVariable]["nombre"] + '</option>');
        }
        $('#variablesLeidas').selectpicker('refresh');
        $('#variablesLeidas').selectpicker('refresh');
        $('#variablesFileloaderL').selectpicker('refresh');
        $('#selector-color').selectpicker('refresh');
        $('#selector-grosorlinea').selectpicker('refresh');
        $('#selector-grosorpunto').selectpicker('refresh');
        $('#selector-cronograma').selectpicker('refresh');


        $('#campotextovar').change(function(){
            activarGuardar();
        });
        $('#textodesp').change(function(){
            activarGuardar();
        });
        $('#textoesc').change(function(){
            activarGuardar();
        });

        $("#nuevavar").click(function(){
            console.log("detectado insertar");
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
                console.log(nuevaVar);
                contenedorVariables.push(nuevaVar);
                console.log(contenedorVariables);
                actualizarVarInterfaz();

            }




        });
    }

    function activarGuardar(){
        if($("#campotextovar").val().length>0 && variableNueva($("#campotextovar").val())
            && ($("#textodesp").val().length==0 || getComparador($("#textodesp").val())!=null)
            && ($("#textoesc").val().length==0 || getComparador($("#textoesc").val())!=null)){
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

    function getComparador(cadena){
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