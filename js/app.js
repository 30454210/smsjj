/**
 * EduNigeria SMS — App Utilities
 */

/* ===== TOAST ===== */
function showToast(msg, type = 'success') {
  const colors = { success:'#2E7D32', danger:'#C62828', warning:'#E65100', info:'#0277BD' };
  const icons  = { success:'check_circle', danger:'error', warning:'warning', info:'info' };

  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `
    <span class="material-icons" style="color:${colors[type]}">${icons[type]}</span>
    <span class="toast-msg">${msg}</span>
    <span class="material-icons toast-close" onclick="this.parentElement.remove()">close</span>`;
  document.body.appendChild(t);

  setTimeout(() => { if (t.parentElement) t.remove(); }, 4200);
}

/* ===== MODAL ===== */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('show');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('show');
}

/* ===== TABLE SEARCH ===== */
function filterTable(inputId, tableId) {
  const q    = document.getElementById(inputId).value.toLowerCase();
  const rows = document.querySelectorAll(`#${tableId} tbody tr`);
  rows.forEach(r => {
    r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

/* ===== PRINT ===== */
function printArea(id) {
  const content = document.getElementById(id)?.innerHTML;
  if (!content) return;
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head>
    <title>Print — EduNigeria SMS</title>
    <link rel="stylesheet" href="../../css/main.css">
    <style>body{padding:24px;}</style>
  </head><body>${content}</body></html>`);
  win.document.close();
  setTimeout(() => win.print(), 400);
}

/* ===== FORMAT HELPERS ===== */
function naira(n) { return '₦' + Number(n).toLocaleString('en-NG'); }
function fmtDate(s) { return new Date(s).toLocaleDateString('en-NG', { day:'numeric', month:'short', year:'numeric' }); }
function getInitials(name) { return name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase(); }

/* ===== AVATAR COLORS ===== */
const AVA_COLORS = ['#0D47A1','#2E7D32','#6A1B9A','#E65100','#00695C','#0277BD','#C62828','#FF8F00'];
function avaColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return AVA_COLORS[Math.abs(h) % AVA_COLORS.length];
}

/* ===== ONLINE/OFFLINE ===== */
window.addEventListener('online',  () => showToast('Connection restored — syncing data…', 'success'));
window.addEventListener('offline', () => showToast('You are offline. Data will sync when reconnected.', 'warning'));

/* ===== GRADE HELPER ===== */
function getGrade(score) {
  if (score >= 70) return { grade:'A', label:'Excellent', cls:'badge-success' };
  if (score >= 60) return { grade:'B', label:'Good',      cls:'badge-info'    };
  if (score >= 50) return { grade:'C', label:'Average',   cls:'badge-primary' };
  if (score >= 40) return { grade:'D', label:'Pass',      cls:'badge-warning' };
  return                  { grade:'F', label:'Fail',      cls:'badge-danger'  };
}

/* ===== CIRCULAR PROGRESS SVG ===== */
function circularSVG(pct, size = 80, strokeW = 8, color = '#1565C0') {
  const r   = (size - strokeW) / 2;
  const circ = 2 * Math.PI * r;
  const off  = circ * (1 - pct / 100);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#E3EAF5" stroke-width="${strokeW}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${strokeW}"
      stroke-dasharray="${circ}" stroke-dashoffset="${off}" stroke-linecap="round"
      style="transform:rotate(-90deg);transform-origin:center;transition:stroke-dashoffset 1s ease"/>
  </svg>`;
}

/* ===== SAMPLE DATA ===== */
const STUDENTS = [
  { id:'SM-2024-001', name:'Adaeze Obi',       class:'SS 2A', gender:'F', parent:'Mrs C. Obi',      fee:'paid',    att:94, status:'active' },
  { id:'SM-2024-002', name:'Emeka Chukwu',     class:'JSS 3B',gender:'M', parent:'Mr B. Chukwu',   fee:'partial', att:81, status:'active' },
  { id:'SM-2024-003', name:'Fatima Aliyu',      class:'SS 1C', gender:'F', parent:'Alhaji M. Aliyu',fee:'paid',    att:97, status:'active' },
  { id:'SM-2024-004', name:'Chidi Nwosu',      class:'JSS 1A', gender:'M', parent:'Mrs R. Nwosu',  fee:'unpaid',  att:72, status:'active' },
  { id:'SM-2024-005', name:'Blessing Eze',     class:'SS 3A', gender:'F', parent:'Mr K. Eze',       fee:'paid',    att:99, status:'active' },
  { id:'SM-2024-006', name:'Muhammed Garba',   class:'JSS 2B', gender:'M', parent:'Mal. S. Garba',  fee:'partial', att:85, status:'active' },
  { id:'SM-2024-007', name:'Ngozi Okafor',     class:'SS 2B', gender:'F', parent:'Dr P. Okafor',   fee:'paid',    att:91, status:'active' },
  { id:'SM-2024-008', name:'Tunde Adeleke',    class:'SS 1A', gender:'M', parent:'Chief G. Adeleke',fee:'paid',   att:88, status:'active' },
  { id:'SM-2024-009', name:'Amina Bello',      class:'JSS 3A', gender:'F', parent:'Hajiya N. Bello',fee:'unpaid', att:67, status:'warning' },
  { id:'SM-2024-010', name:'Ifeanyi Okeke',    class:'SS 3B', gender:'M', parent:'Mrs T. Okeke',   fee:'paid',    att:93, status:'active' },
  { id:'SM-2024-011', name:'Zainab Musa',      class:'JSS 1B', gender:'F', parent:'Mal. I. Musa',  fee:'paid',    att:96, status:'active' },
  { id:'SM-2024-012', name:'Oluwaseun Adeyemi',class:'SS 2C', gender:'M', parent:'Mr D. Adeyemi',  fee:'partial', att:79, status:'active' },
];

const TEACHERS = [
  { id:'STF-001', name:'Mrs T. Okonkwo',  subject:'Mathematics',  class:'SS 2A, JSS 3B', exp:'8 yrs',  status:'active', qual:'B.Sc Ed' },
  { id:'STF-002', name:'Mr A. Ibrahim',   subject:'English Lang.', class:'JSS 1-3',       exp:'12 yrs', status:'active', qual:'BA Ed'   },
  { id:'STF-003', name:'Dr B. Adeyemi',   subject:'Biology',       class:'SS 1-3',        exp:'15 yrs', status:'active', qual:'PhD'     },
  { id:'STF-004', name:'Mrs F. Aliyu',    subject:'Chemistry',     class:'SS 1-3',        exp:'6 yrs',  status:'active', qual:'B.Sc'    },
  { id:'STF-005', name:'Mr K. Osei',      subject:'Physics',       class:'SS 1-3',        exp:'9 yrs',  status:'active', qual:'B.Sc Ed' },
  { id:'STF-006', name:'Mrs C. Nwosu',    subject:'Civic Ed.',     class:'JSS 1-3',       exp:'4 yrs',  status:'leave',  qual:'BA'      },
  { id:'STF-007', name:'Mr E. Eze',       subject:'Economics',     class:'SS 2-3',        exp:'7 yrs',  status:'active', qual:'B.Sc'    },
  { id:'STF-008', name:'Miss Z. Usman',   subject:'Agric. Sci.',   class:'JSS 1-3',       exp:'3 yrs',  status:'active', qual:'B.Sc'    },
];
