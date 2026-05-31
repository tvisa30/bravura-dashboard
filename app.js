/* ── Bravura Founder Dashboard ── */

// ── Firebase Realtime Database ────────────────────────────────
const FB_URL = 'https://bravura-71b52-default-rtdb.asia-southeast1.firebasedatabase.app';
const POLL_MS = 5000; // sync every 5 seconds

// ── Permission helpers ────────────────────────────────────────
function isAmita() { return /amita/i.test(currentUser || ''); }

// ── Sites data (Google Drive structure) ──────────────────────
const SITES = [
  { name: 'Aligarh', id: '1LnqPRyn3JVpzJ2IzBeaj4llGAM2-Up-N', icon: '🏠',
    clients: [{ name: 'Arun & Minakshi Jain', id: '19CwDoR2QBlJn2bcSOOYlGgFieorSyuBj', photos: 50 }] },
  { name: 'ATS One Hamlet', id: '1Zttkpnx4vXsqpF2-BzIpW-ymXjuIHcoZ', icon: '🏡',
    clients: [{ name: 'Dimple & Sunny China', id: '14MiQagzofkTpgJyTH7UmxadpmldDZ85k' }] },
  { name: 'ATS Pristine', id: '1m6DDybLC-12YwflUSluMenjfFacP9loa', icon: '🏡',
    clients: [
      { name: 'Amrita & Abhishek', id: '1en9TvGA7HHIWzA669t_Uv2IYFyV9Z03P' },
      { name: 'Jain Residence', id: '1hFhT4sV6U-RYO0ZSzEHYmDJKtCG9qMh0' }
    ]},
  { name: 'County 107', id: '1yc7d449fFq5cOslskUGIotYB1qFeBJJV', icon: '🏘️',
    clients: [
      { name: 'The Quiet Edit', id: '1cHRhvZe9y4OQtg4riZcSAjm2kAsMQxeL' },
      { name: 'Ying Yang', id: '1TNiyzWFGmksY1G9KsYGhjZdtUdXRzKAp' }
    ]},
  { name: 'Dubai', id: '1R36daxSTRC7nhg0gRKj68fGZL5hg4Leg', icon: '🌆',
    clients: [{ name: 'Keswani Residence', id: '15HDKp9ku3QiY0mFw5JBOmhNXxCy11csg' }] },
  { name: 'Grand Omaxe', id: '1knM_0vYZQGiYmbD5FgoHJ0_I_WA7_fPD', icon: '🏢',
    clients: [{ name: 'Bajaj Residence', id: '1Gb0tkOIkXnTsqD44SI8tiHAKb1w-NUEH' }] },
  { name: 'Gulshan Dynasty', id: '11CXCGuNsnOVzdzOk_hzY-gAPzd32YUmJ', icon: '🏰',
    clients: [{ name: 'Mittal Residence', id: '1vg3ahRpNntx0Gj2BYMjuvq0uPGACmsz2' }] },
  { name: 'Hospitality', id: '12thX0QpUPZuduPIakImTjbOAMBLTw5G7', icon: '🍽️',
    clients: [
      { name: '@live', id: '1tFgprCiTedHqg_ACazR7Fq4l89sDqzkq' },
      { name: 'Crops & Curries', id: '1wdYNhVBebKmwnSouxEUbna4ACLBjFibl' }
    ]},
  { name: 'Lotus 300', id: '1LX_Y3oPJu_lgOcotwqAaIJGgslNBrh5H', icon: '🪷',
    clients: [
      { name: 'Art Collaborative', id: '18rptuDUS6VG3-QeUxoCM7XbxfWRehcM1' },
      { name: 'Home Coming', id: '1KFXWa0e2n0hp2WdVCzvpHmOi2qO5AY2R' },
      { name: 'Jaggi Residence', id: '1rMbsbym81Zg4D2Jzm-UHJzVeWFAGHjqV' },
      { name: 'Madhur & Suruchi', id: '1IRVkj3FbJvt81YX67qXUwmQVi9_09bvL' },
      { name: 'Nostalgia', id: '19SfdlqtdI_kNyORpR8fdQfZhDh4QswkR' },
      { name: 'The Classic Home', id: '1bwm6LJrmtdTq84A0Z4tOwb7j591OTTsJ' },
      { name: 'The Retreat', id: '1TDkLwSJzti-53U2hji5bqdDaU2_nXibY' },
      { name: 'Visual Orchestra', id: '1JVDwcjDMxGYv-E4OuCH2R7J87h63lktL' },
      { name: 'Whispering Walls', id: '1ApUxNHvcCdPefus5hBjQHqZEFaLJ-7hs' }
    ]},
  { name: 'Prateek Edifice', id: '1eIsP_vG-ArulGs0a8Ft7ImJta9A6o8vb', icon: '🏗️',
    clients: [{ name: 'Kapoor Residence', id: '1shc08MYhhwIiiWLbOVJHPpbZev6a0eMo' }] },
  { name: 'Stellar Villas', id: '1yaiy1vjEf_P1afx6CRggiEalvFtiZDKQ', icon: '⭐',
    clients: [{ name: 'Gurpreet & Mini', id: '14r287FCADVY2VXHFwVLmGYFR1M6wVtaU' }] },
  { name: 'Supertech', id: '1tIVNNX_W5J-qPKbEDSECspdE1QO2U3KY', icon: '🏙️',
    clients: [{ name: 'Bhavna & Vikas', id: '1Rcpck-4a87ah-F-8wR131h_z3wwALmtT' }] },
  { name: 'Windsor Park', id: '1RtMX3BUQ-IectwPTfFsuIncA53_bPWm_', icon: '🌳',
    clients: [
      { name: 'Mahabir & Smita', id: '1-jSKCz9K6V7Lsf-YXxBzL3Qm0ZL6NmOh' },
      { name: 'Rahul & Anubha', id: '1nzw5D2xp9rXzfaiJf0E_qFhvhQ881ktF' }
    ]},
  { name: 'Ying Yang', id: '1S_bl5Lo5AeJxeAylmArFC7ggLmm2XWHK', icon: '☯️',
    clients: [{ name: 'Ying Yang (Direct)', id: '1S_bl5Lo5AeJxeAylmArFC7ggLmm2XWHK', photos: 23 }] },
];

// ── Auth ─────────────────────────────────────────────────────
// Access code is stored hashed in localStorage. Default: bravura2024
const DEFAULT_CODE = 'bravura2024';
let currentUser = null;

function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return String(h);
}

function getStoredHash() {
  return localStorage.getItem('bravura_code_hash') || hashCode(DEFAULT_CODE);
}

function attemptLogin() {
  const name = document.getElementById('loginName').value.trim();
  const code = document.getElementById('loginCode').value;
  const err = document.getElementById('loginError');

  if (!name) { err.textContent = 'Please enter your name.'; err.style.display = 'block'; return; }
  if (hashCode(code) !== getStoredHash()) { err.style.display = 'block'; err.textContent = 'Incorrect access code. Try again.'; return; }

  err.style.display = 'none';
  currentUser = name;
  localStorage.setItem('bravura_session', JSON.stringify({ name, ts: Date.now() }));
  document.getElementById('loginScreen').classList.add('hidden');
  initDashboard();
  initOneSignal(name);
  setTimeout(checkAndNotifyNewTasks, 1500);
}

async function initOneSignal(username) {
  try {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    OneSignalDeferred.push(async function(OneSignal) {
      await OneSignal.init({
        appId: '7aa214c5-eab1-475b-abb8-8e213bed128a',
        serviceWorkerParam: { scope: '/' },
        notifyButton: { enable: false },
      });
      // Tag this device with the username so we can target them
      await OneSignal.User.addTag('username', username.toLowerCase().trim());
    });
  } catch(e) { console.log('OneSignal init error:', e); }
}

async function sendPushNotification(assignedTo, taskTitle) {
  try {
    await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic os_v2_app_pkrbjrpkwfdvxk5yryqtx3isrlnwpdze5wsur7ecwymzscqmry2n3cfsbra2icxpmhmjpvfjpgdwl32nmw5prkarqbbbo6hbnhql57i'
      },
      body: JSON.stringify({
        app_id: '7aa214c5-eab1-475b-abb8-8e213bed128a',
        filters: [{ field: 'tag', key: 'username', relation: '=', value: assignedTo.toLowerCase().trim() }],
        headings: { en: 'New Task Assigned' },
        contents: { en: `${currentUser} assigned you: ${taskTitle}` },
      })
    });
  } catch(e) { console.log('Push notification error:', e); }
}

function logout() {
  localStorage.removeItem('bravura_session');
  currentUser = null;
  location.reload();
}

function changeAccessCode() {
  const oldCode = document.getElementById('f-old-code').value;
  const newCode = document.getElementById('f-new-code').value;
  const confirm = document.getElementById('f-confirm-code').value;
  const errEl = document.getElementById('codeChangeError');

  if (hashCode(oldCode) !== getStoredHash()) { errEl.textContent = 'Current code is incorrect.'; errEl.style.display = 'block'; return; }
  if (newCode.length < 6) { errEl.textContent = 'New code must be at least 6 characters.'; errEl.style.display = 'block'; return; }
  if (newCode !== confirm) { errEl.textContent = 'New codes do not match.'; errEl.style.display = 'block'; return; }

  localStorage.setItem('bravura_code_hash', hashCode(newCode));
  document.getElementById('codeModalOverlay').classList.remove('open');
  errEl.style.display = 'none';
  alert('✓ Access code updated. Share the new code with your team.');
}

// ── Session check on load ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const session = localStorage.getItem('bravura_session');
  if (session) {
    try {
      const s = JSON.parse(session);
      if (Date.now() - s.ts < 7 * 24 * 60 * 60 * 1000) {
        currentUser = s.name;
        document.getElementById('loginScreen').classList.add('hidden');
        initDashboard();
        return;
      }
    } catch(e) {}
  }
  // Show login
  document.getElementById('loginCode').addEventListener('keydown', e => { if (e.key === 'Enter') attemptLogin(); });
});

// ── DB helpers (Firebase Realtime Database REST API) ─────────
const cache = {};

async function dbGet(key, cb) {
  try {
    const res = await fetch(`${FB_URL}/${key}.json`);
    const data = await res.json() || {};
    cache[key] = data;
    cb(Object.values(data).filter(Boolean));
  } catch(e) {
    cb(Object.values(cache[key] || {}).filter(Boolean));
  }
}

async function dbPut(key, item) {
  if (!cache[key]) cache[key] = {};
  cache[key][item.id] = item; // instant local update
  refreshSection(key); renderOverview();
  showSync('syncing');
  try {
    await fetch(`${FB_URL}/${key}/${item.id}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    showSync('synced');
  } catch(e) { showSync('offline'); }
}

async function dbDelete(key, id) {
  if (cache[key]) delete cache[key][id];
  refreshSection(key); renderOverview();
  showSync('syncing');
  try {
    await fetch(`${FB_URL}/${key}/${id}.json`, { method: 'DELETE' });
    showSync('synced');
  } catch(e) { showSync('offline'); }
}

function showSync(state) {
  const dot = document.getElementById('syncDot');
  const label = document.getElementById('syncLabel');
  if (!dot) return;
  dot.className = 'sync-dot ' + (state === 'synced' ? 'synced' : state === 'offline' ? 'offline' : '');
  label.textContent = state === 'synced' ? 'Synced' : state === 'offline' ? 'Offline' : 'Syncing…';
}

// ── State ────────────────────────────────────────────────────
let currentSection = 'overview';
let calDate = new Date();
let modalSaveFn = null;
let activeCatFilter = 'all';

// ── Init ─────────────────────────────────────────────────────
function initDashboard() {
  updateGreeting();
  setupNav();
  setupTopbar();
  setupModal();
  addSyncIndicator();
  applyRoleNav();
  subscribeAll();
  requestNotificationPermission();
  // Render static sections immediately (don't wait for Gun data)
  renderMedia('sites');
  renderOverview();
  renderMeetings();
}

function applyRoleNav() {
  const amita = isAmita();
  document.querySelectorAll('.nav-item.amita-only').forEach(el => {
    el.style.display = amita ? '' : 'none';
  });
}

function addSyncIndicator() {
  const el = document.createElement('div');
  el.className = 'sync-status';
  el.innerHTML = `<span class="sync-dot" id="syncDot"></span><span id="syncLabel">Connecting…</span>`;
  document.querySelector('.topbar-right').prepend(el);

  // Update sidebar user info
  const isFounder = /amita/i.test(currentUser);
  document.getElementById('sidebarName').textContent = currentUser;
  document.getElementById('sidebarRole').textContent = isFounder ? 'Founder & CDO' : 'Team Member';
  document.getElementById('sidebarAvatar').textContent = initials(currentUser);

  // Check connectivity
  setTimeout(() => showSync(navigator.onLine ? 'synced' : 'offline'), 2000);
  window.addEventListener('online', () => showSync('synced'));
  window.addEventListener('offline', () => showSync('offline'));
}

const ALL_KEYS = ['todos','events','media','projects','clients','speaking','awards','assets','passwords','meetings','team'];

async function subscribeAll() {
  await syncAll();
  // Poll for changes every 5 seconds
  setInterval(syncAll, POLL_MS);
}

async function syncAll() {
  for (const key of ALL_KEYS) {
    try {
      const res = await fetch(`${FB_URL}/${key}.json`);
      if (!res.ok) continue;
      const data = await res.json() || {};
      const changed = JSON.stringify(cache[key]) !== JSON.stringify(data);
      if (changed) {
        cache[key] = data;
        refreshSection(key);
        renderOverview();
        updateTaskBadge();
      }
    } catch(e) { /* offline — keep local cache */ }
  }
  showSync('synced');
}

function getItems(key) {
  return Object.values(cache[key] || {}).filter(Boolean).filter(i => i && i.id);
}

function refreshSection(key) {
  const map = {
    todos: () => renderTodos(getActiveFilter('section-todos')),
    events: renderCalendar,
    media: () => renderMedia(getActiveFilter('section-media')),
    projects: () => renderProjects(getActiveFilter('section-projects')),
    clients: () => renderClients(getActiveFilter('section-clients')),
    speaking: () => renderSpeaking(getActiveFilter('section-speaking')),
    awards: () => renderAwards(getActiveFilter('section-awards')),
    assets: renderAssets,
    passwords: renderPasswords,
    meetings: () => renderMeetings(getActiveFilter('section-meetings')),
    team: renderTeam,
  };
  if (map[key]) map[key]();
}

// ── Navigation ───────────────────────────────────────────────
function setupNav() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      switchSection(btn.dataset.section);
      document.getElementById('sidebar').classList.remove('open');
    });
  });
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => switchSection(btn.dataset.goto));
  });
  document.getElementById('menuToggle').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible', sidebar.classList.contains('open'));
  });
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('visible');
}

function switchSection(sec) {
  closeSidebar();
  currentSection = sec;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + sec).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.section === sec));
  const titles = {
    overview:'Overview', todos:'To-Dos', meetings:'Meetings', calendar:'Content Calendar',
    media:'Media Vault', projects:'Project Archive', clients:'Client CRM',
    speaking:'Speaking & Press', awards:'Awards Tracker', assets:'Digital Assets',
    passwords:'Passwords', team:'Team Members'
  };
  document.getElementById('pageTitle').textContent = titles[sec] || sec;
}

// ── Topbar ───────────────────────────────────────────────────
function setupTopbar() {
  document.getElementById('dateDisplay').textContent = new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  document.getElementById('addBtn').addEventListener('click', () => {
    const actions = { overview:openTodoModal, todos:openTodoModal, meetings:openMeetingModal, calendar:openEventModal,
      media:openMediaModal, projects:openProjectModal, clients:openClientModal,
      speaking:openSpeakingModal, awards:openAwardModal, assets:openAssetModal, passwords:openPasswordModal,
      team:openAddMemberModal };
    (actions[currentSection] || openTodoModal)();
  });
}

// ── Greeting ─────────────────────────────────────────────────
function updateGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('greeting').textContent = `${g}, ${currentUser || 'Amita'}`;
  document.getElementById('metric-years').textContent = new Date().getFullYear() - 1997;
}

// ── Overview ─────────────────────────────────────────────────
function renderOverview() {
  const todos = getItems('todos').filter(t => !t.done);
  const events = getItems('events');
  const projects = getItems('projects').filter(p => p.status === 'active');

  document.getElementById('stat-todos').textContent = todos.length;
  document.getElementById('stat-projects').textContent = projects.length;

  const now = new Date(); now.setHours(0,0,0,0);
  const upcoming = events.filter(e => new Date(e.date) >= now).sort((a,b) => new Date(a.date)-new Date(b.date));
  document.getElementById('stat-events').textContent = upcoming.length;

  setMiniList('overview-todos', todos.slice(0,4), t => `<div class="mini-item"><div class="dot"></div><span>${esc(t.title)}</span></div>`);
  setMiniList('overview-events', upcoming.slice(0,4), e => `<div class="mini-item"><div class="dot"></div><span>${esc(e.title)} — ${fmtDate(e.date)}</span></div>`);
  setMiniList('overview-projects', projects.slice(0,4), p => `<div class="mini-item"><div class="dot"></div><span>${esc(p.name)}${p.client?' · '+esc(p.client):''}</span></div>`);
  const speaking = getItems('speaking').slice(0,4);
  setMiniList('overview-speaking', speaking, s => `<div class="mini-item"><div class="dot"></div><span>${esc(s.title)} — ${esc(s.org||'')}</span></div>`);
}

function setMiniList(id, arr, fn) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = arr.length ? arr.map(fn).join('') : '<div class="empty-state">Nothing here yet</div>';
}

// ── To-Dos ───────────────────────────────────────────────────
function renderTodos(filter='all', search='') {
  let todos = getItems('todos').sort((a,b) => (b.createdAt||'').localeCompare(a.createdAt||''));
  if (filter === 'today') { const t = new Date().toISOString().split('T')[0]; todos = todos.filter(t2 => t2.dueDate === t); }
  else if (filter === 'pending') todos = todos.filter(t => !t.done);
  else if (filter === 'done') todos = todos.filter(t => t.done);
  else if (filter === 'mine') todos = todos.filter(t => (t.assignedTo||'').toLowerCase() === (currentUser||'').toLowerCase());
  if (search) todos = todos.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  const list = document.getElementById('todo-list');
  if (!list) return;
  if (!todos.length) { list.innerHTML = '<div class="empty-state full">No tasks found</div>'; return; }

  list.innerHTML = todos.map(t => {
    const isForMe = (t.assignedTo||'').toLowerCase() === (currentUser||'').toLowerCase();
    const assignedByMe = (t.addedBy||'').toLowerCase() === (currentUser||'').toLowerCase()
      && t.assignedTo && t.assignedTo.toLowerCase() !== (currentUser||'').toLowerCase();
    const assignBadge = assignedByMe
      ? `<span class="task-badge assigned-out">→ ${esc(t.assignedTo)}</span>`
      : (isForMe && t.addedBy && t.addedBy.toLowerCase() !== (currentUser||'').toLowerCase())
        ? `<span class="task-badge assigned-in">From ${esc(t.addedBy)}</span>`
        : '';
    return `
    <div class="todo-item${isForMe && !t.done ? ' task-mine' : ''}">
      <div class="todo-check ${t.done?'checked':''}" onclick="toggleTodo('${t.id}')"></div>
      <div class="todo-body">
        <div class="todo-title ${t.done?'done':''}">${esc(t.title)} ${assignBadge}</div>
        <div class="todo-meta">${t.dueDate?'📅 '+fmtDate(t.dueDate):''}${t.category?' &nbsp;·&nbsp; '+t.category:''}</div>
      </div>
      ${t.priority?`<span class="priority-badge priority-${t.priority}">${t.priority}</span>`:''}
      <div class="todo-actions">
        <button class="icon-btn" onclick="deleteItem('todos','${t.id}')" title="Delete"><svg viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg></button>
      </div>
    </div>`;
  }).join('');

  setupFilterTabs('todos', f => renderTodos(f, document.getElementById('todoSearch')?.value||''));
  const s = document.getElementById('todoSearch');
  if (s && !s.dataset.bound) { s.dataset.bound = '1'; s.addEventListener('input', e => renderTodos(getActiveFilter('section-todos'), e.target.value)); }
  updateTaskBadge();
}

function updateTaskBadge() {
  const count = getNewTasksForMe().length;
  const navItem = document.querySelector('[data-goto="todos"]');
  if (!navItem) return;
  let badge = navItem.querySelector('.task-count-badge');
  if (count > 0) {
    if (!badge) { badge = document.createElement('span'); badge.className = 'task-count-badge'; navItem.appendChild(badge); }
    badge.textContent = count;
  } else if (badge) {
    badge.remove();
  }
}

function getNewTasksForMe() {
  const lastSeen = parseInt(localStorage.getItem('bravura_last_seen_tasks') || '0');
  return getItems('todos').filter(t => {
    const forMe = (t.assignedTo||'').toLowerCase() === (currentUser||'').toLowerCase();
    const notByMe = (t.addedBy||'').toLowerCase() !== (currentUser||'').toLowerCase();
    const isNew = new Date(t.createdAt||0).getTime() > lastSeen;
    return forMe && notByMe && !t.done && isNew;
  });
}

function checkAndNotifyNewTasks() {
  const newTasks = getNewTasksForMe();
  if (!newTasks.length) return;
  showToast(`📋 You have ${newTasks.length} new task${newTasks.length>1?'s':''} assigned to you`, 6000);
  if (Notification.permission === 'granted') {
    new Notification('Bravura Dashboard', { body: `You have ${newTasks.length} new task${newTasks.length>1?'s':''} assigned to you`, icon: 'icon-192.png' });
  }
  localStorage.setItem('bravura_last_seen_tasks', Date.now().toString());
}

function toggleTodo(id) {
  const t = (cache['todos']||{})[id];
  if (t) dbPut('todos', { ...t, done: !t.done });
}

function getTeamMembers() {
  return getItems('team').sort((a,b) => (a.name||'').localeCompare(b.name||''));
}

function openTodoModal() {
  const members = getTeamMembers();
  const assignOptions = isAmita()
    ? members.map(m => `<option value="${esc(m.name)}">${esc(m.name)}${m.role ? ' — ' + esc(m.role) : ''}</option>`).join('')
    : '';
  const assignField = isAmita() ? `
    <div class="form-group"><label>Assign To</label>
      <select id="f-assign">
        <option value="">Myself (Amita)</option>
        ${assignOptions}
      </select>
    </div>` : '';

  openModal('Add To-Do', `
    <div class="form-group"><label>Task *</label><input id="f-title" placeholder="What needs to be done?"/></div>
    <div class="form-row">
      <div class="form-group"><label>Due Date</label><input type="date" id="f-due"/></div>
      <div class="form-group"><label>Priority</label>
        <select id="f-priority"><option value="">None</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
      </div>
    </div>
    ${assignField}
    <div class="form-group"><label>Notes</label><textarea id="f-notes" placeholder="Any additional notes..."></textarea></div>
  `, () => {
    const title = v('f-title'); if (!title) return alert('Task title is required');
    const assignedTo = (v('f-assign') || '').trim() || currentUser;
    dbPut('todos', { id:uid(), title, dueDate:v('f-due'), priority:v('f-priority'), notes:v('f-notes'), done:false, createdAt:new Date().toISOString(), addedBy:currentUser, assignedTo });
    // Send push notification if assigning to someone else
    if (assignedTo.toLowerCase() !== currentUser.toLowerCase()) {
      sendPushNotification(assignedTo, title);
    }
    closeModal();
    scheduleReminder(title, v('f-due'));
  });
}

// ── Meetings ─────────────────────────────────────────────────
function renderMeetings(filter='upcoming') {
  const list = document.getElementById('meeting-list');
  if (!list) return;
  const today = new Date().toISOString().split('T')[0];
  let meetings = getItems('meetings').sort((a,b) => {
    const da = (a.date||'') + (a.time||'');
    const db = (b.date||'') + (b.time||'');
    return da.localeCompare(db);
  });
  if (filter === 'upcoming') meetings = meetings.filter(m => (m.date||'') >= today);
  else if (filter === 'past') meetings = meetings.filter(m => (m.date||'') < today);

  setupFilterTabs('meetings', f => renderMeetings(f));

  if (!meetings.length) {
    list.innerHTML = '<div class="empty-state full">No meetings yet</div>';
    return;
  }

  list.innerHTML = meetings.map(m => {
    const platformIcon = { zoom:'🎥', meet:'📹', teams:'💼', phone:'📞', inperson:'🤝' }[m.platform||''] || '📅';
    const linkHtml = m.videoLink
      ? `<a class="meeting-link-btn" href="${esc(m.videoLink)}" target="_blank">${platformIcon} Join ${m.platform==='zoom'?'Zoom':m.platform==='meet'?'Meet':m.platform==='teams'?'Teams':'Call'}</a>`
      : '';
    const isPast = (m.date||'') < today;
    return `
    <div class="meeting-card${isPast?' meeting-past':''}">
      <div class="meeting-date-col">
        <div class="meeting-day">${m.date ? new Date(m.date+'T12:00:00').toLocaleDateString('en-IN',{day:'numeric'}) : '—'}</div>
        <div class="meeting-month">${m.date ? new Date(m.date+'T12:00:00').toLocaleDateString('en-IN',{month:'short'}) : ''}</div>
      </div>
      <div class="meeting-body">
        <div class="meeting-title">${esc(m.title||'Untitled')}</div>
        <div class="meeting-meta">
          ${m.with ? `<span>👤 ${esc(m.with)}</span>` : ''}
          ${m.time ? `<span>🕐 ${fmtTime(m.time)}</span>` : ''}
          ${m.platform ? `<span>${platformIcon} ${esc(m.platform.charAt(0).toUpperCase()+m.platform.slice(1))}</span>` : ''}
        </div>
        ${m.notes ? `<div class="meeting-notes">${esc(m.notes)}</div>` : ''}
        ${linkHtml}
      </div>
      <div class="meeting-actions">
        <button class="icon-btn" onclick="deleteItem('meetings','${m.id}')" title="Delete"><svg viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg></button>
      </div>
    </div>`;
  }).join('');
}

function fmtTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h%12||12}:${String(m).padStart(2,'0')} ${ampm}`;
}

function generateVideoLink(platform, title) {
  if (platform === 'zoom') {
    const stored = localStorage.getItem('bravura_zoom_link');
    if (stored) return stored;
    return null;
  }
  if (platform === 'meet') {
    const slug = (title||'bravura').toLowerCase().replace(/[^a-z0-9]/g,'-').replace(/-+/g,'-').slice(0,20);
    const rand = Math.random().toString(36).slice(2,5);
    return `https://meet.jit.si/bravura-${slug}-${rand}`;
  }
  return null;
}

function openMeetingModal() {
  const zoomStored = localStorage.getItem('bravura_zoom_link') || '';
  openModal('Schedule Meeting', `
    <div class="form-group"><label>Meeting Title *</label><input id="f-mtitle" placeholder="e.g. Client Review — Sharma Residence"/></div>
    <div class="form-row">
      <div class="form-group"><label>Date *</label><input type="date" id="f-mdate"/></div>
      <div class="form-group"><label>Time</label><input type="time" id="f-mtime"/></div>
    </div>
    <div class="form-group"><label>With (person / company)</label><input id="f-mwith" placeholder="e.g. Priya Sharma, Oberoi Hotels"/></div>
    <div class="form-group"><label>Platform</label>
      <select id="f-mplatform" onchange="onMeetingPlatformChange()">
        <option value="">In Person</option>
        <option value="zoom">Zoom</option>
        <option value="meet">Google Meet / Jitsi</option>
        <option value="teams">Microsoft Teams</option>
        <option value="phone">Phone Call</option>
        <option value="inperson">In Person</option>
      </select>
    </div>
    <div id="f-zoom-row" style="display:none" class="form-group">
      <label>Your Zoom Personal Link <span style="font-size:11px;color:var(--mid)">(saved for future meetings)</span></label>
      <input id="f-zoom-link" placeholder="https://zoom.us/j/your-meeting-id" value="${esc(zoomStored)}"/>
    </div>
    <div id="f-meet-info" style="display:none" class="form-hint">A unique video link will be created automatically.</div>
    <div class="form-group"><label>Notes</label><textarea id="f-mnotes" placeholder="Agenda, prep notes, follow-up…"></textarea></div>
  `, () => {
    const title = v('f-mtitle'); if (!title) return alert('Meeting title is required');
    const date = v('f-mdate'); if (!date) return alert('Date is required');
    const platform = v('f-mplatform');
    let videoLink = null;
    if (platform === 'zoom') {
      const zl = v('f-zoom-link').trim();
      if (zl) { localStorage.setItem('bravura_zoom_link', zl); videoLink = zl; }
    } else if (platform === 'meet') {
      videoLink = generateVideoLink('meet', title);
    }
    dbPut('meetings', { id:uid(), title, date, time:v('f-mtime'), with:v('f-mwith'), platform, videoLink, notes:v('f-mnotes'), createdAt:new Date().toISOString(), addedBy:currentUser });
    closeModal();
  });
  // Set today as default date
  setTimeout(() => { const d = document.getElementById('f-mdate'); if (d && !d.value) d.value = new Date().toISOString().split('T')[0]; }, 50);
}

function onMeetingPlatformChange() {
  const p = document.getElementById('f-mplatform')?.value;
  const zr = document.getElementById('f-zoom-row');
  const mi = document.getElementById('f-meet-info');
  if (zr) zr.style.display = p === 'zoom' ? '' : 'none';
  if (mi) mi.style.display = p === 'meet' ? '' : 'none';
}

// ── Team ─────────────────────────────────────────────────────
function renderTeam() {
  const list = document.getElementById('team-list');
  if (!list) return;
  const members = getTeamMembers();
  if (!members.length) {
    list.innerHTML = '<div class="empty-state full">No team members yet. Add someone to get started.</div>';
    return;
  }
  list.innerHTML = members.map(m => `
    <div class="team-card">
      <div class="team-avatar">${initials(m.name)}</div>
      <div class="team-info">
        <div class="team-name">${esc(m.name)}</div>
        ${m.role ? `<div class="team-role">${esc(m.role)}</div>` : ''}
      </div>
      <button class="btn btn-ghost btn-sm" onclick="removeMember('${m.id}')">Remove</button>
    </div>`).join('');
}

function openAddMemberModal() {
  openModal('Add Team Member', `
    <div class="form-group"><label>Name *</label><input id="f-mname" placeholder="e.g. Priya, Rahul…"/></div>
    <div class="form-group"><label>Role / Title</label><input id="f-mrole" placeholder="e.g. Junior Designer, Intern…"/></div>
  `, () => {
    const name = v('f-mname').trim(); if (!name) return alert('Name is required');
    dbPut('team', { id:uid(), name, role:v('f-mrole').trim(), addedAt:new Date().toISOString() });
    closeModal();
  });
}

function removeMember(id) {
  if (!isAmita()) return;
  if (!confirm('Remove this team member? They will no longer appear in the assign list.')) return;
  deleteItem('team', id);
}

// ── Calendar ─────────────────────────────────────────────────
function renderCalendar() {
  const events = getItems('events');
  const y = calDate.getFullYear(), m = calDate.getMonth();
  document.getElementById('calMonthYear').textContent = calDate.toLocaleDateString('en-IN', { month:'long', year:'numeric' });

  const firstDay = new Date(y,m,1).getDay();
  const daysInMonth = new Date(y,m+1,0).getDate();
  const prevDays = new Date(y,m,0).getDate();
  const today = new Date();

  let html = '';
  for (let i = firstDay-1; i >= 0; i--) html += `<div class="cal-cell other-month"><div class="cal-date">${prevDays-i}</div></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = today.getDate()===d && today.getMonth()===m && today.getFullYear()===y;
    const dayEvents = events.filter(e => e.date === dateStr);
    const dots = dayEvents.slice(0,3).map(e => `<div class="cal-event-dot type-${e.type||'reminder'}">${esc(e.title.substring(0,14))}</div>`).join('');
    html += `<div class="cal-cell ${isToday?'today':''}" onclick="openEventModal('${dateStr}')"><div class="cal-date">${d}</div>${dots}</div>`;
  }
  const rem = 42 - firstDay - daysInMonth;
  for (let d = 1; d <= rem; d++) html += `<div class="cal-cell other-month"><div class="cal-date">${d}</div></div>`;
  document.getElementById('calDays').innerHTML = html;

  document.getElementById('prevMonth').onclick = () => { calDate.setMonth(calDate.getMonth()-1); renderCalendar(); };
  document.getElementById('nextMonth').onclick = () => { calDate.setMonth(calDate.getMonth()+1); renderCalendar(); };

  const now = new Date(); now.setHours(0,0,0,0);
  const upcoming = events.filter(e => new Date(e.date)>=now).sort((a,b)=>new Date(a.date)-new Date(b.date));
  const eList = document.getElementById('event-list');
  if (!upcoming.length) { eList.innerHTML = '<div class="empty-state">No upcoming events</div>'; return; }
  eList.innerHTML = upcoming.map(e => `
    <div class="event-item">
      <div class="event-type">${e.type||'reminder'}</div>
      <div class="event-title">${esc(e.title)}</div>
      <div class="event-date">${fmtDate(e.date)}${e.time?' at '+e.time:''}</div>
      ${e.notes?`<div class="event-date" style="font-style:italic;margin-top:4px">${esc(e.notes)}</div>`:''}
      <button class="icon-btn" style="margin-top:6px" onclick="deleteItem('events','${e.id}')" title="Remove">✕ Remove</button>
    </div>`).join('');
}

function openEventModal(dateStr='') {
  openModal('Add Event / Content', `
    <div class="form-group"><label>Title *</label><input id="f-title" placeholder="Event or content title..."/></div>
    <div class="form-row">
      <div class="form-group"><label>Date *</label><input type="date" id="f-date" value="${dateStr}"/></div>
      <div class="form-group"><label>Time</label><input type="time" id="f-time"/></div>
    </div>
    <div class="form-group"><label>Type</label>
      <select id="f-type">
        <option value="reminder">Reminder</option><option value="instagram">Instagram Post</option>
        <option value="blog">Blog / Article</option><option value="event">Event / Appearance</option>
        <option value="meeting">Client Meeting</option><option value="deadline">Deadline</option>
      </select>
    </div>
    <div class="form-group"><label>Notes</label><textarea id="f-notes" placeholder="Details, caption ideas, links..."></textarea></div>
  `, () => {
    const title = v('f-title'), date = v('f-date');
    if (!title || !date) return alert('Title and date are required');
    dbPut('events', { id:uid(), title, date, time:v('f-time'), type:v('f-type'), notes:v('f-notes'), addedBy:currentUser });
    closeModal();
    scheduleReminder(title, date, v('f-time'));
  });
}

// ── Media ─────────────────────────────────────────────────────
let currentMediaFilter = 'sites';

function renderMedia(filter) {
  if (filter !== undefined) currentMediaFilter = filter;

  const sitesView = document.getElementById('sites-view');
  const grid = document.getElementById('media-grid');
  const addWrap = document.getElementById('media-add-btn-wrap');

  // Show/hide correct view
  const isSites = currentMediaFilter === 'sites';
  if (sitesView) sitesView.style.display = isSites ? 'flex' : 'none';
  if (grid) grid.style.display = isSites ? 'none' : 'grid';

  // Add button — only Amita can add
  if (addWrap) {
    if (isAmita()) {
      addWrap.innerHTML = `<button class="add-btn" onclick="openMediaModal()" style="font-size:12px;padding:7px 14px">+ Add File</button>`;
    } else {
      addWrap.innerHTML = `<div class="permission-lock"><svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg> Only Amita can add or remove files</div>`;
    }
  }

  if (isSites) {
    renderSitesView();
  } else {
    renderMediaGrid();
  }

  setupFilterTabs('media', renderMedia);
}

function renderSitesView() {
  const el = document.getElementById('sites-view');
  if (!el) return;

  el.innerHTML = SITES.map((site, si) => {
    const clientsHtml = site.clients.map((c, ci) => {
      const driveUrl = `https://drive.google.com/drive/folders/${c.id}`;
      // Drive embedded folder viewer — shows actual photo thumbnails
      const embedUrl = `https://drive.google.com/embeddedfolderview?id=${c.id}#grid`;
      return `<div class="site-subfolder-wrap">
        <div class="site-subfolder" onclick="toggleClientPhotos(${si},${ci})">
          <div class="site-subfolder-icon">👤</div>
          <div class="site-subfolder-body">
            <div class="site-subfolder-name">${esc(c.name)}</div>
            <div class="site-subfolder-meta">Click to view photos</div>
          </div>
          <div class="site-subfolder-actions">
            <a href="${driveUrl}" target="_blank" class="btn-drive" onclick="event.stopPropagation()">↗ Drive</a>
          </div>
          <div class="site-project-toggle" id="client-toggle-${si}-${ci}" style="color:var(--gold);font-size:16px;margin-left:8px">›</div>
        </div>
        <div class="client-photo-viewer" id="client-photos-${si}-${ci}" style="display:none">
          <div class="drive-embed-wrap">
            <iframe
              src="${embedUrl}"
              class="drive-embed-frame"
              frameborder="0"
              allowfullscreen
              loading="lazy"
              title="${esc(c.name)} photos"
            ></iframe>
            <div class="embed-overlay-btn">
              <a href="${driveUrl}" target="_blank" class="btn-drive">📁 Open full folder in Drive</a>
            </div>
          </div>
        </div>
      </div>`;
    }).join('');

    const projectUrl = `https://drive.google.com/drive/folders/${site.id}`;
    const clientCount = site.clients.length;

    return `<div class="site-project" id="site-${si}">
      <div class="site-project-header" onclick="toggleSite(${si})">
        <div class="site-project-icon">${site.icon}</div>
        <div class="site-project-name">${esc(site.name)}</div>
        <div class="site-project-meta">${clientCount} client${clientCount!==1?'s':''}</div>
        <a href="${projectUrl}" target="_blank" class="site-drive-link" onclick="event.stopPropagation()">Open Folder ↗</a>
        <div class="site-project-toggle">›</div>
      </div>
      <div class="site-subfolders">${clientsHtml}</div>
    </div>`;
  }).join('');
}

function toggleSite(idx) {
  const el = document.getElementById('site-' + idx);
  if (el) el.classList.toggle('open');
}

function toggleClientPhotos(si, ci) {
  const viewer = document.getElementById(`client-photos-${si}-${ci}`);
  const toggle = document.getElementById(`client-toggle-${si}-${ci}`);
  if (!viewer) return;
  const isOpen = viewer.style.display !== 'none';
  viewer.style.display = isOpen ? 'none' : 'block';
  if (toggle) toggle.style.transform = isOpen ? '' : 'rotate(90deg)';
}

function renderMediaGrid() {
  let media = getItems('media');
  const filter = currentMediaFilter;
  if (filter !== 'all') media = media.filter(m => m.type === filter);
  const grid = document.getElementById('media-grid');
  if (!grid) return;
  if (!media.length) { grid.innerHTML = '<div class="empty-state full">No media files yet</div>'; return; }
  const icons = { photo:'📷', video:'🎬', document:'📄', other:'📁' };
  grid.innerHTML = media.map(m => {
    const deleteBtn = isAmita() ? `<button class="icon-btn" onclick="deleteItem('media','${m.id}')" style="display:block;margin-top:6px" title="Delete">✕ Remove</button>` : '';
    return `<div class="media-card">
      <div class="media-thumb">${icons[m.type]||'📁'}</div>
      <div class="media-info">
        <div class="media-tag">${m.type||'file'}</div>
        <div class="media-name">${esc(m.name)}</div>
        <div class="media-meta">${m.project||''}${m.date?' · '+fmtDate(m.date):''}</div>
        ${m.url?`<a href="${m.url}" target="_blank" style="font-size:11px;color:var(--gold-dark)">Open ↗</a>`:''}
        ${deleteBtn}
      </div>
    </div>`;
  }).join('');
}

function openMediaModal() {
  if (!isAmita()) return alert('Only Amita can add files.');
  openModal('Add Media File', `
    <div class="form-group"><label>Name *</label><input id="f-name" placeholder="File name or description"/></div>
    <div class="form-row">
      <div class="form-group"><label>Type</label><select id="f-type"><option value="photo">Photo</option><option value="video">Video</option><option value="document">Document</option><option value="other">Other</option></select></div>
      <div class="form-group"><label>Date</label><input type="date" id="f-date"/></div>
    </div>
    <div class="form-group"><label>Link / URL</label><input id="f-url" placeholder="Google Drive, Dropbox, etc."/></div>
    <div class="form-group"><label>Associated Project</label><input id="f-project" placeholder="Project name"/></div>
    <div class="form-group"><label>Notes</label><textarea id="f-notes" placeholder="Tags, context..."></textarea></div>
  `, () => {
    const name = v('f-name'); if (!name) return alert('Name is required');
    dbPut('media', { id:uid(), name, type:v('f-type'), date:v('f-date'), url:v('f-url'), project:v('f-project'), notes:v('f-notes'), addedBy:currentUser });
    closeModal();
  });
}

// ── Projects ──────────────────────────────────────────────────
function renderProjects(filter='all') {
  let projects = getItems('projects');
  if (filter !== 'all') projects = projects.filter(p => p.status === filter);
  const list = document.getElementById('project-list');
  if (!list) return;
  if (!projects.length) { list.innerHTML = '<div class="empty-state full">No projects found</div>'; return; }
  const colors = { active:'#27AE60', completed:'#3730A3', 'on-hold':'#F59E0B' };
  list.innerHTML = projects.map(p => `
    <div class="project-card">
      <div class="project-color" style="background:${colors[p.status]||'var(--gold)'}"></div>
      <div class="project-body">
        <div class="project-name">${esc(p.name)}</div>
        <div class="project-client">${p.client?'👤 '+esc(p.client):''}${p.city?' · 📍 '+esc(p.city):''}</div>
        <div class="project-meta">${p.startDate?'Started '+fmtDate(p.startDate):''}${p.budget?' · Budget: ₹'+esc(p.budget):''}</div>
        ${p.notes?`<div class="project-meta" style="font-style:italic;margin-top:4px">${esc(p.notes)}</div>`:''}
      </div>
      <span class="status-badge status-${p.status}">${p.status}</span>
      <button class="icon-btn" onclick="deleteItem('projects','${p.id}')" title="Delete"><svg viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg></button>
    </div>`).join('');
  setupFilterTabs('projects', renderProjects);
}

function openProjectModal() {
  openModal('Add Project', `
    <div class="form-group"><label>Project Name *</label><input id="f-name" placeholder="e.g. Sharma Residence — Living Room"/></div>
    <div class="form-row">
      <div class="form-group"><label>Client Name</label><input id="f-client"/></div>
      <div class="form-group"><label>City</label><input id="f-city" placeholder="e.g. Noida"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Status</label><select id="f-status"><option value="active">Active</option><option value="completed">Completed</option><option value="on-hold">On Hold</option></select></div>
      <div class="form-group"><label>Start Date</label><input type="date" id="f-start"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Budget (₹)</label><input id="f-budget" placeholder="e.g. 25,00,000"/></div>
      <div class="form-group"><label>End Date</label><input type="date" id="f-end"/></div>
    </div>
    <div class="form-group"><label>Service Type</label>
      <select id="f-service"><option value="">Select...</option><option>Turnkey Design & Build</option><option>Functional Decor</option><option>Bespoke Furniture</option><option>Kitchen & Closets</option><option>Hospitality Design</option></select>
    </div>
    <div class="form-group"><label>Notes</label><textarea id="f-notes" placeholder="Brief, links, special requirements..."></textarea></div>
  `, () => {
    const name = v('f-name'); if (!name) return alert('Project name is required');
    dbPut('projects', { id:uid(), name, client:v('f-client'), city:v('f-city'), status:v('f-status'), startDate:v('f-start'), endDate:v('f-end'), budget:v('f-budget'), service:v('f-service'), notes:v('f-notes'), addedBy:currentUser });
    closeModal();
  });
}

// ── Clients ───────────────────────────────────────────────────
function renderClients(filter='all', search='') {
  let clients = getItems('clients');
  if (filter !== 'all') clients = clients.filter(c => c.status === filter);
  if (search) clients = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const list = document.getElementById('client-list');
  if (!list) return;
  if (!clients.length) { list.innerHTML = '<div class="empty-state full">No clients found</div>'; return; }
  list.innerHTML = clients.map(c => `
    <div class="client-card">
      <div class="client-avatar">${initials(c.name)}</div>
      <div class="client-body">
        <div class="client-name">${esc(c.name)}</div>
        <div class="client-detail">${c.phone?'📞 '+esc(c.phone):''}${c.email?' · ✉️ '+esc(c.email):''}${c.city?' · 📍 '+esc(c.city):''}</div>
        ${c.project?`<div class="client-project">${esc(c.project)}</div>`:''}
        ${c.notes?`<div class="client-detail" style="font-style:italic;margin-top:4px">${esc(c.notes)}</div>`:''}
      </div>
      <span class="status-badge status-${c.status||'active'}">${c.status||'active'}</span>
      <button class="icon-btn" onclick="deleteItem('clients','${c.id}')" title="Delete"><svg viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg></button>
    </div>`).join('');
  setupFilterTabs('clients', f => renderClients(f, document.getElementById('clientSearch')?.value||''));
  const s = document.getElementById('clientSearch');
  if (s && !s.dataset.bound) { s.dataset.bound='1'; s.addEventListener('input', e => renderClients(getActiveFilter('section-clients'), e.target.value)); }
}

function openClientModal() {
  openModal('Add Client', `
    <div class="form-group"><label>Full Name *</label><input id="f-name" placeholder="Client's full name"/></div>
    <div class="form-row">
      <div class="form-group"><label>Phone</label><input id="f-phone" placeholder="+91 ..."/></div>
      <div class="form-group"><label>Email</label><input type="email" id="f-email"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>City</label><input id="f-city"/></div>
      <div class="form-group"><label>Status</label><select id="f-status"><option value="prospect">Prospect</option><option value="active">Active</option><option value="completed">Completed</option><option value="vip">VIP</option></select></div>
    </div>
    <div class="form-group"><label>Associated Project</label><input id="f-project"/></div>
    <div class="form-group"><label>Source / Referral</label><input id="f-source" placeholder="How did they find Bravura?"/></div>
    <div class="form-group"><label>Notes</label><textarea id="f-notes" placeholder="Requirements, preferences, follow-up notes..."></textarea></div>
  `, () => {
    const name = v('f-name'); if (!name) return alert('Client name is required');
    dbPut('clients', { id:uid(), name, phone:v('f-phone'), email:v('f-email'), city:v('f-city'), status:v('f-status'), project:v('f-project'), source:v('f-source'), notes:v('f-notes'), addedBy:currentUser });
    closeModal();
  });
}

// ── Speaking & Press ──────────────────────────────────────────
function renderSpeaking(filter='all') {
  let items = getItems('speaking');
  if (filter !== 'all') items = items.filter(s => s.type === filter);
  const list = document.getElementById('speaking-list');
  if (!list) return;
  if (!items.length) { list.innerHTML = '<div class="empty-state full">No entries yet</div>'; return; }
  const icons = { speaking:'🎤', press:'📰', podcast:'🎙️', panel:'👥' };
  list.innerHTML = items.map(s => `
    <div class="speaking-card">
      <div class="speaking-icon">${icons[s.type]||'🎤'}</div>
      <div class="speaking-body">
        <div class="speaking-title">${esc(s.title)}</div>
        <div class="speaking-org">${s.org||''}${s.city?' · '+s.city:''}</div>
        <div class="speaking-date">${s.date?fmtDate(s.date):''}${s.notes?' · '+esc(s.notes):''}</div>
        ${s.url?`<a href="${s.url}" target="_blank" class="speaking-link">View coverage ↗</a>`:''}
      </div>
      <button class="icon-btn" onclick="deleteItem('speaking','${s.id}')" title="Delete"><svg viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg></button>
    </div>`).join('');
  setupFilterTabs('speaking', renderSpeaking);
}

function openSpeakingModal() {
  openModal('Add Speaking / Press Entry', `
    <div class="form-group"><label>Title *</label><input id="f-title" placeholder="e.g. Talk: Future of Luxury Interiors"/></div>
    <div class="form-row">
      <div class="form-group"><label>Type</label><select id="f-type"><option value="speaking">Speaking</option><option value="press">Press</option><option value="podcast">Podcast</option><option value="panel">Panel</option></select></div>
      <div class="form-group"><label>Date</label><input type="date" id="f-date"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Organisation</label><input id="f-org" placeholder="e.g. Times of India, TEDx"/></div>
      <div class="form-group"><label>City</label><input id="f-city"/></div>
    </div>
    <div class="form-group"><label>Link</label><input id="f-url" placeholder="Article URL, video link..."/></div>
    <div class="form-group"><label>Notes</label><textarea id="f-notes"></textarea></div>
  `, () => {
    const title = v('f-title'); if (!title) return alert('Title is required');
    dbPut('speaking', { id:uid(), title, type:v('f-type'), date:v('f-date'), org:v('f-org'), city:v('f-city'), url:v('f-url'), notes:v('f-notes'), addedBy:currentUser });
    closeModal();
  });
}

// ── Awards ────────────────────────────────────────────────────
function renderAwards(filter='all') {
  let awards = getItems('awards');
  if (filter !== 'all') awards = awards.filter(a => a.status === filter);
  const list = document.getElementById('awards-list');
  if (!list) return;
  if (!awards.length) { list.innerHTML = '<div class="empty-state full">No awards yet</div>'; return; }
  list.innerHTML = awards.map(a => `
    <div class="award-card">
      <div class="award-icon">${a.status==='won'?'🏆':a.status==='nominated'?'⭐':'📝'}</div>
      <div class="award-name">${esc(a.name)}</div>
      <div class="award-org">${a.org||''}</div>
      <div class="award-year">${a.year||''}${a.category?' · '+esc(a.category):''}</div>
      <span class="status-badge status-${a.status}" style="margin-top:10px;display:inline-block">${a.status}</span><br/>
      <button class="icon-btn" style="margin-top:8px" onclick="deleteItem('awards','${a.id}')" title="Delete"><svg viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg></button>
    </div>`).join('');
  setupFilterTabs('awards', renderAwards);
}

function openAwardModal() {
  openModal('Add Award / Recognition', `
    <div class="form-group"><label>Award Name *</label><input id="f-name" placeholder="e.g. Best Luxury Interior Design Firm"/></div>
    <div class="form-row">
      <div class="form-group"><label>Organisation</label><input id="f-org"/></div>
      <div class="form-group"><label>Year</label><input id="f-year" placeholder="${new Date().getFullYear()}"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Status</label><select id="f-status"><option value="won">Won</option><option value="nominated">Nominated</option><option value="applied">Applied</option></select></div>
      <div class="form-group"><label>Category</label><input id="f-cat"/></div>
    </div>
    <div class="form-group"><label>Notes</label><textarea id="f-notes" placeholder="Submission deadline, requirements..."></textarea></div>
  `, () => {
    const name = v('f-name'); if (!name) return alert('Award name is required');
    dbPut('awards', { id:uid(), name, org:v('f-org'), year:v('f-year'), status:v('f-status'), category:v('f-cat'), notes:v('f-notes'), addedBy:currentUser });
    closeModal();
  });
}

// ── Digital Assets ─────────────────────────────────────────────
function renderAssets(catFilter) {
  if (catFilter !== undefined) activeCatFilter = catFilter;
  const assets = getItems('assets');
  ['logos','templates','photography','social','contracts','presentations'].forEach(cat => {
    const el = document.getElementById('count-'+cat);
    if (el) el.textContent = assets.filter(a => a.category === cat).length;
  });
  document.querySelectorAll('.asset-cat').forEach(el => {
    el.classList.toggle('active', el.dataset.cat === activeCatFilter || activeCatFilter === 'all');
    el.onclick = () => renderAssets(el.dataset.cat);
  });
  const filtered = activeCatFilter === 'all' ? assets : assets.filter(a => a.category === activeCatFilter);
  const list = document.getElementById('assets-list');
  if (!list) return;
  if (!filtered.length) { list.innerHTML = '<div class="empty-state full">No assets in this category</div>'; return; }
  const catIcons = { logos:'🎨', templates:'📋', photography:'📷', social:'📱', contracts:'📄', presentations:'🖼️' };
  list.innerHTML = filtered.map(a => `
    <div class="asset-row">
      <div class="asset-type-icon">${catIcons[a.category]||'📁'}</div>
      <div class="asset-body"><div class="asset-name">${esc(a.name)}</div><div class="asset-meta">${a.category||''}${a.notes?' · '+esc(a.notes):''}</div></div>
      ${a.url?`<a href="${a.url}" target="_blank" class="asset-link">Open ↗</a>`:''}
      <button class="icon-btn" onclick="deleteItem('assets','${a.id}')" title="Delete"><svg viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg></button>
    </div>`).join('');
}

function openAssetModal() {
  openModal('Add Digital Asset', `
    <div class="form-group"><label>Asset Name *</label><input id="f-name" placeholder="e.g. Bravura Logo Dark.png"/></div>
    <div class="form-group"><label>Category</label>
      <select id="f-cat"><option value="logos">Logos & Brand</option><option value="templates">Templates</option><option value="photography">Photography</option><option value="social">Social Media</option><option value="contracts">Contracts</option><option value="presentations">Presentations</option></select>
    </div>
    <div class="form-group"><label>Link / URL</label><input id="f-url" placeholder="Google Drive, Canva, Dropbox link..."/></div>
    <div class="form-group"><label>Notes</label><textarea id="f-notes" placeholder="Version, usage notes..."></textarea></div>
  `, () => {
    const name = v('f-name'); if (!name) return alert('Asset name is required');
    dbPut('assets', { id:uid(), name, category:v('f-cat'), url:v('f-url'), notes:v('f-notes'), addedBy:currentUser });
    closeModal();
  });
}

// ── Passwords ──────────────────────────────────────────────────
function renderPasswords() {
  const items = getItems('passwords');
  const list = document.getElementById('password-list');
  if (!list) return;
  if (!items.length) { list.innerHTML = '<div class="empty-state full">No entries yet</div>'; return; }
  list.innerHTML = items.map(p => `
    <div class="password-row">
      <div style="font-size:22px">${p.icon||'🔑'}</div>
      <div style="flex:1"><div class="password-platform">${esc(p.platform)}</div><div class="password-note">${esc(p.username||'')}${p.note?' · '+esc(p.note):''}</div></div>
      ${p.url?`<a href="${p.url}" target="_blank" class="password-url">Visit ↗</a>`:''}
      <button class="icon-btn" onclick="deleteItem('passwords','${p.id}')" title="Delete"><svg viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg></button>
    </div>`).join('');
}

function openPasswordModal() {
  openModal('Add Platform Access', `
    <div class="form-group"><label>Platform *</label><input id="f-platform" placeholder="e.g. Instagram, Canva, Google Drive"/></div>
    <div class="form-group"><label>Username / Email</label><input id="f-user"/></div>
    <div class="form-group"><label>Website URL</label><input id="f-url" placeholder="https://..."/></div>
    <div class="form-group"><label>Icon (emoji)</label><input id="f-icon" placeholder="📱" maxlength="2"/></div>
    <div class="form-group"><label>Note (no passwords!)</label><textarea id="f-note" placeholder="e.g. 'Password saved in 1Password vault'"></textarea></div>
  `, () => {
    const platform = v('f-platform'); if (!platform) return alert('Platform name is required');
    dbPut('passwords', { id:uid(), platform, username:v('f-user'), url:v('f-url'), icon:v('f-icon')||'🔑', note:v('f-note'), addedBy:currentUser });
    closeModal();
  });
}

// ── Delete ────────────────────────────────────────────────────
function deleteItem(key, id) {
  // Media deletes are Amita-only
  if (key === 'media' && !isAmita()) { alert('Only Amita can remove photos.'); return; }
  if (confirm('Delete this entry?')) {
    dbDelete(key, id);
    refreshSection(key);
    renderOverview();
  }
}

// ── Modal ─────────────────────────────────────────────────────
function setupModal() {
  document.getElementById('modalClose').onclick = closeModal;
  document.getElementById('modalCancel').onclick = closeModal;
  document.getElementById('modalSave').onclick = () => modalSaveFn && modalSaveFn();
  document.getElementById('modalOverlay').addEventListener('click', e => { if (e.target.id === 'modalOverlay') closeModal(); });
}

function openModal(title, bodyHtml, saveFn) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = bodyHtml;
  modalSaveFn = saveFn;
  document.getElementById('modalOverlay').classList.add('open');
  setTimeout(() => document.querySelector('#modalBody input, #modalBody textarea')?.focus(), 100);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  modalSaveFn = null;
}

// ── Helpers ───────────────────────────────────────────────────
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }
function v(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }
function esc(s) { if (!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fmtDate(d) { if (!d) return ''; try { return new Date(d+'T00:00:00').toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }); } catch { return d; } }
function initials(name) { return (name||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2); }

function setupFilterTabs(sectionKey, callback) {
  const section = document.getElementById('section-' + sectionKey);
  if (!section) return;
  section.querySelectorAll('.filter-tab').forEach(tab => {
    if (!tab.dataset.bound) {
      tab.dataset.bound = '1';
      tab.onclick = () => {
        section.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        callback(tab.dataset.filter);
      };
    }
  });
}

function getActiveFilter(sectionId) {
  const section = document.getElementById(sectionId);
  return section?.querySelector('.filter-tab.active')?.dataset.filter || 'all';
}

function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
}

function scheduleReminder(title, dateStr, time) {
  if (!dateStr || !('Notification' in window) || Notification.permission !== 'granted') return;
  const [h, mi] = (time || '09:00').split(':').map(Number);
  const target = new Date(dateStr + 'T00:00:00');
  target.setHours(h||9, mi||0, 0, 0);
  const delay = target.getTime() - Date.now();
  if (delay > 0 && delay < 7*24*60*60*1000) setTimeout(() => new Notification('Bravura Reminder', { body: title }), delay);
}
