const accounts = [
  {
    role: 'admin',
    name: 'Administrator Koperasi',
    email: 'admin@koperasi.com',
    password: 'Admin123!'
  },
  {
    role: 'borrower',
    name: 'Peminjam Utama',
    email: 'user@koperasi.com',
    password: 'Borrower123!'
  }
];

const loans = [
  {
    id: 'KP-001',
    borrower: 'Siti Amanah',
    amount: 25000000,
    term: '12 bulan',
    status: 'approved'
  },
  {
    id: 'KP-002',
    borrower: 'Budi Rahmat',
    amount: 12000000,
    term: '9 bulan',
    status: 'pending'
  },
  {
    id: 'KP-003',
    borrower: 'Indah Pertiwi',
    amount: 5000000,
    term: '6 bulan',
    status: 'declined'
  }
];

const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const dashboardSection = document.getElementById('dashboard');
const dashboardTitle = document.getElementById('dashboardTitle');
const dashboardContent = document.getElementById('dashboardContent');
const logoutButton = document.getElementById('logoutButton');

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

function renderAdminDashboard() {
  dashboardTitle.textContent = 'Panel Admin';
  dashboardContent.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Anggota</h3>
        <p>204 anggota aktif terdaftar.</p>
      </div>
      <div class="stat-card">
        <h3>Pengajuan Tertunda</h3>
        <p>9 aplikasi pinjaman menunggu verifikasi.</p>
      </div>
      <div class="stat-card">
        <h3>Pinjaman Disetujui</h3>
        <p>Rp 220.000.000 dicairkan bulan ini.</p>
      </div>
    </div>
    <div class="list-card">
      <h3>Daftar Pengajuan Pinjaman</h3>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Peminjam</th>
            <th>Jumlah</th>
            <th>Jangka Waktu</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${loans
            .map(
              loan => `
            <tr>
              <td>${loan.id}</td>
              <td>${loan.borrower}</td>
              <td>${formatCurrency(loan.amount)}</td>
              <td>${loan.term}</td>
              <td><span class="status ${loan.status}">${loan.status}</span></td>
            </tr>`
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderBorrowerDashboard() {
  dashboardTitle.textContent = 'Panel Peminjam';
  dashboardContent.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Status Pinjaman</h3>
        <p>Belum ada pinjaman aktif. Ajukan pinjaman sesuai kebutuhan modal.</p>
      </div>
      <div class="stat-card">
        <h3>Batas Pengajuan</h3>
        <p>Dana pinjaman tersedia hingga Rp 50.000.000.</p>
      </div>
      <div class="stat-card">
        <h3>Dukungan</h3>
        <p>Tim koperasi siap membantu proses verifikasi dan pencairan.</p>
      </div>
    </div>
    <div class="application-card list-card">
      <h3>Ajukan Pinjaman Baru</h3>
      <label for="loanAmount">Jumlah Pinjaman</label>
      <input id="loanAmount" type="number" placeholder="Masukkan jumlah pinjaman" />
      <label for="loanTerm">Jangka Waktu</label>
      <select id="loanTerm">
        <option value="6 bulan">6 bulan</option>
        <option value="12 bulan">12 bulan</option>
        <option value="18 bulan">18 bulan</option>
      </select>
      <label for="loanPurpose">Tujuan Pinjaman</label>
      <textarea id="loanPurpose" placeholder="Deskripsikan tujuan penggunaan dana"></textarea>
      <button id="applyLoanButton" class="btn primary">Kirim Pengajuan</button>
      <p id="loanMessage" class="form-error"></p>
    </div>
  `;

  document.getElementById('applyLoanButton').addEventListener('click', () => {
    const amount = Number(document.getElementById('loanAmount').value);
    const term = document.getElementById('loanTerm').value;
    const purpose = document.getElementById('loanPurpose').value.trim();
    const loanMessage = document.getElementById('loanMessage');

    loanMessage.textContent = '';

    if (!amount || amount < 1000000) {
      loanMessage.textContent = 'Masukkan jumlah pinjaman minimal Rp 1.000.000.';
      return;
    }

    if (!purpose) {
      loanMessage.textContent = 'Jelaskan tujuan pinjaman Anda.';
      return;
    }

    loanMessage.style.color = '#86efac';
    loanMessage.textContent = 'Pengajuan berhasil dikirim. Tim kami akan memverifikasi dalam 1-2 hari kerja.';
    document.getElementById('loanAmount').value = '';
    document.getElementById('loanPurpose').value = '';
  });
}

function showDashboard(role) {
  document.getElementById('login').classList.add('hidden');
  dashboardSection.classList.remove('hidden');
  if (role === 'admin') {
    renderAdminDashboard();
  } else {
    renderBorrowerDashboard();
  }
  window.scrollTo({ top: dashboardSection.offsetTop - 40, behavior: 'smooth' });
}

function logout() {
  document.getElementById('login').classList.remove('hidden');
  dashboardSection.classList.add('hidden');
  loginError.textContent = '';
  loginForm.reset();
}

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const account = accounts.find(acc => acc.email === email && acc.password === password && acc.role === role);

  if (!account) {
    loginError.textContent = 'Email, password, atau peran tidak cocok. Periksa kembali dan coba lagi.';
    return;
  }

  showDashboard(role);
});

logoutButton.addEventListener('click', logout);

window.addEventListener('DOMContentLoaded', () => {
  dashboardSection.classList.add('hidden');
});
