# Visualizador de tramas

## Requisitos


###Traductor de tramas a variables informativas
* La traducción se define en un fichero XML
* El formato tipo seria el siguiente: 
trama xxx, 
variable xxx; byteIni xxx;byteFin xxx; Formato xxx.
variable xxx; byteIni xxx;byteFin xxx; Formato xxx.
 
...........
trama xxx
.....
Las variables pueden mapearse al menos en los siguientes formatos: BOOL,UInt8,Int8,UInt16,Int16,UInt32,Int32,Float
###Visualización de variables
Tienen que poder abrirse varios ficheros a la vez.  El usuario podrá visualizar el listado de ficheros disponibles e indicará con que  ficheros quiere trabajar.
En la página se pueden añadir varias ventanas de visualización ( si esto es complejo o no se visualiza correctamente se puede fijar el número de ventanas a 1 y llevar cada ventana a una pagina web diferente, manejando un conjunto de ficheros totalmente independiente)
Al añadir cada ventana indicamos el tipo de representación entre:
Representación temporal 
Gráficas tipo XY (2 Variables)
Gráficas tipo XYZ (3 Variables)
En cada ventana de visualización nos permite añadir varias gráficas y modificar ciertos parámetros en función del tipo de representación:
Representación temporal: (Hasta 8 gráficas por ventana)
Variable asociada
Color de representación
Escala 
Valor de referencia
Tipo de gráfica: Curva, texto, cronograma...
Gráficas tipo XY(Hasta 4 gráficas por ventana)
Variable asociada a X + Escala + Valor de referencia
Variable asociada a Y + Escala + Valor de referncia
Tipo de puntero de dibujo: color, tamaño, forma(circulo, rectangular...)
Gráficas XYZ (Hasta 4 gráficas por ventana)
Variable asociada a X + Escala+ Valor de refereneic
Variable asociada a Y + Escala + Valor de referencia
Variable asociada a Z + Escala + Valor de referencia
Tipo de representación de variable Z: anchura de puntero, color de puntero, angulo de rectángulo...
En cada ventana se pueden añadir 2 cursores . Los cursores se pueden mover con el ratón. Se indicará el valor de las variables en las posiciones que indiquen los cursores.  Es interesante poder hacer operaciones con los valores de los cursores( sumas, restas...). Es interesante un botón para colocar automáticamente el cursor en el siguiente máximo y mínimo absoluto, así como en el máximo y mínimo local. 
Se podrá realizar un zoom general en cada ventana a través del ratón.
Manejo de ventana temporal
Esto es valido para todos los tipos de graficas no solo para la representacion temporal.  
El usuario indicara cuanto tiempo quiere visualizar en la misma ventana(zoom horizontal) y el instante inicial de visualización. Ambos valores podrán cambiarse de forma textual o con barra de desplazamiento
Los datos se ajustaran para que puedan ser visualizados en el tamaño de la ventana sin sufrir deformación. 
Si el tamaño de la ventana es tal que hay mas datos que pixeles posibles para representar se realizara un diezmado de la señal
Modo pelicula: boton PLAY, PAUSE, STOP y PASO A PASO. Pulsando en el boton play el instante inicial de la ventana temporal se ira incrementando hasta que se llegue al final de los ficheros. Con el boton PAUSE se parara. Con el boton STOP volvera al valor en el que estaba antes de dar al PLAY. Se podra modificar la velocidad de reproduccion
Filtraje de datos
En las gráficas temporales, se deben poder aplicar filtros de datos. Es decir representar solo aquellos tramos de las señales que cumplan ciertas condiciones
Para  cada grafica se podrán seleccionar un conjunto de condiciones (en formato textual tipo SQL) que deben cumplir cada tramo de señal para que sea visualizado. Por ejemplo Voltage>30 AND Temperatura<15. Solo se visualizaran los tramos en los que se cumplan simultaneamente esas condiciones. o por ejemplo, Mensaje IN (1,2,3,4,5) Solo se visualizaran los tramos que esten en ese conjunto
Búsqueda de datos
Inspirado en el modo de filtraje de datos anterior. Mediante la busqueda de datos se puede localizar el siguiente o el anterior valor temporal en el que cumplan un conjunto de condiciones (especificadas en un formato textual similar al SQL). Y se posicionara el cursor en ese valor .
Si no se encuentra nigún valor, se pregunta al usuario si quiere buscar en los ficheros siguientes aunque no se hayan seleccionado para visualizar





## 2 Apartado

Estos son apartados de ejemplo para que veas el resultado.

```
if (variable == 1) {
    printlf("hola mundo");
{
```

## 3 Apartado

Probando el commit y el push.

```$xslt
while(a=0){

funciom();
}
```