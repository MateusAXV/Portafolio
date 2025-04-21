function checkAuth() {
    let token = localStorage.getItem("authToken");
    let expiration = localStorage.getItem("authTokenExpiration");

    if (!token || !expiration || Date.now() > expiration) {
        // Si no hay token o ya expiró, cerrar sesión
        logout();
    }
}

function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    window.location.href = "../html/login.html";
}

// Ejecuta la validación al cargar la página
checkAuth();