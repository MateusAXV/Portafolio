document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault(); // Evita el envío del formulario por defecto

    const username = document.getElementById("username").value; // Obtiene el usuario ingresado
    const password = document.getElementById("password").value; // Obtiene la contraseña ingresada
    const errorMessage = document.getElementById("error-message"); // Elemento para mostrar mensajes de error
    
    // Verificar si el usuario y la contraseña coinciden con alguno en la base de datos
    const validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {

        let token = generateToken(); // Genera un token aleatorio
        let expirationTime = Date.now() + 10 * 60 * 1000; // Expira en 10 minutos (10 * 60 * 1000 ms)


        //uso del token
        localStorage.setItem("authToken", token);//guarda el token generado
        localStorage.setItem("authTokenExpiration", expirationTime);//expiracion token

        //alert("Inicio de sesión exitoso");
        window.location.href = "/html/menuPrincipal.html"; // Redirige al menú principal
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos";
    }
});

function generateToken() { //genera token
    let array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0].toString(16); // Convierte el número en hexadecimal
}

function logout() {
    let array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0].toString(16);
}