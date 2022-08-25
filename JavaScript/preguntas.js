const preguntaHide = document.getElementById('pregunta')
const divProductosOcult = document.getElementById('divProductosOcult')

mostrarFavorito.addEventListener("click",()=>{
    verFavorito()
    preguntaHide.classList.add('hide')
    divProductosOcult.classList.add('divProductos','hide')
}) 