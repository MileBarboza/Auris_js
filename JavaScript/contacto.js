const contactoHide = document.getElementById('contact')
const divProductosOcult = document.getElementById('divProductosOcult')

mostrarFavorito.addEventListener("click",()=>{
    verFavorito()
    contactoHide.classList.add('hide')
    divProductosOcult.classList.add('divProductos','hide')
}) 