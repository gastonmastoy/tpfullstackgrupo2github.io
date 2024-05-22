//Array de los productos harcodeada
const productos = [
  {
    id: "01",
    titulo: "Florales",
    imagen: "../img/products/florales.jpg",
    descripcion:
      "Un toque de color y fragancia para tu hogar con estas hermosas flores. Rosas, orquídeas, lirios, tulipanes, ¡las opciones son infinitas! Decoración vivaz y alegre para cualquier espacio. Cuidados sencillos para disfrutar de su belleza durante mucho tiempo. <br /> ¡Cultiva tu propio jardín de flores y llena tu vida de alegría!",
    precio: 1200,
  },
  {
    id: "02",
    titulo: "Interiores",
    imagen: "../img/products/Interior.jpg",
    descripcion:
      "Belleza natural para tu hogar. Decora con estas plantas resistentes y fáciles de cuidar. Desde cactus y suculentas hasta helechos y flores, hay una opción para cada estilo. Purifica el aire y crea un ambiente tranquilo y relajante. <br /> ¡Empieza tu propio jardín interior hoy mismo!",
    precio: 1400,
  },
  {
    id: "03",
    titulo: "Cactus",
    imagen: "../img/products/Cactus.jpg",
    descripcion:
      "Supervivientes del desierto: belleza resistente y adaptable. Formas y colores únicos que decoran tu hogar. Cuidados mínimos para disfrutar de su presencia durante años. Aliados perfectos para principiantes en jardinería. <br /> ¡Descubre el fascinante mundo de los cactus!",
    precio: 1600,
  },
  {
    id: "04",
    titulo: "Exteriores",
    imagen: "../img/products/Exterior.jpg",
    descripcion:
      "Color y vida para tu jardín o terraza con estas resistentes especies. Desde aromáticas y trepadoras hasta árboles y arbustos, hay una opción para cada espacio. Atraen polinizadores y crean un ambiente natural. Cuidados variados según las especies, pero generalmente adaptables. <br /> ¡Disfruta de la belleza y frescura de las plantas de exterior!",
    precio: 1800,
  },
  {
    id: "05",
    titulo: "Macetas",
    imagen: "../img/products/Macetas.jpg",
    descripcion:
      "Hogar ideal para tus plantas: estilo, funcionalidad y variedad. Materiales, formas y tamaños para todos los gustos y necesidades. Complemento perfecto para la decoración de tu hogar o jardín. Cuida las raíces de tus plantas y aporta un toque estético. <br /> ¡Elige la maceta perfecta para cada una de tus plantas!",
    precio: 2000,
  },
];

//Captura de elemntos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".card__button__addtocart");
const numeroCarrito = document.querySelector("#numero-carrito");

//Funcion crear los productos harcodeados en el array productos
function cargarProductos() {
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
  //Llama a la funcion que captura los botones que se generan en esta funcion
  actualizarBotonesCarrito();
  console.log(botonesAgregar);
}

//Llama a la funcion de cargar productos para generar los productos en el HTML
cargarProductos();

//Funcion capturar los botones del carrito
function actualizarBotonesCarrito() {
  botonesAgregar = document.querySelectorAll(".card__button__addtocart");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarCarrito);
  });
}

//Funcion para agregar los productos al carrito
let productosCarrito;
const productosCarritoLocal = localStorage.getItem("productos-en-carrito");
if (productosCarritoLocal) {
  productosCarrito = JSON.parse(productosCarritoLocal);
  altualizarNumeroCarrito();
} else {
  productosCarrito = [];
}

function agregarCarrito(e) {
  const idBotonAgregar = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBotonAgregar
  );

  if (productosCarrito.some((producto) => producto.id === idBotonAgregar)) {
    const indice = productosCarrito.findIndex(
      (producto) => producto.id === idBotonAgregar
    );
    productosCarrito[indice].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosCarrito.push(productoAgregado);
  }
  console.log(productosCarrito);
  altualizarNumeroCarrito();

  //Guarda el array de los productos que estan en el carrito en el localstoge del navegador para usarlos en el HTML del carrito
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosCarrito)
  );
}

//Funcion para actualizar el numero de elementos en el carrito al HTML
function altualizarNumeroCarrito() {
  let nuevoNumeroCarrito = productosCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  console.log(numeroCarrito);
  numeroCarrito.innerText = nuevoNumeroCarrito;
}
