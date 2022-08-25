const home = document.getElementById('home')
const buscadorHide = document.getElementById('buscador-hide')
const filtroHide = document.getElementById('filtro')
const AurisHide = document.getElementById('auris-hide')

mostrarFavorito.addEventListener("click",()=>{
    verFavorito()
    home.classList.add('hide')
    buscadorHide.classList.add('hide')
    filtroHide.classList.add('hide')
    AurisHide.classList.add('hide')
}) 