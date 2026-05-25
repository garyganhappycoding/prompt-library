* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg: #0a0a0a;
  --bg-1: #111111;
  --bg-2: #181818;
  --bg-3: #222222;
  --border: #2a2a2a;
  --border-hover: #3a3a3a;
  --text: #f0ede8;
  --text-2: #999999;
  --text-3: #555555;
  --accent: #c8f060;
  --accent-dim: rgba(200, 240, 96, 0.08);
  --accent-dim2: rgba(200, 240, 96, 0.15);
  --red: #ff5f5f;
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-mono: 'DM Mono', 'Courier New', monospace;
  --radius: 8px;
  --radius-lg: 14px;
  --transition: 0.18s ease;
}

html, body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 2px; }

/* Selection */
::selection { background: var(--accent-dim2); color: var(--accent); }

/* Focus */
*:focus-visible {
  outline: 1px solid var(--accent);
  outline-offset: 2px;
}

/* Buttons */
button {
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 13px;
  border: none;
  background: none;
  transition: all var(--transition);
}

.btn-primary {
  background: var(--accent);
  color: #0a0a0a;
  padding: 10px 22px;
  border-radius: var(--radius);
  font-weight: 500;
  letter-spacing: 0.02em;
}
.btn-primary:hover { background: #d4f570; transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }
.btn-primary:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }

.btn-secondary {
  background: var(--bg-3);
  color: var(--text);
  padding: 10px 22px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}
.btn-secondary:hover { border-color: var(--border-hover); background: var(--bg-3); }

.btn-ghost {
  color: var(--text-2);
  padding: 8px 14px;
  border-radius: var(--radius);
  border: 1px solid transparent;
}
.btn-ghost:hover { color: var(--text); border-color: var(--border); }

.btn-danger {
  color: var(--red);
  padding: 8px 14px;
  border-radius: var(--radius);
  border: 1px solid transparent;
  opacity: 0.7;
}
.btn-danger:hover { opacity: 1; border-color: var(--red); background: rgba(255,95,95,0.06); }

/* Inputs */
input, textarea {
  font-family: var(--font-mono);
  font-size: 14px;
  background: var(--bg-2);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px 16px;
  width: 100%;
  transition: border-color var(--transition);
  resize: vertical;
}
input:focus, textarea:focus {
  outline: none;
  border-color: var(--accent);
}
input::placeholder, textarea::placeholder { color: var(--text-3); }

/* Nav */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 56px;
  background: rgba(10,10,10,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text);
  text-decoration: none;
  letter-spacing: 0.01em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  color: var(--text-2);
  text-decoration: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  transition: all var(--transition);
  border: 1px solid transparent;
}
.nav-link:hover { color: var(--text); }
.nav-link.active {
  color: var(--text);
  background: var(--bg-2);
  border-color: var(--border);
}

.nav-settings-btn {
  color: var(--text-3);
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 18px;
  transition: color var(--transition);
}
.nav-settings-btn:hover { color: var(--text); }

/* Main content wrapper */
.page-wrapper {
  padding-top: 56px;
  min-height: 100vh;
}

/* Fade-in animation */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-up {
  animation: fadeUp 0.4s ease forwards;
}
.fade-up-delay-1 { animation-delay: 0.05s; opacity: 0; }
.fade-up-delay-2 { animation-delay: 0.1s; opacity: 0; }
.fade-up-delay-3 { animation-delay: 0.15s; opacity: 0; }
.fade-up-delay-4 { animation-delay: 0.2s; opacity: 0; }
.fade-up-delay-5 { animation-delay: 0.25s; opacity: 0; }

/* Loading pulse */
@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
.pulse { animation: pulse 1.4s ease infinite; }

/* Spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  width: 18px; height: 18px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 640px;
  max-height: 85vh;
  overflow-y: auto;
  animation: fadeUp 0.25s ease;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--bg-1);
  z-index: 1;
}

.modal-body { padding: 24px; }

/* Tag/badge */
.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 500;
}
.tag-accent { background: var(--accent-dim2); color: var(--accent); }
.tag-muted { background: var(--bg-3); color: var(--text-2); }

/* Divider */
.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 20px 0;
}

/* Copied toast */
@keyframes toastIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: #0a0a0a;
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  z-index: 999;
  animation: toastIn 0.2s ease;
  pointer-events: none;
}
