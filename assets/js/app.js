/* ============================================
   AI SEO Launchpad — Shared Utilities
   ============================================ */

// ── Clipboard ──────────────────────────────
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = orig;
        btn.classList.remove('copied');
      }, 2000);
    }
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
    }
  });
}

// ── Download file ───────────────────────────
function downloadFile(content, filename, mime = 'application/json') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Tab system ──────────────────────────────
function initTabs(containerSel) {
  const containers = document.querySelectorAll(containerSel || '.tabs-container');
  containers.forEach(c => {
    const btns   = c.querySelectorAll('.tab-btn');
    const panels = c.querySelectorAll('.tab-panel');
    btns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });
  });
}

// ── Local Storage helpers ───────────────────
const LS = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }
};

// ── Escape HTML ─────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Pretty JSON ─────────────────────────────
function prettyJson(obj) {
  return JSON.stringify(obj, null, 2);
}

// ── Toast notification ──────────────────────
function toast(msg, type = 'info') {
  const colors = { info: '#06b6d4', success: '#10b981', warn: '#f59e0b', error: '#ef4444' };
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed; bottom:1.5rem; right:1.5rem; z-index:9999;
    background:#1a1a24; border:1px solid ${colors[type]}44;
    border-left:3px solid ${colors[type]};
    padding:0.75rem 1.25rem;
    border-radius:8px; font-size:0.88rem;
    color:#f1f5f9; box-shadow:0 4px 20px rgba(0,0,0,0.5);
    animation: slideIn 0.2s ease;
    max-width: 320px;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = '0.3s'; setTimeout(() => t.remove(), 300); }, 3000);
}
