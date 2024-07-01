const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".card__button__addtocart");
const numeroCarrito = document.querySelector("#numero-carrito");

// URL de la API
const API_URL = "https://drkraziel.pythonanywhere.com/api/productos";

// Variable global para almacenar los productos
let productos = [];

// Fetch para obtener los productos desde la API
fetch(API_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error al acceder a la API: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    productos = data;
    cargarProductos(productos);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Función para crear los productos obtenidos de la API
function cargarProductos(productos) {
  productos.forEach((producto) => {
    const article = document.createElement("article");
    article.classList.add("card__container");
    article.innerHTML = `
        <div class="card__container__sup">
            <img src="${producto.imagen}" alt="${producto.titulo}" class="card__img" />
            <div class="card__data">
              <h3 class="card__title">${producto.titulo}</h3>
              <p class="card__description">${producto.descripcion}</p>
            </div>
        </div>
        <div class="card__container__inf">
        <p class="card__price">$ ${producto.precio}</p>
        <button class="card__button__addtocart" id="${producto.id}">Añadir al carrito</button>
        </div>
    `;

    contenedorProductos.append(article);
  });
  actualizarBotonesCarrito();
}

// Función para capturar los botones del carrito
function actualizarBotonesCarrito() {
  botonesAgregar = document.querySelectorAll(".card__button__addtocart");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarCarrito);
  });
}

// Inicializa productos en el carrito desde localStorage
let productosCarrito;
const productosCarritoLocal = localStorage.getItem("productos-en-carrito");
if (productosCarritoLocal) {
  productosCarrito = JSON.parse(productosCarritoLocal);
  actualizarNumeroCarrito();
} else {
  productosCarrito = [];
}

// Función para agregar los productos al carrito
function agregarCarrito(e) {
  const idBotonAgregar = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id == idBotonAgregar
  );

  if (productosCarrito.some((producto) => producto.id == idBotonAgregar)) {
    const indice = productosCarrito.findIndex(
      (producto) => producto.id == idBotonAgregar
    );
    productosCarrito[indice].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosCarrito.push(productoAgregado);
  }

  actualizarNumeroCarrito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosCarrito)
  );
}

// Función para actualizar el número de elementos en el carrito en el HTML
function actualizarNumeroCarrito() {
  let nuevoNumeroCarrito = productosCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numeroCarrito.innerText = nuevoNumeroCarrito;
}
