let amigos = [];

// Función para agregar un amigo
function agregarAmigo() {
    const input = document.getElementById("amigo");
    if (!input) {
        console.error("No se encontró el campo de entrada con el ID 'amigo'.");
        return;
    }
    const nombre = input.value.trim();

    // Validaciones
    if (nombre === "") {
        alert("Por favor, ingresa un nombre. ¡Un amigo siempre tiene un nombre!");
        return;
    }
    if (/\d/.test(nombre)) {
        alert("Un nombre no puede contener números. Por favor, ingresa un nombre válido.");
        return;
    }
    if (amigos.includes(nombre)) {
        alert(`El nombre "${nombre}" ya está en la lista.`);
        return;
    }

    amigos.push(nombre);
    input.value = "";
    guardarLista();
    actualizarLista();
}

// Función para actualizar la lista visual
function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = amigo;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.style.marginLeft = "4px";
        deleteButton.addEventListener("click", () => eliminarAmigo(index));

        listItem.appendChild(deleteButton);
        lista.appendChild(listItem);
    });
}

// Función para eliminar un amigo
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    guardarLista();
    actualizarLista();
}

// Función para realizar el sorteo
function sortearAmigo() {
    if (amigos.length === 0) {
        alert("¡La lista está vacía! Agrega al menos un amigo antes de hacer el sorteo.");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = amigos[indiceAleatorio];

    document.getElementById("resultado").innerHTML = `🎉 El amigo secreto es: <strong>${amigoSecreto}</strong> 🎉`;

    amigos = [];
    guardarLista();
    actualizarLista();
}

// Guardar y cargar lista
function guardarLista() {
    localStorage.setItem("amigos", JSON.stringify(amigos));
}

function cargarLista() {
    const listaGuardada = localStorage.getItem("amigos");
    amigos = listaGuardada ? JSON.parse(listaGuardada) : [];
    actualizarLista();
}

// Reiniciar lista
function reiniciarLista() {
    amigos = [];
    guardarLista();
    actualizarLista();
}

// Evento para usar Enter
document.getElementById("amigo").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});

// Inicializar lista al cargar
cargarLista();
