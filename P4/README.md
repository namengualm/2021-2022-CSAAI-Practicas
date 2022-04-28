 # Práctica 4

Bienvenid@ a la Práctica 4 de Filtrado y tratado de Imágenes.

En esta práctica hemos implementado diferentes funciones y filtros para poder muestrear y modificar una imágen. En un momento inicial, podemos observar 2 imagenes sin modificar (originales). Para poder selecionar dicha imágen hemos creado dos botones, con los cuáles vas a poder seleccionar la imagen deseada para su muestreado en el canvas y su posterior modificación.

En este caso vamos a editar una serie de imágenes de paisajes de Mallorca.

Con la finalidad del manual de usuario, vamos a definir tanto las especificaciones básicas de dicha práctica como sus mejoras:

*** Especificaciones Básicas ***

Implementación de los filtros básicos:

1. Filtro Escala de Grises: Toma la imágen que estuviera en el canvas (ya sea la original o con alguna otra modificación) y la pone en escala de grises.

2. Filtro de Umbral de Colores: Toma la imágen original y a partir de ella podemos modificar mediante los deslizadores el umbral de color de cada imágen mediante los umbrales de color RGB ("R" --> Rojo(Red), "G" --> Verde(Green), "B" --> Azul(Blue)). 
Si el deslizador toma el valor del umbral de color de 255, significara que dicha componente no ha sido modificada. Sin embargo, si dicho deslizador toma cualquier valor comprendido en el intervalo de [0 - 254], significara que dicha componente ha sido modificada.

*** Especificaciones de Mejora ***

Como mejora adicional, hemos implementado los siguientes filtros:

1. Espejo: Muestra la imágen original de forma contraria.

2. Vintage: Muestra la imágen original con un filtro de color sepia mediante una matriz de transformación, lo que conlleva a observar un efecto visual de la imágen original con un efecto vintage.

3. Negativo: Muestra la imágen original con los umbrales de color de forma creciente negativamente.

4. Inversión: Muestra la imágen original dada la vuelta.