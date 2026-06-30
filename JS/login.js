let users = JSON.parse(localStorage.getItem('usuarios')) || [];

function loginUser(e) {
  e.preventDefault(); 

  let username = document.getElementById('usuario').value.trim();
  let password = document.getElementById('contrasena').value;

  if (!username || !password) {
    alert('Usuario y contraseña requeridos');
    return;
  }

  let foundUser = users.find(u => u.usuario === username && u.contrasena === password);


  if (foundUser) {
    localStorage.setItem('userSession', JSON.stringify({ type: 'users', username }));
    window.location.href = '../HTML/Principal.html'; //ENLAZAR A LA QUE ESSSSS
  } else {
    alert('Credenciales inválidas');
  }
}

document.querySelector('form').addEventListener('submit', loginUser);