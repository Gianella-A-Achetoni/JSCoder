// Personajes y enemigos
const personajes = ["Tanjiro Kamado", "Zenitzu Agatsama", "Inosuke Hashibira"];
const enemigos = ["Akaza", "Daki", "Doma"];

const ataques = {
  "Tanjiro Kamado": ["Respiración del agua 1", "Respiración del agua 2", "Danza sagrada del sol"],
  "Zenitzu Agatsama": ["Respiración del rayo 1", "Respiración del rayo combinada", "Dios del trueno"],
  "Inosuke Hashibira": ["Respiración de la bestia 1", "Respiración de la bestia 2", "Respiración de la bestia 3"],
};

const ataquesEnemigo = ["Sangre demoniaca 1", "Sangre demoniaca 2", "Sangre demoniaca 3"];

const reglas = `
Primero elige un personaje y un enemigo.
Cada ronda debes seleccionar un ataque.
El enemigo responderá con una técnica.
El ataque más fuerte gana. El que pierde 3 vidas, pierde la batalla.
`;

// Elementos del DOM
const btnJugar = document.getElementById("btnJugar");
const btnReglas = document.getElementById("btnReglas");
const seccionJuego = document.getElementById("juego");
const seccionBatalla = document.getElementById("batalla");
const seccionReglas = document.getElementById("reglas");
const personajeSelect = document.getElementById("personajeSelect");
const enemigoSelect = document.getElementById("enemigoSelect");
const btnComenzar = document.getElementById("btnComenzar");
const ataquesDiv = document.getElementById("ataques");
const infoRonda = document.getElementById("infoRonda");
const vidasDiv = document.getElementById("vidas");
const resultadoDiv = document.getElementById("resultado");
const textoReglas = document.getElementById("textoReglas");

// Inicializar selects
personajes.forEach((p, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = p;
  personajeSelect.appendChild(opt);
});

enemigos.forEach((e, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = e;
  enemigoSelect.appendChild(opt);
});

// Variables de juego
let jugador, enemigo, vidasP1, vidasP2, ronda;

// Eventos
btnJugar.addEventListener("click", () => {
  seccionJuego.classList.remove("oculto");
  seccionReglas.classList.add("oculto");
  seccionBatalla.classList.add("oculto");
});

btnReglas.addEventListener("click", () => {
  textoReglas.textContent = reglas;
  seccionReglas.classList.remove("oculto");
  seccionJuego.classList.add("oculto");
  seccionBatalla.classList.add("oculto");
});

btnComenzar.addEventListener("click", () => {
  jugador = personajes[personajeSelect.value];
  enemigo = enemigos[enemigoSelect.value];
  vidasP1 = 3;
  vidasP2 = 3;
  ronda = 1;

  mostrarAtaques(jugador);
  actualizarEstado();

  seccionBatalla.classList.remove("oculto");
  seccionJuego.classList.add("oculto");
});

// Funciones
function mostrarAtaques(personaje) {
  ataquesDiv.innerHTML = "";
  ataques[personaje].forEach((ataque, index) => {
    const btn = document.createElement("button");
    btn.textContent = ataque;
    btn.addEventListener("click", () => jugarRonda(index + 1));
    ataquesDiv.appendChild(btn);
  });
}

function obtenerAtaqueEnemigo(ronda, ataqueJugador) {
  return (ronda % 2 === 0) ? (ataqueJugador === 3 ? 1 : ataqueJugador + 1)
                           : (ataqueJugador === 1 ? 3 : ataqueJugador - 1);
}

function jugarRonda(ataqueElegido) {
  const ataqueJugador = ataques[jugador][ataqueElegido - 1];
  const numeroAtaqueEnemigo = obtenerAtaqueEnemigo(ronda, ataqueElegido);
  const ataqueEnemigo = ataquesEnemigo[numeroAtaqueEnemigo - 1];

  let resultado = "";
  if (ataqueElegido > numeroAtaqueEnemigo) {
    vidasP2--;
    resultado = `Ganaste esta ronda 🎉 ${enemigo} pierde una vida.`;
  } else if (ataqueElegido < numeroAtaqueEnemigo) {
    vidasP1--;
    resultado = `Perdiste esta ronda 😢 ${jugador} pierde una vida.`;
  } else {
    resultado = "¡Empate!";
  }

  resultadoDiv.textContent = `${jugador} usó ${ataqueJugador} | ${enemigo} usó ${ataqueEnemigo} → ${resultado}`;
  ronda++;
  actualizarEstado();

  guardarPartida();
  verificarFin();
}

function actualizarEstado() {
  infoRonda.textContent = `Ronda ${ronda}`;
  vidasDiv.textContent = `Vidas ${jugador}: ${vidasP1} | Vidas ${enemigo}: ${vidasP2}`;
}

function verificarFin() {
  if (vidasP1 === 0 || vidasP2 === 0) {
    const mensaje = vidasP1 === 0 ? `${jugador} fue derrotado 😢` : `¡Ganaste! Venciste a ${enemigo} 🎉`;
    alert(mensaje);
    seccionBatalla.classList.add("oculto");
  }
}

function guardarPartida() {
  const partida = {
    jugador,
    enemigo,
    vidasP1,
    vidasP2,
    ronda
  };
  localStorage.setItem("ultimaPartida", JSON.stringify(partida));
}
