let nivel = 1;
let jugando = false;
let liberar = 1;
let patronJ = [];
let patron = [];
let clicks = 0;

function empezar() {
    if (!jugando) {
        var elemento1 = document.querySelector('#perder');
        var elemento2 = document.querySelector('#ganar');
        elemento1.style.opacity = 0;
        elemento2.style.opacity = 0;
        patron = [];
        patronJ = [];
        var arrayCeldas = document.querySelectorAll('#tablero > button');
        jugando = false;
        liberar = 1;
        var indice = 0;
        for (let i = 1; i <= nivel; i++) {
            setTimeout(() => {
                setTimeout(() => {
                    indice = Math.floor(Math.random() * 9)
                    arrayCeldas[indice].style.opacity = 1;
                    arrayCeldas[indice].style.scale = 1.2;
                    console.log('Color encendido ' + indice);
                    patron[i - 1] = indice;
                }, 100 * i);
                setTimeout(() => {
                    arrayCeldas[indice].style.opacity = 0.2;
                    arrayCeldas[indice].style.scale = 1;
                    console.log('Color apagado ' + indice);
                    //validar si ya se puede jugar
                    if (nivel - i === 0) {
                        jugando = true;
                        console.log('Jugando');
                        console.log('Patron ' + patron);
                    }
                }, 800 + 100 * i);
            }, 1000 * i);

        }
    }
}

function cambiarVariable() {
    var valorInput = document.getElementById("nivel").value;
    nivel = parseInt(valorInput);
    console.log("La variable ha sido cambiada a " + nivel);
}

function estaElRaton(elemento) {
    if (jugando) {
        elemento.style.opacity = '1';
    }
}

function noEstaElRaton(elemento) {
    if (jugando) {
        elemento.style.opacity = '0.2';
    }
}

function clickCelda(numCelda, elemento) {
    if (jugando) {
        patronJ[clicks] = numCelda;
        clicks++;
        if (nivel == clicks) {
            jugando = false;
            clicks = 0;
            console.log('Patron jugador ' + patronJ);
            elemento.style.opacity = '0.2';
            if (estado()) {
                var elemento = document.querySelector('#ganar');
            } else {
                var elemento = document.querySelector('#perder');
            }
            elemento.style.opacity = 1;
        }
    }
}

function estado() {
    for (let i = 0; i < patronJ.length; i++) {
        if (patronJ[i] != patron[i]) {
            return false;
        }
    }
    return true;
}