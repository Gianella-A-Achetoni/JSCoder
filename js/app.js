let productosOriginales = []; // productos de la API
let carrito = []; // productos agregados al carrito

const getCafe = async () => {
    try {
        const res = await fetch("https://devsapihub.com/api-fast-food");
        const data = await res.json();

        if (!res.ok) throw new Error("Error en la API");

        productosOriginales = data;
        pintarProductos(productosOriginales);
    } catch (error) {
        console.error("Error al obtener productos:", error.message);
    }
};

const pintarProductos = (productos) => {
    const container = document.getElementById("card");
    container.innerHTML = "";

    if (productos.length === 0) {
        container.innerHTML = `<p class="text-center">No se encontraron productos.</p>`;
        return;
    }

    productos.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");

        div.innerHTML = `
            <div class="card h-100 border-0 shadow-sm">
                <img src="${item.image}" alt="${item.name}" class="card-img-top">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title">${item.name}</h6>
                    <p class="card-text">Categoría: <strong>${item.category}</strong></p>
                    <p class="card-text">Precio: <strong class="text-success">$${item.price}</strong></p>
                    <button class="btn btn-success mt-auto w-100 btn-agregar" data-id="${item.id}">
                        Ordenar ahora <i class="bi bi-bag-plus"></i>
                    </button>
                </div>
            </div>
        `;

        container.appendChild(div);
    });

    // Agregar eventos a los botones "Ordenar ahora"
    document.querySelectorAll(".btn-agregar").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.closest("button").dataset.id;
            agregarAlCarrito(id);
        });
    });
};

/* --- Carrito --- */
const agregarAlCarrito = (id) => {
    const producto = productosOriginales.find(p => p.id == id);

    // verificar si ya existe en el carrito
    const existe = carrito.find(p => p.id == id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    guardarCarrito();
};

const actualizarCarrito = () => {
    const number = document.getElementById("number");
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    number.textContent = totalItems;
};

const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const cargarCarrito = () => {
    const data = localStorage.getItem("carrito");
    if (data) {
        carrito = JSON.parse(data);
        actualizarCarrito();
    }
};

// --- Mostrar carrito con SweetAlert2 ---
document.querySelector("#cart button").addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: "Carrito vacío",
            text: "Aún no agregaste productos",
            icon: "info",
            confirmButtonText: "Ok"
        });
        return;
    }

    // Generar HTML con los productos del carrito
    let carritoHTML = "<ul style='text-align:left'>";
    carrito.forEach((item) => {
        carritoHTML += `
            <li>
                <strong>${item.name}</strong> 
                (x${item.cantidad}) - $${item.price * item.cantidad}
            </li>
        `;
    });
    carritoHTML += "</ul>";

    Swal.fire({
        title: "Tu Carrito",
        html: carritoHTML,
        icon: "success",
        confirmButtonText: "Finalizar compra"
    }).then((result) => {
        if (result.isConfirmed) {
            // Mostrar toast de agradecimiento
            Toastify({
                text: "¡Gracias por tu compra! ✨",
                duration: 3000,
                close: true,
                gravity: "top", // top o bottom
                position: "right", // left, center o right
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                    borderRadius: "8px",
                    fontWeight: "bold",
                }
            }).showToast();

            // Vaciar carrito después de la compra
            carrito = [];
            actualizarCarrito();
            guardarCarrito();
        }
    });
});



// --- FILTRO POR CATEGORÍA ---
document.getElementById("filtroCategoria").addEventListener("change", (e) => {
    const categoria = e.target.value;
    let filtrados = categoria === "all" 
        ? productosOriginales 
        : productosOriginales.filter(p => p.category === categoria);
    pintarProductos(filtrados);
});

// --- BÚSQUEDA ---
document.getElementById("formBusqueda").addEventListener("submit", (e) => {
    e.preventDefault();
    const termino = document.getElementById("buscador").value.toLowerCase();

    let filtrados = productosOriginales.filter(p =>
        p.name.toLowerCase().includes(termino) ||
        p.category.toLowerCase().includes(termino)
    );

    pintarProductos(filtrados);
});

document.addEventListener("DOMContentLoaded", () => {
    getCafe();
    cargarCarrito();
});
