const CLAVE_CARRITO = "carrito";

function obtenerCarrito() {
  const datos = localStorage.getItem(CLAVE_CARRITO);
  if (datos) {
    return JSON.parse(datos);
  }
  return [];
}

function guardarCarrito(items) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("carrito:cambio"));
}

function agregarItem(id, nombre, precio) {
  const carrito = obtenerCarrito();
  let encontrado = false;

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      carrito[i] = {
        id: carrito[i].id,
        nombre: carrito[i].nombre,
        precio: carrito[i].precio,
        cantidad: carrito[i].cantidad + 1
      };
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    carrito.push({ id: id, nombre: nombre, precio: precio, cantidad: 1 });
  }

  guardarCarrito(carrito);
}

function eliminarItem(id) {
  const carrito = obtenerCarrito();
  const nuevoCarrito = [];

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id !== id) {
      nuevoCarrito.push(carrito[i]);
    }
  }

  guardarCarrito(nuevoCarrito);
}

function vaciarCarrito() {
  guardarCarrito([]);
}

function contarItems() {
  const carrito = obtenerCarrito();
  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    total = total + carrito[i].cantidad;
  }

  return total;
}

function totalCarrito() {
  const carrito = obtenerCarrito();
  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    total = total + carrito[i].precio * carrito[i].cantidad;
  }

  return total;
}

function formatearPrecio(n) {
  return "$" + n.toLocaleString("es-CO");
}

window.Carrito = {
  obtenerCarrito: obtenerCarrito,
  agregarItem: agregarItem,
  eliminarItem: eliminarItem,
  vaciarCarrito: vaciarCarrito,
  contarItems: contarItems,
  totalCarrito: totalCarrito,
  formatearPrecio: formatearPrecio
};