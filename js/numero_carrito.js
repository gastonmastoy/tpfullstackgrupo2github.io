//Funcion para agregar los productos al carrito

const numeroCarrito = document.querySelector("#numero-carrito");

let productosCarritoActualizado;
const productosCarritoLocal = localStorage.getItem("productos-en-carrito");
if (productosCarritoLocal) {
  productosCarritoActualizado = JSON.parse(productosCarritoLocal);
  altualizarNumeroCarrito();
} else {
  productosCarritoActualizado = [];
}

//Funcion para actualizar el numero de elementos en el carrito al HTML
function altualizarNumeroCarrito() {
  let nuevoNumeroCarrito = productosCarritoActualizado.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  console.log(numeroCarrito);
  numeroCarrito.innerText = nuevoNumeroCarrito;
  console.log(nuevoNumeroCarrito);
}
