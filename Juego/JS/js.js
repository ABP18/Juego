let numeroEsperadoTabla1 = 1;
let numeroEsperadoTabla2 = 26;
let pulsadosTabla1 = 0;
let puntos = 1;


// Función para llenar una tabla con números no repetidos en un rango
function llenarTabla(tabla, inicio, fin, callback) {
  const numeros = Array.from({ length: (fin - inicio) + 1 }, (_, i) => i + inicio);
  shuffleArray(numeros);

  for (let i = 0; i < 5; i++) {
    const row = tabla.insertRow();
    for (let j = 0; j < 5; j++) {
      const cell = row.insertCell();
      cell.textContent = numeros[i * 5 + j];
      // Asignar un identificador único a cada celda
      cell.id = `celda_${i}_${j}`;
      // Agregar un evento de clic a cada celda
      cell.addEventListener('click', () => callback(cell));
    }
  }
}

// Función para intercambiar celdas entre las dos tablas
function intercambiarCeldasTabla1(celda) {
  // Obtener la posición de la celda en la primera tabla
  const pos = celda.id.split('_');
  const fila = parseInt(pos[1]);
  const columna = parseInt(pos[2]);

  // Verificar si el número de la celda clicada es el siguiente esperado
  if (parseInt(celda.textContent) === numeroEsperadoTabla1) {
    // Ocultar la celda en la primera tabla
    celda.style.visibility = 'hidden';

    // Obtener la celda correspondiente en la segunda tabla
    const segundaTabla = document.getElementById('tabla2');
    const celdaSegundaTabla = segundaTabla.rows[fila].cells[columna];

    // Mostrar la celda en la segunda tabla
    celdaSegundaTabla.style.visibility = 'visible';

    // Incrementar el número esperado de la primera tabla
    numeroEsperadoTabla1++;

    // Incrementar el contador de celdas pulsadas en la primera tabla
    pulsadosTabla1++;

    // Si se pulsan todas las celdas de la primera tabla, habilitar clics en la segunda tabla
    if (pulsadosTabla1 === 25) {
      document.getElementById('tabla2').style.pointerEvents = 'auto';
    }

    // Incrementar el contador de puntos
    puntos++;
    document.getElementById('puntosContador').textContent = puntos;

    if (puntos === 25) {
      puntos=25;
      document.getElementById('puntosContador').textContent = puntos;
    }

  }
}

// Función para intercambiar celdas en la segunda tabla
function intercambiarCeldasTabla2(celda) {
  // Obtiene la posición de la celda en la segunda tabla
  const pos = celda.id.split('_');
  const fila = parseInt(pos[1]);
  const columna = parseInt(pos[2]);

  // Verificar si el número de la celda clicada es el siguiente esperado
  if (parseInt(celda.textContent) === numeroEsperadoTabla2) {
    // Ocultar la celda en la segunda tabla
    celda.style.visibility = 'hidden';

    // Incrementar el número esperado de la segunda tabla
    numeroEsperadoTabla2++;

    // Suma puntos cuando clicas
    puntos++;
    document.getElementById('puntosContador').textContent = puntos;
    if (puntos === 51) {
      document.getElementById('puntosContador').textContent = "Partida Finalizada";
    }
  }
}

// Función para mezclar un array (algoritmo de Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}




// Llenar la primera tabla con números del 1 al 25
const tabla1 = document.getElementById('tabla1');
llenarTabla(tabla1, 1, 25, intercambiarCeldasTabla1);

// Llenar la segunda tabla con números del 26 al 50 y hacerlas invisibles
const tabla2 = document.getElementById('tabla2');
llenarTabla(tabla2, 26, 50, intercambiarCeldasTabla2);
tabla2.style.visibility = 'hidden';
// Habilitar clics en la segunda tabla al principio
tabla2.style.pointerEvents = 'auto';