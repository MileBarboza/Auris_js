// __________________________________    BUSCADOR   ________
const btnFiltrar = document.getElementById("buscador");
btnFiltrar.addEventListener("input", (e) => {
    e.preventDefault();
    btnFiltrar.value == "" ? mostrarProducto(auris) : mostrarProducto(auris.filter((elemento) => elemento.marca.toLowerCase().includes(btnFiltrar.value.toLowerCase())))
})

// _________________________________    FILTRO DE MARCA  _____
const filtro = document.getElementById("filtro");
filtro.addEventListener("click", (e) => {
    e.target.textContent == mostrarProducto(auris.filter((elemento) => elemento.marca.includes(e.target.textContent)))
})
