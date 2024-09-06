document.addEventListener('DOMContentLoaded', () => {// Esto es inestable me va a dar problemas al momento de publicar la web
                                                    // por el conflicto de la ruta del txt de juegos buscar solucion al
                                                    // subir pagina o cambiar y aprender node.js
    fetch('juegos.txt') // Leer el  txt de juegos que tiene el formato con solo la ruta del juego
        .then(response => response.text())
        .then(text => {
            const juegos = text.trim().split('\n');
            const juegosContainer = document.getElementById('juegos');
            juegos.forEach(juego => {
                const nombre = juego.split('/').slice(-2, -1)[0];
                // Div
                const juegoDiv = document.createElement('div');
                juegoDiv.classList.add('juego');
                // imagen sacado de internet
                const juegoImg = document.createElement('img');
                juegoImg.src = `${juego.split('/').slice(0, -1).join('/')}/imagen.png`; // me encuentra la imagen
                juegoImg.alt = nombre;
                // crear el enlace al index de la carpeta juego
                const juegoLink = document.createElement('a');
                juegoLink.href = juego;
                juegoLink.classList.add('jugar');
                juegoLink.innerHTML = `<center>${nombre}</center>`;// ingresar bien una variable en innerhtml

                juegoDiv.appendChild(juegoImg);
                juegoDiv.appendChild(juegoLink);
                juegosContainer.appendChild(juegoDiv);
            });
        })
        .catch(error => console.error('Mira exepciones en js', error));
});

/*Buscar para que usar un usuario posible integracion con puntos en juegos pero se debe ver el uso de cookies para guardar el usuario al cambiar pantalla
y se debe realizar un ajuste a la paginas y modificarlas para el usuario (No le veo utilidad y solo seria funcion para aprender sin mas)*/

function registrarse() {// observacion crear una clase usuario para formar mejor la gestion(Clase usuario)(MYSQL ?)
    var arrayUsuarios = [];// Debo cambiar el uso de arrays para que no sea visible en el codigo js al inspeccionar
    fetch('usuarios.txt')
        .then(response => response.text())
        .then(text => {
            var auxiliar = text.split(':');
            arrayUsuarios.add(auxiliar[0]);
        })
        .catch(error => console.error('Mira exepciones en js', error));
    do { // Realizar una interfaz mas grafica o pagina externa para los usuario (Uso de cookies ? buscar documentacion)
        var usuario = prompt('Ingrese el nombre de usuario a crear');
        if (usuarioExiste(arrayUsuarios, usuario)) {
            alert('usuario ya existe')
        }
    } while (usuarioExiste(arrayUsuarios, usuario)); // arreglar la funcion o bucle y privatizarlo
    do {
        var contraseña = prompt('Ingrese la contraseña a crear');
        var verifica = prompt('Repita la contraseña');
    } while (contraseña !== verifica);
    var usuarioContraseña = usuario + ':' + contraseña;
    guardarUsuario(usuarioContraseña);
}

function guardarUsuario(usuarioContraseña) { // buscar una mejor forma de guardar usuarios con node.js por que esto es insostenible he inutil (MYSQL opcion)
    const fs = require('fs');// otra observacion buscar una forma de guardar el obejeto usuario si se cambia la creacion de usuario
    fs.writeFile('usuarios.txt', usuarioContraseña, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Archivo creado correctamente');
        }
    });
}

function usuarioExiste(arrayUsuarios, usuario) {// No se puede usar array debo cambiar el como verificar usuario repetido
    arrayUsuarios.forEach(element => {
        if (usuario == element) {
            return true;
        }
    });
    return false;
}