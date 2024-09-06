let numDeBarcosColocados = 0;
let numDeBarcosColocadosIA = 0;
let orientacionJ = 'v';
let barcosJugador = [];
let barcosIA = [];
const tableroJ = [];
const tableroIA = [];

function cambiarOrientacion(elemento1, elemento2) {
    elemento1.style.backgroundColor = 'green';
    elemento2.style.backgroundColor = 'red';
    if (elemento1.id === 'vertical') {
        orientacionJ = 'v';
    } else {
        orientacionJ = 'h';
    }
}

function colocarTablero() {
    var gridContainer = document.querySelector('#tableroJ');
    for (var fila = 1; fila <= 10; fila++) {
        tableroJ[fila] = [];
        for (var columna = 1; columna <= 10; columna++) {
            var div = document.createElement('div');
            div.classList.add('celda');
            div.setAttribute('onclick', 'colocarBarco(this)');
            div.setAttribute('onmouseover', 'sombra(this)');
            div.setAttribute('onmouseout', 'quitarSombra(this)');
            div.setAttribute('data-fila', fila);
            div.setAttribute('data-columna', columna);
            div.style.background = 'blue';
            div.style.border = 'solid black 2px'
            gridContainer.appendChild(div);
            tableroJ[fila][columna] = div;
        }
    }
    gridContainer = document.querySelector('#tableroIA');
    for (var fila = 1; fila <= 10; fila++) {
        tableroIA[fila] = [];
        for (var columna = 1; columna <= 10; columna++) {
            var div = document.createElement('div');
            div.classList.add('celda');
            div.setAttribute('onclick', 'atacar(this)');
            //div.setAttribute('onmouseover', 'sombra(this)');
            //div.setAttribute('onmouseout', 'quitarSombra(this)');
            div.setAttribute('data-fila', fila);
            div.setAttribute('data-columna', columna);
            div.style.background = 'blue';
            div.style.border = 'solid black 2px'
            gridContainer.appendChild(div);
            tableroIA[fila][columna] = div;
        }
    }
    console.log(tableroJ);
    console.log(tableroIA);
    crearTableroIA();
}

function crearTableroIA() {
    var orientacionIA = 0;
    var longitud = 0;
    while (numDeBarcosColocadosIA !== 10){
        do {
            var ori = Math.floor(Math.random() * 2);
            var fila = Math.floor(Math.random() * 10) + 1;
            var columna = Math.floor(Math.random() * 10) + 1;
            if (ori === 0) {
                orientacionIA = 'v';
            } else {
                orientacionIA = 'h';
            }
            switch (numDeBarcosColocadosIA) {
                case 0:
                    longitud = 4;
                    break;
                case 1: case 2:
                    longitud = 3;
                    break;
                case 3: case 4: case 5:
                    longitud = 2;
                    break;
                case 6: case 7: case 8: case 9:
                    longitud = 1;
                    break;
                default:
                    break;
            }
        } while (!(comprobarOcupado(fila, columna, longitud, tableroIA, orientacionIA)) && !(comprobarFilaColumna(fila, columna, longitud, tableroIA, orientacionIA)));
        var barco = new Barco(fila, columna, longitud, tableroIA, orientacionIA);
        barcosIA.push(barco);
        console.log(barcosIA);
        numDeBarcosColocadosIA++;
    }
}

function comprobarOcupado(fila, columna, longitud, tablero, orientacion) {
    if (orientacion === 'h') {
        for (let i = 0; i < longitud; i++) {
            if (tablero[fila][columna + i].style.backgroundColor !== 'blue') {
                return false;
            }
        }
    } else {
        for (let i = 0; i < longitud; i++) {
            if (tablero[fila + i][columna].style.backgroundColor !== 'blue') {
                return false;
            }
        }
    }
    return true;
}


class Barco {
    constructor(fila, columna, longitud, tablero, orientacion) {
        this.vida = longitud;
        this.coordenadas = [[]];
        console.log
        for (let i = 0; i < longitud; i++) {
            if (orientacion === 'h') {
                tablero[fila][columna + i].style.backgroundColor = 'green';
                this.coordenadas[i] = [fila + i, columna + i];
            } else {
                tablero[fila + i][columna].style.backgroundColor = 'green';
                this.coordenadas[i] = [fila + i, columna];
            }
        }
        var filaAux = 0;
        var columnaAux = 0;
        if (orientacion === 'h') {
            filaAux = fila + 1;
        } else {
            columnaAux = columna + 1;
        }
        if (this.comprobarGrisDerecha(filaAux, columnaAux, longitud, orientacion)) { //Gris Derecha
            for (let i = 0; i < longitud; i++) {
                if (orientacion === 'h') {
                    tablero[fila + 1][columna + i].style.backgroundColor = 'gray';
                } else {
                    tablero[fila + i][columna + 1].style.backgroundColor = 'gray';
                }

            }
        }
        if (orientacion === 'h') {
            filaAux = fila - 1;
        } else {
            columnaAux = columna - 1;
        }
        if (this.comprobarGrisIzquierda(filaAux, columnaAux, orientacion)) { //Gris Izquierda
            for (let i = 0; i < longitud; i++) {
                if (orientacion === 'h') {
                    tablero[fila - 1][columna + i].style.backgroundColor = 'gray';
                } else {
                    tablero[fila + i][columna - 1].style.backgroundColor = 'gray';
                }

            }
        }
        if (orientacion === 'h') { //Grises Arriba
            columnaAux = columna - 1;
            if (columnaAux >= 1) {
                tablero[fila][columna - 1].style.backgroundColor = 'gray';
                tablero[fila - 1][columna - 1].style.backgroundColor = 'gray';
                tablero[fila + 1][columna - 1].style.backgroundColor = 'gray';
            }
        } else {
            filaAux = fila - 1;
            if (filaAux >= 1) {
                tablero[fila - 1][columna].style.backgroundColor = 'gray';
                tablero[fila - 1][columna - 1].style.backgroundColor = 'gray';
                tablero[fila - 1][columna + 1].style.backgroundColor = 'gray';
            }
        }
        if (orientacion === 'h') { //Grises Abajo
            columnaAux = columna + longitud;
            if (columnaAux <= 10) {
                tablero[fila][columna + longitud].style.backgroundColor = 'gray';
                tablero[fila - 1][columna + longitud].style.backgroundColor = 'gray';
                tablero[fila + 1][columna + longitud].style.backgroundColor = 'gray';
            }
        } else {
            filaAux = fila + longitud + 1;
            if (filaAux <= 10) {
                tablero[fila + longitud][columna].style.backgroundColor = 'gray';
                tablero[fila + longitud][columna - 1].style.backgroundColor = 'gray';
                tablero[fila + longitud][columna + 1].style.backgroundColor = 'gray';
            }
        }
    }

    comprobarGrisDerecha(fila, columna, orientacion) {
        if (orientacion === 'h') {
            if (fila >= 11) {
                return false;
            }
        } else {
            if (columna >= 11) {
                return false;
            }
        }
        return true;
    }

    comprobarGrisIzquierda(fila, columna, orientacion) {
        if (orientacion === 'h') {
            if (fila <= 0) {
                return false;
            }
        } else {
            if (columna <= 0) {
                return false;
            }
        }
        return true;
    }
}


function colocarBarco(elemento) {
    if (elemento.style.background == 'blue') {
        var fila = parseInt(elemento.dataset.fila);
        var columna = parseInt(elemento.dataset.columna);
        console.log('Fila = ' + fila + ' Columna = ' + columna);
        var longitud = 0;
        switch (numDeBarcosColocados) {
            case 0:
                longitud = 4;
                break;
            case 1: case 2:
                longitud = 3;
                break;
            case 3: case 4: case 5:
                longitud = 2;
                break;
            case 6: case 7: case 8: case 9:
                longitud = 1;
                break;
            default:
                break;
        }
        if (comprobarFilaColumna(fila, columna, longitud, tableroJ, orientacionJ) && numDeBarcosColocados < 10) {
            var barco = new Barco(fila, columna, longitud, tableroJ, orientacionJ);
            barcosJugador.push(barco);
            numDeBarcosColocados++;
            console.log(barco);
        }
    }
}

function comprobarFilaColumna(fila, columna, longitud, tablero, orientacion) {
    if (orientacion == 'h' && longitud > 1) {
        if (columna > 9 && longitud == 2) {
            return false;
        } else if (columna > 8 && longitud == 3) {
            return false;
        } else if (columna > 7 && longitud == 4) {
            return false;
        }
        for (let i = 0; i < longitud; i++) {
            var elemento = tablero[fila][columna + i];
            if (elemento.style.background != 'blue') {
                return false;
            }
        }
    } else if (orientacion == 'v' && longitud > 1) {
        if (fila > 9 && longitud == 2) {
            return false;
        } else if (fila > 8 && longitud == 3) {
            return false;
        } else if (fila > 7 && longitud == 4) {
            return false;
        }
        for (let i = 0; i < longitud; i++) {
            var elemento = tablero[fila + i][columna];
            if (elemento.style.background != 'blue') {
                return false;
            }
        }
    }
    return true;
}

function sombra(elemento) {

}

function quitarSombra(elemento) {

}

function atacar(elemento) {

}
