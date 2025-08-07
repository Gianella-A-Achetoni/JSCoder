
//Personajes 
const personajes = ["Tanjiro Kamado", "Zenitzu Agatsama", "Inosuke Hashibira" ];
const enemigos = ["Akaza", "Daki", "Doma"];

//Menu
const menuJuego = `Ingresa el número de la opción:
1- Juego
2- Reglas
3- Salir
`
const menuPersonajes = `Escribe el número correspondiente a el personaje que desees elegir:
        1- Tanjiro Kamado
        2- Zenitzu Agatsama
        3- Inosuke Hashibira
`
const menuEnemigos = `Escribe el número correspondiente a el personaje que desees combatir: 
        1- Akaza
        2- Daki
        3- Doma
`

// ataques

const ataqueTanjiro = {
        ataque1:"Primera postura respiración del agua",
        ataque2:"Segunda postura respiración del agua",
        ataque3:"Danza sagrada del sol"
}

const ataqueZenitsu = {
        ataque1:"Primera postura respiración del rayo",
        ataque2:"Primera postura convinada respiración del rayo",
        ataque3:"Septima postura dios del trueno"
}

const ataqueInosuke = {
        ataque1:"Primera postura respiración de la bestia",
        ataque2:"Segunda postura respiración de la bestia",
        ataque3:"Tercera postura respiración de la bestia"
}

const ataqueDemonio = {
        ataque1:"Primera tecnica de sangre demoniaca",
        ataque2:"Segunda tecnica de sangre demoniaca",
        ataque3:"Tercera tecnica de sangre demoniaca",
}

//Reglas
const reglas = `//REGLAS//
Primero deberas elegir un personaje para jugar, luego otro contra el que vas a combatir.
Luego en cada partida deberas elegir un ataque entre las respiraciones de cada personaje.
El cual resibira como respuesta una tecnica de sangre demoniaca del enemigo.
La tecnica más fuerte gana y el perdedor perdera una de sus tres vidas,
el primero en quedarse sin vidas sera el PERDEDOR.
La vista de las reglas permanece en consola aunque puedes pedir verlas de nuevo.
`
function obtenerAtaqueEnemigo(ataqueJugador, ronda) {
    if (ronda % 2 === 0) {
        // Ronda par → enemigo elige uno más (ciclo hasta 1 si es 3)
        return ataqueJugador === 3 ? 1 : ataqueJugador + 1;
    } else {
        // Ronda impar → enemigo elige uno menos (ciclo hasta 3 si es 1)
        return ataqueJugador === 1 ? 3 : ataqueJugador - 1;
    }
}

function jugar(jugador, enemigo) {
    let ronda = 1;
    let vidasP1 = 3;
    let vidasP2 = 3;

    const personaje = personajes[jugador - 1];
    const enemigoNombre = enemigos[enemigo - 1];

    let ataques;
    switch (personaje) {
        case "Tanjiro Kamado":
            ataques = ataqueTanjiro;
            break;
        case "Zenitzu Agatsama":
            ataques = ataqueZenitsu;
            break;
        case "Inosuke Hashibira":
            ataques = ataqueInosuke;
            break;
    }

    alert(`Has elegido a ${personaje}. Vas a combatir contra ${enemigoNombre}. ¡Buena suerte!`);

    while (vidasP1 > 0 && vidasP2 > 0) {
        const ataqueElegido = parseInt(prompt(`
        Ronda ${ronda}
        Elige tu ataque:
        1 - ${ataques.ataque1}
        2 - ${ataques.ataque2}
        3 - ${ataques.ataque3}
        `));

        if (![1, 2, 3].includes(ataqueElegido)) {
            alert("Ataque inválido. Intenta de nuevo.");
            continue;
        }

        const ataqueJugador = ataques[`ataque${ataqueElegido}`];
        const numeroAtaqueEnemigo = obtenerAtaqueEnemigo(ataqueElegido, ronda);
        const ataqueEnemigoTexto = ataqueDemonio[`ataque${numeroAtaqueEnemigo}`];

        alert(`${personaje} usó: ${ataqueJugador}`);
        alert(`${enemigoNombre} respondió con: ${ataqueEnemigoTexto}`);

        if (ataqueElegido > numeroAtaqueEnemigo) {
            vidasP2--;
            alert(`¡Ganaste esta ronda! ${enemigoNombre} pierde una vida. Vidas restantes: ${vidasP2}`);
        } else if (ataqueElegido < numeroAtaqueEnemigo) {
            vidasP1--;
            alert(`¡Perdiste esta ronda! ${personaje} pierde una vida. Vidas restantes: ${vidasP1}`);
        } else {
            alert("¡Empate! Nadie pierde una vida esta ronda.");
        }

        ronda++;
    }

    if (vidasP1 === 0) {
        alert(`¡Oh no! ${personaje} fue derrotado. 😢`);
    } else {
        alert(`¡Felicitaciones! Venciste a ${enemigoNombre}. 🎉`);
    }
}




function menu(option){

        switch (option) {
                case 1:
                        const jugador = parseInt(prompt(menuPersonajes));
                        const enemigo = parseInt(prompt(menuEnemigos));
                        jugar(jugador,enemigo);
                        break;
                case 2:
                        alert(reglas)
                        break;
                default:
                        break;
        }
}

let opcion

alert("Bienvenido al juego donde cazaras demonios!!!");
alert(reglas)
console.log(reglas)

while (opcion !== 3) {
    opcion = parseInt(prompt(menuJuego));

    if (isNaN(opcion) || opcion < 1 || opcion > 3) {
        alert("Opción inválida. Por favor elegí una opción válida (1, 2 o 3).");
        continue; // vuelve al inicio del ciclo
    }

    menu(opcion);
}

alert("Fin del juego")