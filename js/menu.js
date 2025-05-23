// Función para alternar el menú desplegable
function toggleMenu() {
  var menu = document.getElementById("menu");
  menu.classList.toggle("active");  // Alterna la clase "active" para mostrar/ocultar el menú
}
// Función para copiar el correo electrónico al portapapeles
function copiarCorreo() {
  const correo = "ximenavanegas88@gmail.com"; // Correo a copiar

  // Usa la API del navegador para copiar texto
  navigator.clipboard.writeText(correo).then(() => {
    alert("Correo copiado al portapapeles 📋"); // Muestra confirmación
  }).catch(err => {
    alert("No se pudo copiar el correo"); // Muestra error si algo falla
    console.error(err); // Muestra error en la consola
  });
}

//animacion foto
// Espera que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  const fotoInner = document.getElementById('foto-inner');
  let rotado = false;

  setInterval(() => {
    rotado = !rotado;
    fotoInner.style.transform = rotado ? 'rotateY(180deg)' : 'rotateY(0deg)';
  }, 5000); // cada 5 segundos
});