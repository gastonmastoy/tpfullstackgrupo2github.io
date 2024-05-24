let productosCarrito = localStorage.getItem("productos-en-carrito");
productosCarrito = JSON.parse(productosCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoFinalizado = document.querySelector("#carrito-finalizado");
let botonesEliminar = document.querySelectorAll(".button__eliminar");
const botonEliminar = document.querySelector(".button__vaciar");
const contenidoTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#comprar");

function cargarProductosCarrito() {
  if (productosCarrito && productosCarrito.length > 0) {
    carritoVacio.classList.add("oculto");
    carritoProductos.classList.remove("oculto");
    carritoAcciones.classList.remove("oculto");
    carritoFinalizado.classList.add("oculto");

    //Limpia el div #carrito-productos
    carritoProductos.innerHTML = "";

    productosCarrito.forEach((producto) => {
      const divProductosCarrito = document.createElement("div");
      divProductosCarrito.classList.add("carrito__producto");
      divProductosCarrito.innerHTML = `
                <img src="${producto.imagen}" alt="${
        producto.titulo
      }" class="carrito__img" />
                <div class="carrito__titulo">
                  <small>Titulo</small>
                  <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito__cantidad">
                  <small>Cantidad</small>
                  <h3>${producto.cantidad}</h3>
                </div>
                <div class="carrito_precio">
                  <small>Precio</small>
                  <h3>$${producto.precio}</h3>
                </div>
                <div class="carrito__subtotal">
                  <small>Subtotal</small>
                  <h3>$${producto.precio * producto.cantidad}</h3>
                </div>
                <div class="carrito__quitar">
                  <button class="button__eliminar" id="${
                    producto.id
                  }">Eliminar</button>
                </div>
            `;
      carritoProductos.append(divProductosCarrito);
    });
  } else {
    carritoVacio.classList.remove("oculto");
    carritoProductos.classList.add("oculto");
    carritoAcciones.classList.add("oculto");
    carritoFinalizado.classList.add("oculto");
  }
  actualizarBotonesEliminar();
  actualizarTotal();
}

cargarProductosCarrito();

//Funcion capturar los botones eliminar
function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".button__eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarProducto);
  });
}

//Funcion que elimina el producto del carrito
function eliminarProducto(e) {
  let idBoton = e.currentTarget.id;
  //const productoEliminado = productosCarrito.find(producto => producto.id === idBoton)
  const indice = productosCarrito.findIndex(
    (producto) => producto.id === idBoton
  );
  productosCarrito.splice(indice, 1);
  console.log(productosCarrito);
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosCarrito)
  );
  cargarProductosCarrito();
  console.log(productosCarrito);
}

//Funcion para limpiar carrito

botonEliminar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  productosCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosCarrito)
  );
  cargarProductosCarrito();
}

//Actualizar el total
function actualizarTotal() {
  const calculoTotal = productosCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  contenidoTotal.innerText = `$${calculoTotal}`;
}

botonComprar.addEventListener("click", completarCompra);
function completarCompra() {
  productosCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosCarrito)
  );
  carritoVacio.classList.add("oculto");
  carritoProductos.classList.add("oculto");
  carritoAcciones.classList.add("oculto");
  carritoFinalizado.classList.remove("oculto");
}