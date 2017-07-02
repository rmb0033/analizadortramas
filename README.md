# Visualizador de tramas en dispositivo con linux embebido

Trabajo de fin de grado de para la universidad de Burgos.
Este trabajo cuenta con una licencia creative commons.

#Resumen del proyecto.
El objetivo final de este trabajo es realizar una herramienta de graficado, que permita usarse en dispositivos linux con poca capacidad de procesamiento.  Esta herramienta ha sido diseñada concretamente para el funcionamiento en dispositivos que actúan como cajas negras en vehículos de guiado automático , aunque esta herramienta es portable a otras plataformas siempre que se dispongan los datos de la misma manera.

La herramienta realiza, antes del graficado, una extracción de datos de forma dinámica a través de un XML, donde se marca la disposición en bits de las variables dentro de las tramas que contienen los ficheros de la caja negra.

Esta herramienta gráfica invoca funcionalidades de forma automática de la librería gráfica utilizada, aunque el grueso del trabajo son las funcionalidades propias, entre ellas destacan: la búsqueda de datos, filtraje de datos, auto-diezmado con zoom, ventana temporal, modo reproducción, escalado, umbrales, ajuste automático, y vistas personalizables: en las cuales podremos exportar e importar vistas para su posterior uso con otros archivos/dispositivos.

Para todo esto he desarrollado esta herramienta, cuya utilización está enfocada únicamente a la monitorización de variables, con el objetivo de ser utilizada por técnicos, haciendo uso del navegador web, adaptado para dispositivos móviles o de escritorio.