/**
 * EduNigeria SMS — Layout Component  v3.0
 * Generates sidebar + navbar dynamically for all pages
 *
 * FIXES in v3:
 * - Removed gsap.registerPlugin(ScrollTrigger) — ScrollTrigger CDN was missing on 20/22 pages,
 *   causing a JS crash that left ALL elements frozen at opacity:0 (invisible)
 * - Replaced scrollTrigger-based animations with simple delay-based GSAP.from()
 * - Added try/catch around all GSAP code so a crash never freezes the page
 * - Added forceVisible() safety fallback — runs before GSAP to guarantee opacity:1
 * - Fixed navbar notification/settings links to use role-relative paths
 */

/* ============================================================
   NAVIGATION DEFINITIONS
   ============================================================ */
const SMS_NAV = {
  admin: [
    { section: 'Overview', items: [
      { id: 'dashboard',     label: 'Dashboard',       icon: 'dashboard',       href: 'dashboard.html' },
    ]},
    { section: 'Students', items: [
      { id: 'students',      label: 'Student Records',  icon: 'people',          href: 'students.html' },
      { id: 'admission',     label: 'Admission',        icon: 'how_to_reg',      href: 'admission.html' },
      { id: 'attendance',    label: 'Attendance',       icon: 'event_available', href: 'attendance.html' },
      { id: 'results',       label: 'Results & Exams',  icon: 'grade',           href: 'results.html' },
      { id: 'assignments',   label: 'Assignments',      icon: 'assignment',      href: 'assignments.html' },
      { id: 'cbt',           label: 'CBT Platform',     icon: 'quiz',            href: 'cbt.html' },
    ]},
    { section: 'Finance', items: [
      { id: 'fees',          label: 'Fees & Payments',  icon: 'payments',        href: 'fees.html' },
      { id: 'inventory',     label: 'Inventory',        icon: 'inventory_2',     href: 'inventory.html' },
    ]},
    { section: 'Academic', items: [
      { id: 'timetable',     label: 'Timetable',        icon: 'calendar_month',  href: 'timetable.html' },
      { id: 'library',       label: 'Library',          icon: 'local_library',   href: 'library.html' },
    ]},
    { section: 'Admin', items: [
      { id: 'teachers',      label: 'Staff & HR',       icon: 'badge',           href: 'teachers.html' },
      { id: 'communication', label: 'Communication',    icon: 'forum',           href: 'communication.html', badge: '5' },
      { id: 'analytics',     label: 'Analytics',        icon: 'analytics',       href: 'analytics.html' },
      { id: 'notifications', label: 'Notifications',    icon: 'notifications',   href: 'notifications.html', badge: '12' },
      { id: 'settings',      label: 'Settings',         icon: 'settings',        href: 'settings.html' },
    ]},
    { section: 'Portals', items: [
      { id: 'teacher-portal', label: 'Teacher Portal',  icon: 'person_pin',      href: '../teacher/dashboard.html' },
      { id: 'student-portal', label: 'Student Portal',  icon: 'school',          href: '../student/dashboard.html' },
      { id: 'parent-portal',  label: 'Parent Portal',   icon: 'family_restroom', href: '../parent/dashboard.html' },
    ]},
  ],

  teacher: [
    { section: 'My Workspace', items: [
      { id: 'dashboard',     label: 'Dashboard',        icon: 'dashboard',       href: 'dashboard.html' },
      { id: 'attendance',    label: 'Mark Attendance',  icon: 'event_available', href: '../admin/attendance.html' },
      { id: 'results',       label: 'Enter Grades',     icon: 'grade',           href: '../admin/results.html' },
      { id: 'assignments',   label: 'Assignments',      icon: 'assignment',      href: '../admin/assignments.html' },
      { id: 'timetable',     label: 'My Timetable',     icon: 'calendar_month',  href: '../admin/timetable.html' },
      { id: 'communication', label: 'Messages',         icon: 'forum',           href: '../admin/communication.html', badge: '3' },
      { id: 'library',       label: 'Library',          icon: 'local_library',   href: '../admin/library.html' },
    ]},
    { section: 'Navigation', items: [
      { id: 'admin-dash',    label: 'Admin Portal',     icon: 'admin_panel_settings', href: '../admin/dashboard.html' },
    ]},
  ],

  student: [
    { section: 'My School', items: [
      { id: 'dashboard',     label: 'My Dashboard',     icon: 'dashboard',       href: 'dashboard.html' },
      { id: 'results',       label: 'My Results',       icon: 'grade',           href: '../admin/results.html' },
      { id: 'attendance',    label: 'My Attendance',    icon: 'event_available', href: '../admin/attendance.html' },
      { id: 'assignments',   label: 'Assignments',      icon: 'assignment',      href: '../admin/assignments.html' },
      { id: 'cbt',           label: 'CBT / Exams',      icon: 'quiz',            href: '../admin/cbt.html' },
      { id: 'timetable',     label: 'Timetable',        icon: 'calendar_month',  href: '../admin/timetable.html' },
      { id: 'library',       label: 'Library',          icon: 'local_library',   href: '../admin/library.html' },
    ]},
  ],

  parent: [
    { section: "My Child's School", items: [
      { id: 'dashboard',     label: 'Overview',         icon: 'dashboard',       href: 'dashboard.html' },
      { id: 'results',       label: "Child's Results",  icon: 'grade',           href: '../admin/results.html' },
      { id: 'attendance',    label: 'Attendance',       icon: 'event_available', href: '../admin/attendance.html' },
      { id: 'fees',          label: 'Pay Fees',         icon: 'payments',        href: '../admin/fees.html' },
      { id: 'communication', label: 'Messages',         icon: 'forum',           href: '../admin/communication.html' },
    ]},
  ],
};

/* ============================================================
   ROLE META — user info shown in sidebar & navbar
   ============================================================ */
const ROLE_META = {
  admin:   { label: 'System Admin',    initials: 'SA', name: 'Admin User',      bgColor: 'linear-gradient(135deg,#0D47A1,#1976D2)' },
  teacher: { label: 'Class Teacher',   initials: 'TO', name: 'Mrs. T. Okonkwo', bgColor: 'linear-gradient(135deg,#2E7D32,#388E3C)' },
  student: { label: 'Student',         initials: 'AO', name: 'Adaeze Obi',      bgColor: 'linear-gradient(135deg,#6A1B9A,#8E24AA)' },
  parent:  { label: 'Parent/Guardian', initials: 'PO', name: 'Mr. P. Okafor',   bgColor: 'linear-gradient(135deg,#E65100,#F4511E)' },
};

/* ============================================================
   NAVBAR LINK PATHS — relative to each portal's directory
   admin   → pages/admin/  → same folder
   teacher → pages/teacher/ → one level up to admin
   student → pages/student/ → one level up to admin
   parent  → pages/parent/  → one level up to admin
   ============================================================ */
const NAV_PATHS = {
  admin:   { notifications: 'notifications.html',        settings: 'settings.html' },
  teacher: { notifications: '../admin/notifications.html', settings: '../admin/settings.html' },
  student: { notifications: '../admin/notifications.html', settings: '../admin/settings.html' },
  parent:  { notifications: '../admin/notifications.html', settings: '../admin/settings.html' },
};

/* ============================================================
   MAIN INIT FUNCTION — call once per page
   @param {object} cfg  { role, activePage, pageTitle }
   ============================================================ */
function initLayout(cfg = {}) {
  const role      = cfg.role       || 'admin';
  const active    = cfg.activePage || 'dashboard';
  const title     = cfg.pageTitle  || 'Dashboard';
  const meta      = ROLE_META[role]   || ROLE_META.admin;
  const navGroups = SMS_NAV[role]     || SMS_NAV.admin;
  const paths     = NAV_PATHS[role]   || NAV_PATHS.admin;

  /* ---- Build sidebar nav HTML ---- */
  let navHTML = '';
  navGroups.forEach(grp => {
    navHTML += `<div class="sb-section-lbl">${grp.section}</div>`;
    grp.items.forEach(item => {
      const isActive = item.id === active ? 'active' : '';
      const badge    = item.badge ? `<span class="sb-badge">${item.badge}</span>` : '';
      navHTML += `
        <a href="${item.href}" class="sb-item ${isActive}">
          <span class="material-icons">${item.icon}</span>
          <span>${item.label}</span>${badge}
        </a>`;
    });
  });

  /* ---- Inject sidebar ---- */
  const sidebarEl = document.getElementById('sidebar');
  if (sidebarEl) {
    sidebarEl.innerHTML = `
      <div class="sb-logo">
        <div class="sb-logo-icon">
          <span class="material-icons" style="font-size:20px;color:white">account_balance</span>
        </div>
        <div class="sb-logo-text">
          <h1>EduNigeria SMS</h1>
          <span>School Management System</span>
        </div>
      </div>
      <div class="sb-user">
        <div class="sb-user-ava" style="background:${meta.bgColor}">${meta.initials}</div>
        <div class="sb-user-info">
          <h3>${meta.name}</h3>
          <span class="sb-role-badge">${meta.label}</span>
        </div>
      </div>
      <nav class="sb-nav">${navHTML}</nav>
      <div class="sb-footer">
        <a href="../../index.html" class="sb-item" style="color:#C62828">
          <span class="material-icons">logout</span><span>Logout</span>
        </a>
      </div>`;
  }

  /* ---- Inject navbar ---- */
  const navbarEl = document.getElementById('navbar');
  if (navbarEl) {
    navbarEl.innerHTML = `
      <button class="hamburger-btn" onclick="toggleSidebar()" aria-label="Toggle menu">
        <span class="material-icons">menu</span>
      </button>
      <h2 class="nb-title">${title}</h2>
      <div class="nb-search">
        <span class="material-icons">search</span>
        <input type="text" placeholder="Search students, teachers, fees…" aria-label="Search">
      </div>
      <div class="nb-actions">
        <button class="nb-icon-btn" title="Sync data" onclick="showToast('Data synced successfully','success')">
          <span class="material-icons">sync</span>
        </button>
        <a class="nb-icon-btn" href="${paths.notifications}" title="Notifications" style="position:relative">
          <span class="material-icons">notifications</span>
          <span class="nb-dot"></span>
        </a>
        <a class="nb-icon-btn" href="${paths.settings}" title="Settings">
          <span class="material-icons">settings</span>
        </a>
        <a class="nb-avatar" style="background:${meta.bgColor}" href="${paths.settings}" title="${meta.name} — Settings">
          ${meta.initials}
        </a>
      </div>`;
  }

  /* ---- Overlay close handler ---- */
  const overlay = document.getElementById('sb-overlay');
  if (overlay) overlay.onclick = closeSidebar;
}

/* ============================================================
   SIDEBAR TOGGLE (mobile)
   ============================================================ */
function toggleSidebar() {
  const sb  = document.getElementById('sidebar');
  const ov  = document.getElementById('sb-overlay');
  if (!sb) return;
  sb.classList.toggle('open');
  if (ov) ov.classList.toggle('show');
}
function closeSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sb-overlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('show');
}

/* ============================================================
   SAFETY FIRST: force all elements visible BEFORE GSAP runs
   This guarantees the page is never blank if GSAP fails.
   ============================================================ */
function forceVisible() {
  const selectors = [
    '.stat-card', '.card', '.sb-item', '#navbar', '.pg-header',
    '.page-content', '.main-wrap', '.anim-fiu', '.anim-fi', '.anim-sil',
    '.breadcrumb', '.grid-2', '.grid-3', '.grid-4',
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.opacity    = '1';
      el.style.transform  = 'none';
      el.style.visibility = 'visible';
    });
  });
}

/* ============================================================
   GSAP ANIMATIONS
   FIXED:
   - No longer calls gsap.registerPlugin(ScrollTrigger) — was missing on 20 pages
   - All animations are simple delay-based, no scrollTrigger
   - Entire block wrapped in try/catch — any crash is silent
   - forceVisible() always runs first to guarantee visibility
   ============================================================ */
function initAnimations() {
  /* Step 1: Always make everything visible immediately */
  forceVisible();

  /* Step 2: If GSAP not loaded, just use CSS animations and exit */
  if (typeof gsap === 'undefined') {
    console.info('EduNigeria SMS: GSAP not loaded — using CSS animations');
    return;
  }

  /* Step 3: Run GSAP animations safely */
  try {
    /* Sidebar nav items slide in from left */
    gsap.from('.sb-item', {
      x: -20, opacity: 0, duration: 0.32,
      stagger: 0.035, ease: 'power2.out', delay: 0.05,
      overwrite: 'auto',
    });

    /* Navbar slides down */
    gsap.from('#navbar', {
      y: -24, opacity: 0, duration: 0.38, ease: 'power2.out', delay: 0.05,
      overwrite: 'auto',
    });

    /* Stat cards stagger up */
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length) {
      gsap.from(statCards, {
        y: 24, opacity: 0, duration: 0.45,
        stagger: 0.08, ease: 'power2.out', delay: 0.15,
        overwrite: 'auto',
      });
    }

    /* All cards fade up with stagger — NO scrollTrigger, simple delay */
    const cards = document.querySelectorAll('.card');
    if (cards.length) {
      gsap.from(cards, {
        y: 16, opacity: 0, duration: 0.4,
        stagger: 0.06, ease: 'power2.out', delay: 0.22,
        overwrite: 'auto',
      });
    }

    /* Animated number counters */
    document.querySelectorAll('[data-count]').forEach(el => {
      try {
        const target  = parseFloat(el.dataset.count);
        const prefix  = el.dataset.prefix  || '';
        const suffix  = el.dataset.suffix  || '';
        const isFloat = String(el.dataset.count).includes('.');
        const obj     = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 1.5, ease: 'power2.out', delay: 0.35,
          onUpdate() {
            el.textContent = prefix + (isFloat
              ? obj.val.toFixed(1)
              : Math.round(obj.val).toLocaleString()
            ) + suffix;
          },
        });
      } catch (e) {
        /* Leave the original text intact if counter fails */
      }
    });

    /* Progress bars animate from 0 */
    document.querySelectorAll('.progress-fill[data-w]').forEach(bar => {
      try {
        const target = bar.dataset.w;
        bar.style.width = '0%';
        gsap.to(bar, { width: target, duration: 1.1, ease: 'power2.out', delay: 0.4, overwrite: 'auto' });
      } catch (e) {
        bar.style.width = bar.dataset.w;
      }
    });

  } catch (err) {
    /* If anything in GSAP fails, restore all elements immediately */
    console.warn('EduNigeria SMS: GSAP animation error — restoring visibility', err);
    forceVisible();
  }
}
