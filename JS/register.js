document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const usuarioInput = document.getElementById("usuario");
  const contrasenaInput = document.getElementById("contrasena");

  let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];

  const adminExiste = cuentas.find((u) => u.usuario === "admin");
  if (!adminExiste) {
    cuentas.push({
      id: Date.now(),
      nombre: "Administrador",
      usuario: "admin",
      contrasena: "admin123",
      role: "admin",
      fechaRegistro: new Date().toLocaleDateString("es-ES"),
    });
    localStorage.setItem("cuentas", JSON.stringify(cuentas));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const usuario = usuarioInput.value.trim();
    const contrasena = contrasenaInput.value.trim();

    if (!validarNombre(name)) return;
    if (!validarUsuario(usuario)) return;
    if (!validarContrasena(contrasena)) return;

    if (usuario.toLowerCase() === "admin") {
      alert("Tu nombre de usuario no puede ser 'admin'. Elige otro.");
      usuarioInput.focus();
      return;
    }

    const usuarioExiste = cuentas.find((u) => u.usuario === usuario);
    if (usuarioExiste) {
      alert("Ese nombre de usuario ya está en uso. Elige otro.");
      usuarioInput.focus();
      return;
    }

    const nuevaCuenta = {
      id: Date.now(),
      nombre: name,
      usuario: usuario,
      contrasena: contrasena,
      role: "user",
      fechaRegistro: new Date().toLocaleDateString("es-ES"),
    };

    cuentas.push(nuevaCuenta);
    localStorage.setItem("cuentas", JSON.stringify(cuentas));

    console.log("Cuentas registradas:", cuentas);
    alert(`¡Registro exitoso! Bienvenido, ${name}`);

    window.location.href = "../HTML/login.html";
  });

  function validarNombre(name) {
    if (name.length < 3) {
      alert("El nombre debe tener al menos 3 caracteres.");
      nameInput.focus();
      return false;
    }
    return true;
  }

  function validarUsuario(usuario) {
    const regex = /^[a-zA-Z0-9_]{4,20}$/;
    if (!regex.test(usuario)) {
      alert("El usuario debe tener entre 4 y 20 caracteres (letras, números o guión bajo).");
      usuarioInput.focus();
      return false;
    }
    return true;
  }

  function validarContrasena(contrasena) {
    if (contrasena.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      contrasenaInput.focus();
      return false;
    }
    return true;
  }
});
