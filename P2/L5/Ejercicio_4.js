console.log("Ejecutando JavaScript...");

display = document.getElementById('display')

Boton1 = document.getElementById("Boton1")
Boton1.onclick = () => {
    display.innerHTML += 1
}
Boton2 = document.getElementById("Boton2")
Boton2.onclick = () => {
    display.innerHTML += 2
}