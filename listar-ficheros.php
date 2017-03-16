<?php
/**
 * Created by PhpStorm.
 * User: alumno
 * Date: 15/03/17
 * Time: 21:07
 */
$rutaDirectorio="./Datalogger";
$index=0;
$rutaFicheros = array();
$dir=opendir("./Datalogger");
while($elemento = readdir($dir)){
    $pos=strpos($elemento,"Data");
    if($pos === false){
    }
    else{
        if(filesize("./Datalogger/".$elemento)>0){
            $rutaFicheros[$index]= "./Datalogger/".$elemento;
            $index++;
        }

    }
}
if (count($rutaFicheros)!=0){
    echo json_encode($rutaFicheros);
}
?>