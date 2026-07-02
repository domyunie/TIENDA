(function protegerPantalla() {
  const session = JSON.parse(localStorage.getItem('userSession'));

  if (!session || session.role !== 'admin') {
    alert('Debes iniciar sesión como administrador para acceder a esta sección.');
    window.location.href = '../HTML/login.html';
  }
})();



let usuarios   = JSON.parse(localStorage.getItem('usuarios')) || [];
let editandoId = null;
let grafica    = null;

function mostrar() {
  const tbody = document.getElementById('tablaUsuarios');
  tbody.innerHTML = '';

  usuarios.forEach(u => {
    tbody.innerHTML += `
      <tr>
        <td>${u.id}</td>
        <td>${u.nombre}</td>
        <td>${u.email}</td>
        <td>
          <button class="btn btn-edit"   onclick="editar(${u.id})">Editar</button>
          <button class="btn btn-delete" onclick="eliminar(${u.id})">Eliminar</button>
        </td>
      </tr>`;
  });
}

function guardar() {
  const nombre = document.getElementById('nombre').value.trim();
  const email  = document.getElementById('email').value.trim();

  if (!nombre || !email) {
    alert('Completa todos los campos');
    return;
  }

  if (editandoId === null) {
    usuarios.push({ id: Date.now(), nombre, email });
  } else {
    usuarios = usuarios.map(u =>
      u.id === editandoId ? { ...u, nombre, email } : u
    );
    editandoId = null;
    document.getElementById('formTitle').innerText = 'Agregar Usuario';
  }

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  limpiar();
  mostrar();
}

function editar(id) {
  const user = usuarios.find(u => u.id === id);
  if (!user) return;

  document.getElementById('nombre').value = user.nombre;
  document.getElementById('email').value  = user.email;
  editandoId = id;
  document.getElementById('formTitle').innerText = 'Editar Usuario';
}

function eliminar(id) {
  if (confirm('¿Eliminar este usuario?')) {
    usuarios = usuarios.filter(u => u.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mostrar();
  }
}

function limpiar() {
  document.getElementById('nombre').value = '';
  document.getElementById('email').value  = '';
}

function toggleGrafica() {
  const sec     = document.getElementById('graficaSection');
  const visible = sec.style.display === 'block';

  sec.style.display = visible ? 'none' : 'block';
  if (!visible) generarGrafica();
}

function generarGrafica() {
  const datos    = JSON.parse(localStorage.getItem('usuarios')) || [];
  const emptyMsg = document.getElementById('graficaEmpty');

  if (grafica) { grafica.destroy(); grafica = null; }

  if (datos.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }
  emptyMsg.style.display = 'none';

  const labels     = datos.map(u => u.nombre || 'Sin nombre');
  const cantidades = datos.map(u => u.nombre ? u.nombre.length : 1);

  const COLORS_BG = [
    'rgba(255,99,132,0.7)',  'rgba(54,162,235,0.7)',
    'rgba(255,206,86,0.7)', 'rgba(75,192,192,0.7)',
    'rgba(153,102,255,0.7)','rgba(255,159,64,0.7)',
    'rgba(0,255,255,0.7)',  'rgba(255,0,255,0.7)'
  ];
  const COLORS_BD = COLORS_BG.map(c => c.replace('0.7', '1'));

  const canvas = document.getElementById('myChart');
  grafica = new Chart(canvas, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'Letras en nombre',
        data: cantidades,
        backgroundColor: COLORS_BG,
        borderColor: COLORS_BD,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#fff', padding: 14 }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.parsed} letras`
          }
        }
      }
    }
  });
}

function toggleReporte() {
  const sec     = document.getElementById('reporteSection');
  const visible = sec.style.display === 'block';

  sec.style.display = visible ? 'none' : 'block';
  if (!visible) generarReporteCompleto();
}

function generarReporteCompleto() {
  const datos = JSON.parse(localStorage.getItem('usuarios')) || [];

  document.getElementById('statTotal').innerText   = datos.length;
  document.getElementById('statPrimero').innerText = datos[0]?.nombre || '—';
  document.getElementById('statUltimo').innerText  = datos[datos.length - 1]?.nombre || '—';

  const tbody = document.getElementById('tbodyReporte');
  tbody.innerHTML = '';

  if (datos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:rgba(255,255,255,0.5)">No hay usuarios registrados</td></tr>';
    return;
  }

  datos.forEach((u, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${u.nombre}</td>
        <td>${u.email}</td>
      </tr>`;
  });
}

mostrar();