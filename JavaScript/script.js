const menu = document.getElementById('menu');
const navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}
// ______________________________________________    MODE DARK   
let darkMode = localStorage.getItem('darkMode'); 
const darkModeToggle = document.querySelector('#dark-mode-toggle');

const habilitarDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkMode', 'habilitar');
}

const desahabilitarDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkMode', null);
}
 
if (darkMode === 'habilitar') {
    habilitarDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode'); 
  if (darkMode !== 'habilitar') {
    habilitarDarkMode();
  } else {  
    desahabilitarDarkMode(); 
  }
});
// ________________________________________________    PRODUCTOS 
const divProductos = document.getElementById('productosAuris')
//____  Modal  ____ 
const divProductoCarrito = document.getElementById('productosAurisCarrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const vaciarCarrito = document.getElementById('vaciarCarrito')
const precioTotal = document.getElementById('precioTotal')
//____  Favorito  ____ 
const mostrarFavorito = document.getElementById("mostrarFavorito")

fetch("../json/productos.json")
    .then((resp) => resp.json())
    .then((data) => {
        auris = data
            mostrarProducto(auris);
            return auris
    })

let auris = []
let carrito = []
 

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
    verCarrito()
} else {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function mostrarProducto(auris){
    divProductos.innerHTML = ""
    auris.forEach((producto) =>{
        const div = document.createElement('div')       
        div.innerHTML += `
        <div class="conte darkCont">
            <button id="favorito${producto.id}" class="conte__favorito dark"><span class="material-symbols-outlined">favorite</span></button>
            <img src=${producto.img} alt="Productos Auris" class="conte__img">
            <h2 class="conte__titulo" ><strong>${producto.marca} - ${producto.nombre}</strong></h2>
            <p> ${producto.tipo}</p>
            <p class="conte__precio">$ ${producto.precio}</p>
            <button id="agregar${producto.id}" class="conte__comprar som-dark">Comprar <img class="conte__comprar--img"src="/assets/icons/shopping (filled).svg"></button>
        </div>`
            divProductos.appendChild(div)       
    
        const boton = document.getElementById(`agregar${producto.id}`)
        boton.addEventListener('click', () => {
            agregarCarrito(producto.id)
        })

        const corazon = document.getElementById(`favorito${producto.id}`)
        corazon.addEventListener('click', () => {
            agregarfavorito(producto.id)
            corazon.classList.toggle('active')
        })
    })
}

function agregarCarrito(IdProducto){
    Toastify({
        text: "Agregado al carrito",
        duration: 1300,
        style: {
          background: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)", 
          borderRadius:"7px",
          fontWeight: "600",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.087)",
        },
        gravity: "bottom",
        position: "right",
      }).showToast();

      const existeProdu = carrito.some (produ => produ.id === IdProducto)
    if(existeProdu){
        const produ = carrito.map (produ => {
            if(produ.id === IdProducto){
                produ.cantidad++
            }
        })
    } else{ 
    const articulo = auris.find((produ) => produ.id === IdProducto)
    carrito.push(articulo)
    }
    localStorage.setItem("carrito",JSON.stringify(carrito))
    verCarrito();  
}
 
// ___________________________________ Modal
function verCarrito(){
    let carritoStorage = JSON.parse(localStorage.getItem('carrito'))

    divProductoCarrito.innerHTML = "" 
    if(carrito.length != 0) {
        carritoStorage.forEach((producto, id) => {
            divProductoCarrito.innerHTML +=`
            <div class="conte-carrito-div">
                <div id="producto${producto.id}" class="conte-carrito darkCont row">
                    <img class="conte-carrito__img col-2"src="${producto.img}"  alt="Productos Auris">
                    <h2 class="conte-carrito__txt__titulo col-2">${producto.marca} ${producto.nombre}</h2>
                    <p class="conte-carrito__precioUnid col-2 ">$${producto.precio}</p>
                    <p class="conte-carrito__txt col-2"><button onclick="agregarCarrito(${producto.id})"  class="btn btn-outline-info btn-sm ">+</button> ${producto.cantidad} <button onclick="quitarDelCarrito(${producto.id})"  class="btn btn-outline-info btn-sm ">-</button></p>
                    <p class="conte-carrito__precio  col-2">$${(producto.precio * producto.cantidad)}</p>
                    <button onclick="eliminarProducto(${producto.id})" class="conte-carrito__btn"> <img src="../assets/icons/tacho.svg" width="20px"> </button>
                </div>
            </div>`
        })
    } else {
        divProductoCarrito.innerHTML = `<p class="modal-body__vacio" > No hay productos en el carrito</p>`
    }
    contadorCarrito.innerText = carrito.length
         total()
}

// ___________________________   Confirma Compra   
document.getElementById("btnConfirmar").addEventListener('click',()=>{
    if (carrito.length > 0){
        Swal.fire({
            html: '<h2 class="swal">Elegi el medio de pago</h2>',
            imageUrl: '../assets/pago.png',
            imageWidth: 100,
            imageHeight: 100,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: '<p class="confiBtn">Debito/Credito</p>',
            denyButtonText: `<p class="confiBtn">Mercado Pago</p>`,
            confirmButtonColor: "rgb(190, 106, 255)",
            denyButtonColor: "rgb(255, 101, 158)"
           
        }).then((result) => {
            if (result.isConfirmed) {
                swal.fire({
                    html: `<h2 class="swal">Pago realizado!</h2><p class="swal">Gracias por tu compra!</p><p class="swal">le enviaremos su producto dentro de 48hs</p>`,
                    icon: "success",
                    timer: "3500",
                    timerProgressBar: "true",
                    showConfirmButton: false,
                });
            } else if (result.isDenied) {
                swal.fire({
                    html: `<h2 class="swal">Pago realizado!</h2> <p class="swal">Gracias por tu compra!</p><p class="swal">Le enviaremos su producto dentro de 48hs</p>`,
                    icon: "success",
                    timer: "3500",
                    timerProgressBar: "true",
                    showConfirmButton: false,
                });
            }
        })
        carrito.splice(0,carrito.length);
        verCarrito()
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }
});

function eliminarProducto(IdProducto) {
    const articulo = carrito.find((produ) => produ.id === IdProducto)
    const indice = carrito.indexOf(articulo)
    carrito.splice(indice, 1)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    verCarrito();
}

function quitarDelCarrito(IdProducto) {
    const articulo = carrito.find((produ) => produ.id === IdProducto)
    const indice = carrito.indexOf(articulo)
    if(articulo.cantidad > 1){
        carrito[indice].cantidad--;
    }else if(articulo.cantidad < 1){            
        carrito.splice(indice, 1)
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    verCarrito();
}

vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))
    verCarrito();
})

function total(){
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, produ) => acc + produ.precio *produ.cantidad, 0)
}

// ______________________________________________    FAVORITO  
mostrarFavorito.addEventListener("click",()=>{
    verFavorito()
}) 

let favorito = []

if(localStorage.getItem("favorito")) {
    favorito = JSON.parse(localStorage.getItem("favorito"))
} else {
    localStorage.setItem("favorito", JSON.stringify(favorito))

}

function agregarfavorito(ProductoId){
    Toastify({
      text: "Agregado a Favorito",
      duration: 1500,
      style: {
        background: "linear-gradient(19deg, #a8fadf 0%,#bcafe7  100%)",
        borderRadius:"7px",
        margin:"20px",     
        fontWeight: "600",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.087)",
      },
      position: "lefth",
      gravity:"top",
    }).showToast();

    const existeProdu = favorito.some (produ => produ.id === ProductoId)
    if(existeProdu){
        const produ = favorito.map (produ => {
            if(produ.id === ProductoId){
                produ.cantidad++
            }
        })
    } else{ 
    const articulo = auris.find((produ) => produ.id === ProductoId)
    favorito.push(articulo)
    }
    localStorage.setItem("favorito",JSON.stringify(favorito))
}

function eliminarFavorito(ProductoId) {
    const articulo = favorito.find((produ) => produ.id === ProductoId)
    const indice = favorito.indexOf(articulo)
    favorito.splice(indice, 1)
    localStorage.setItem('favorito', JSON.stringify(favorito))
    verFavorito();
}

function verFavorito(){
    let favoritoStorage = JSON.parse(localStorage.getItem('favorito'))

    if(favorito.length != 0) {
       divProductos.innerHTML = ""
    favoritoStorage.forEach((producto, id) => {
        divProductos.innerHTML +=`
        <div class="conte darkCont">
            <button onclick="eliminarFavorito(${producto.id})" class="conte__favorito dark"> <span class="material-symbols-outlined">favorite</span> </button>
            <img src=${producto.img} alt="Productos Auris" class="conte__img">
            <h2 class="conte__titulo" ><strong>${producto.marca} - ${producto.nombre}</strong></h2>
            <p> ${producto.tipo}</p>
            <p class="conte__precio">$ ${producto.precio}</p>
            <button onclick="agregarCarrito(${producto.id})" class="conte__comprar">Comprar <img class="conte__comprar--img"src="/assets/icons/shopping (filled).svg"></button>
        </div>`
    })
    } else {
        divProductos.innerHTML = `<p class="conte__vacio">No hay productos en favorito</p>`
    }
    localStorage.setItem('favorito', JSON.stringify(favorito))

}
