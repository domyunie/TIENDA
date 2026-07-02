let users = JSON.parse(localStorage.getItem("cuentas")) || [];

function loginUser(e) {
  e.preventDefault();

  let username = document.getElementById("usuario").value.trim();
  let password = document.getElementById("contrasena").value;

  if (!username || !password) {
    alert("Usuario y contraseña requeridos");
    return;
  }

  let foundUser = users.find(
    (u) => u.usuario === username && u.contrasena === password,
  );

  if (foundUser) {
    localStorage.setItem(
      "userSession",
      JSON.stringify({
        type: "users",
        username: username,
        role: foundUser.role || "user",
      }),
    );

    if (foundUser.role === "admin") {
      alert("¡Bienvenido, Admin!");
      window.location.href = "../HTML/crud.html";
    } else {
      alert(
        "No tienes permisos de administrador. Volviendo a la página anterior...",
      );
      const paginaAnterior = localStorage.getItem("urlPrevia");

      if (paginaAnterior) {
        window.location.href = paginaAnterior;
      } else {
        window.location.href = "../HTML/inicio.html";
      }
    }
  } else {
    alert("Credenciales inválidas");
  }

}

localStorage.removeItem("userSession")
