// Cargar el archivo JSON con las preguntas organizadas por temas
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const temas = data.temas;

        const chatbox = document.getElementById('chatbox');
        const chat = document.getElementById('chat');
        const userInput = document.getElementById('userInput');

        // Función para agregar un mensaje al chat
        function agregarMensaje(text, sender) {
            const mensaje = document.createElement('div');
            mensaje.className = `message ${sender}`;
            mensaje.innerText = text;
            chat.appendChild(mensaje);
        }

        // Función para calcular la similitud entre dos cadenas usando el algoritmo de Levenshtein
        function calcularSimilitud(str1, str2) {
            const len1 = str1.length;
            const len2 = str2.length;
            const matriz = [];

            for (let i = 0; i <= len1; i++) {
                matriz[i] = [i];
            }
            for (let j = 0; j <= len2; j++) {
                matriz[0][j] = j;
            }

            for (let i = 1; i <= len1; i++) {
                for (let j = 1; j <= len2; j++) {
                    const costo = str1[i - 1] === str2[j - 1] ? 0 : 1;
                    matriz[i][j] = Math.min(
                        matriz[i - 1][j] + 1,
                        matriz[i][j - 1] + 1,
                        matriz[i - 1][j - 1] + costo
                    );
                }
            }

            const distancia = matriz[len1][len2];
            const longitudMaxima = Math.max(len1, len2);
            const similitud = 1 - distancia / longitudMaxima;

            return similitud;
        }

        // Función para procesar la entrada del usuario y obtener una respuesta del chatbot
        function procesarEntrada() {
            const mensajeUsuario = userInput.value.toLowerCase(); // Convertir la entrada a minúsculas
            agregarMensaje(mensajeUsuario, 'user');
            userInput.value = '';

            // Cambia el umbral de similitud de las cadenas (65%)
            const umbralDeSimilitud = 0.6;

            // Buscar la pregunta en los temas
            let mejorSimilitud = 0;
            let mejorRespuesta = 'Lo siento, no entiendo esa pregunta.';

            for (const tema of temas) {
                for (let i = 0; i < tema.preguntas.length; i++) {
                    const preguntaEnMinusculas = tema.preguntas[i].toLowerCase();
                    const similitud = calcularSimilitud(mensajeUsuario, preguntaEnMinusculas);

                    if (similitud > mejorSimilitud && similitud >= umbralDeSimilitud) {
                        mejorSimilitud = similitud;
                        mejorRespuesta = tema.respuestas[i];
                    }
                }
            }

            agregarMensaje(mejorRespuesta, 'bot');
        }

        // Escuchar eventos de clic en el botón
        const sendButton = document.getElementById('sendButton');
        sendButton.addEventListener('click', procesarEntrada);

        // Escuchar eventos de entrada del usuario
        userInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                procesarEntrada();
            }
        });
    })
    .catch(error => console.error(error));
