/**
 * Created by alumno on 8/05/17.
 */
function BusquedaDatos(grafica){
    var codigo;
    var intervalos;



    $('#busqueda').click(function() {
        if($(this).hasClass('active')){
            codigo = $('#texto').val();
            var gramatica=new IntervalosGramatica(grafica, codigo);
            intervalos=gramatica.getIntervalos();
            console.log(intervalos);
            if(intervalos.length==0){
                alert("Query has not been resolved: data not found");
            }
        }
    });



}