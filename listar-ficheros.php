<?php
/**
 * Función que mapea el directorio .Datalogger y Datalogger Repos
 * Rodrigo Martinez Bravo
 */
date_default_timezone_set('UTC');
$rutaDirectorio="./Datalogger";
$index=0;
$rutaFicheros = array();
$dir=opendir("./Datalogger");
$separador= " || Date -> ";
while($elemento = readdir($dir)){
    $pos=strpos($elemento,"Data");
    if($pos === false){
    }
    else{
        $ignorar=strpos($elemento,".");
        if($ignorar === false) {
            if (filesize("./Datalogger/" . $elemento) > 0) {
                $fecha= date("Ymd H:i:s",filemtime("./Datalogger/".$elemento));
                $rutaFicheros[$index] = "./Datalogger/" . $elemento.$separador.$fecha ;
                $index++;
            }
        }

    }
}
$dir=opendir("./Datalogger/REPOS");
while($elemento = readdir($dir)){
    $pos=strpos($elemento,"Data");
    if($pos === false){
    }
    else{
//      Ignorar los archivos que tengan extensión (punto)
        $ignorar=strpos($elemento,".");
        if($ignorar === false){
            if(filesize("./Datalogger/REPOS/".$elemento)>0){
                $fecha= date("Ymd H:i:s",filemtime("./Datalogger/REPOS/".$elemento));
                $rutaFicheros[$index]= "./Datalogger/REPOS/". $elemento.$separador.$fecha;
                $index++;
            }
        }
    }
}


if (count($rutaFicheros)!=0){
    echo json_encode($rutaFicheros);
}
?>