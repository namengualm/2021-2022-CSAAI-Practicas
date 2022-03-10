 # Práctica 2

Hola! En la Práctica 2 de la asignatura de Construcción de Servicios y Aplicaciones Audiovisuales en Internet, vamos a crear una CALCULADORA mediante el uso de scrips de HTML, CSS y Javascrip.

En su funcionamiento podrás realizar las funciones básicas como: Sumar, Restar, Multiplicar y Dividir. 


Para ello, se hará uso de una implementación de una calculadora básica, es decir, una calculadora que únicamente pueda hacer una única operación en cada sentencia, su funcionamiento es el siguiente:  

    1. Introducir/Pulsar un dígito/número compuesto del siguiente intervalo [0 - 9]]
    2. Introducir/Pulsar una operación, definida previamente [Suma (+), Resta (-), Multiplicación (*) y División (/)]
    3. Introducir/Pulsar un dígito/número compuesto del siguiente intervalo [0 - 9]]
    4. Introducir/Pulsar el botón "Igual" (=).

Todo lo explicando en los puntos anteriores, se logra mediante la introducción y ajuste de la lógica binária que conocemos como "Maquina de Estados", cuya predefinición viene dada de la siguiente manera:

    1. Estado Inicial 
    2. Estado Operando 1
    3. Estado Operación
    4. Estado Operando 2
    5. Estadno Resultado

Tras haber realizado la implementación de una calculadora básica, he añadido otras mejoras necesarias de aplicación en otras situaciones de cálculo. Dichas mejoras expuestas son:

    1. Porcentaje [ "%" / "*0.01"]
    2. Parentesis  [ "(" / ")"]
    3. Exponente ["^" / "**"]
    4. Raiz Cuadrada [ "sqrt" ]
    5. Número Pi [3.1415..]
    6. AC (Se borra la expresión al completo y se vuelve al estado inicial)
    7. DEL (Se borra el ultimo elemento introducido/pulsado)
    8. ANS (Hace uso del último número obtenido después de haber realizado la primera operación correctamente)

Este es el manual de usuario básico y con mejoras de la CALCULADORA en Javascrip. 