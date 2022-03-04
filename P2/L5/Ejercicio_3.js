console.log("Ejecutando JavaScript...");

const test = document.getElementById('test')
test.onclick = () => {
    console.log("Click sobre el párrafo...")
    test.innerHTML += "+1"
}

Boton1 = document.getElementById("Boton1")
Boton1.onclick = () => {
    console.log("¡Click!")
}