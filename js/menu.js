// Función para alternar el menú desplegable
function toggleMenu() {
  var menu = document.getElementById("menu");
  menu.classList.toggle("active");  // Alterna la clase "active" para mostrar/ocultar el menú
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

//funcion para el envio del formulario
function deshabilitarBoton(form) {
    const btn = form.querySelector("#enviarBtn");
    btn.disabled = true;
    btn.innerText = "Enviando...";
}

//mensjae de envio del fomrulario 
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario-contacto");
  const btn = document.getElementById("enviarBtn");
  const mensajeResultado = document.getElementById("mensaje-resultado");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    btn.disabled = true;
    btn.textContent = "Enviando...";

    const formData = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/ajax/ximenavanegas88@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        mensajeResultado.textContent = "Mensaje enviado correctamente.";
        mensajeResultado.classList.remove("oculto");
        mensajeResultado.classList.add("visible", "ok");
        form.reset();

        // Oculta el mensaje después de 5 segundos
        setTimeout(() => {
          mensajeResultado.classList.add("oculto");
          mensajeResultado.classList.remove("visible", "ok");
          mensajeResultado.textContent = "";
        }, 5000);
      } else {
        mensajeResultado.textContent = "Hubo un error al enviar el mensaje.";
        mensajeResultado.classList.remove("oculto");
        mensajeResultado.classList.add("visible", "error");
      }
    } catch (err) {
      mensajeResultado.textContent = "No se pudo conectar con el servidor.";
      mensajeResultado.classList.remove("oculto");
      mensajeResultado.classList.add("visible", "error");
    } finally {
      btn.disabled = false;
      btn.textContent = "Enviar mensaje";
    }
  });
});