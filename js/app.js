/* ─── ISRC 2026 · Shared JS ─── */

const DB = {
  getUsers:   ()  => JSON.parse(localStorage.getItem('isrc_users')   || '[]'),
  saveUsers:  (u) => localStorage.setItem('isrc_users', JSON.stringify(u)),
  getUser:    ()  => JSON.parse(localStorage.getItem('isrc_me')      || 'null'),
  saveUser:   (u) => localStorage.setItem('isrc_me',    JSON.stringify(u)),
  clearUser:  ()  => localStorage.removeItem('isrc_me'),
};

/* Require auth on protected pages */
function requireAuth() {
  const u = DB.getUser();
  if (!u) { window.location.href = '../index.html'; return null; }
  return u;
}

/* Sign out from anywhere */
function signOut() {
  DB.clearUser();
  window.location.href = '../index.html';
}

/* Toast notification */
function toast(msg, icon = '★') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    t.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><text y="18" font-size="16">${icon}</text></svg><span id="toast-msg"></span>`;
    document.body.appendChild(t);
  }
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 3200);
}

/* Inject shared navbar */
function renderNav(activeTab) {
  const u = DB.getUser();
  if (!u) return;
  const initials = (u.fname[0] + (u.lname?.[0] || '')).toUpperCase();
  const tabs = [
    { id: 'home',        label: 'Home',        href: 'home.html',        icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
    { id: 'documents',   label: 'Documents',   href: 'documents.html',   icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>' },
    { id: 'payment',     label: 'Payment',     href: 'payment.html',     icon: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>' },
    { id: 'certificate', label: 'Certificate', href: 'certificate.html', icon: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>' },
    { id: 'profile',     label: 'My Profile',  href: 'profile.html',     icon: '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  ];

  const linksHtml = tabs.map(t => `
    <a href="${t.href}" class="nav-link${activeTab === t.id ? ' active' : ''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${t.icon}</svg>
      ${t.label}
    </a>`).join('');

  document.getElementById('nav-slot').innerHTML = `
    <nav class="nav">
      <a href="home.html" class="nav-logo">
        <svg viewBox="0 0 44 44" fill="none" width="38" height="38">
          <circle cx="22" cy="22" r="20" stroke="#1b3f8b" stroke-width="1.5" opacity=".35"/>
          <circle cx="22" cy="22" r="14" stroke="#c49a2f" stroke-width="1" opacity=".4"/>
          <polygon points="22,6 26.5,17 39,17 29,24.5 33,36 22,29 11,36 15,24.5 5,17 17.5,17"
            fill="#1b3f8b" opacity=".9"/>
          <polygon points="22,10 25.5,19 35,19 27.5,24 30,33 22,28.5 14,33 16.5,24 9,19 18.5,19"
            fill="#c49a2f" opacity=".5"/>
        </svg>
        <div class="nav-logo-text">
          <span class="brand">ISRC</span>
          <span class="sub">2026 Competition</span>
        </div>
      </a>
      <div class="nav-links">${linksHtml}</div>
      <div class="nav-end">
        <div class="nav-avatar" title="${u.fname} ${u.lname}" onclick="location.href='profile.html'">${initials}</div>
        <span style="font-size:13px;font-weight:500;color:var(--text)">${u.fname}</span>
        <button class="nav-signout" onclick="signOut()">Sign out</button>
      </div>
    </nav>`;
}

/* FAQ toggle */
function faq(btn) {
  btn.closest('.faq-item').classList.toggle('open');
}

/* Card number formatter */
function fmtCard(el) {
  el.value = el.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
}
function fmtExp(el) {
  let v = el.value.replace(/\D/g,'');
  if (v.length >= 2) v = v.slice(0,2) + ' / ' + v.slice(2,4);
  el.value = v;
}
