// Array de respuestas posibles
const respuestas = [
    "Sí", "No", "Tal vez", "Pregunta de nuevo",
    "Obvio", "No cuentes con ello", "Es posible", "No lo creo",
    "Por supuesto", "Dudoso", "Claro", "No puedo decirlo ahora"
];

// Obtener elementos del DOM
const ball = document.getElementById("magicBall");
const answerText = document.getElementById("answerText");

// Función para generar una respuesta aleatoria
function generarRespuesta() {
    const respuestaAleatoria = respuestas[Math.floor(Math.random() * respuestas.length)];
    answerText.textContent = respuestaAleatoria;
}

// Evento al hacer clic en la bola
ball.addEventListener("click", generarRespuesta);