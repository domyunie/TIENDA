(function protegerPantalla() {
  const session = JSON.parse(localStorage.getItem('userSession'));
  
  if (!session || session.role !== 'admin') {
    alert('No tienes acceso a esta sección.');
    window.location.href = '../HTML/inicio.html'; 
  }
})();