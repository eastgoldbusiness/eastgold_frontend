/**
 * Scoped styles for the admin panel. Every selector is namespaced under
 * `eg-admin-*` and injected via a <style> tag inside the admin page, so it is
 * fully isolated from the public site's CSS and never affects it.
 *
 * Theme: clean white surfaces with EastGold gold (#D4AF37) accents.
 */
export const adminStyles = `
  :root {
    --eg-gold: #D4AF37;
    --eg-gold-dark: #B8901F;
    --eg-ink: #1A1A1A;
    --eg-ash: #6B7280;
    --eg-line: rgba(17, 17, 17, 0.08);
    --eg-cream: #FBF8F0;
  }

  /* ── Login shell (dark, ambient) ───────────────────────────────────────── */
  .eg-admin-shell {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
    background: radial-gradient(1200px 600px at 50% -10%, #2a2a2a 0%, #1a1a1a 45%, #111111 100%);
  }
  .eg-admin-glow { position: absolute; border-radius: 9999px; filter: blur(90px); opacity: 0.5; pointer-events: none; }
  .eg-admin-glow-a { width: 360px; height: 360px; background: #D4AF37; top: -120px; left: -80px; }
  .eg-admin-glow-b { width: 300px; height: 300px; background: #8a6d1f; bottom: -120px; right: -60px; opacity: 0.35; }

  .eg-admin-card {
    position: relative; z-index: 1; width: 100%; max-width: 400px;
    display: flex; flex-direction: column;
    background: rgba(255,255,255,0.98);
    border: 1px solid rgba(212,175,55,0.35);
    border-radius: 20px; padding: 34px 30px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.45);
  }

  .eg-admin-brand { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 26px; }
  .eg-admin-logo {
    display: flex; align-items: center; justify-content: center;
    width: 64px; height: 64px; border-radius: 9999px;
    background: transparent; overflow: hidden;
  }
  .eg-admin-logo--sm { width: 36px; height: 36px; }
  .eg-admin-logo img { width: 100%; height: 100%; object-fit: contain; }
  .eg-admin-wordmark { margin-top: 12px; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 26px; font-weight: 600; color: #111; }
  .eg-admin-caption { margin-top: 2px; font-size: 11px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--eg-gold); }

  /* ── Shared form bits ──────────────────────────────────────────────────── */
  .eg-admin-field { display: flex; flex-direction: column; gap: 7px; margin-top: 16px; }
  .eg-admin-field label { font-size: 12px; font-weight: 600; color: #4A4A4A; }
  .eg-admin-input {
    width: 100%; padding: 11px 14px; border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.12); background: #FAFAF8;
    font-size: 15px; color: #111; outline: none; box-sizing: border-box;
    transition: border-color .2s, box-shadow .2s, background .2s;
  }
  .eg-admin-input::placeholder { color: #B4B4B4; }
  .eg-admin-input:focus { border-color: var(--eg-gold); background: #fff; box-shadow: 0 0 0 4px rgba(212,175,55,0.15); }
  .eg-admin-inputwrap { position: relative; }
  .eg-admin-prefix { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 15px; font-weight: 600; color: #6B6B6B; pointer-events: none; }
  .eg-admin-input--prefixed { padding-left: 30px; }
  .eg-admin-input--eye { padding-right: 42px; }
  .eg-admin-eye-btn {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; padding: 4px;
    color: #9B9B9B; display: flex; align-items: center; justify-content: center;
    border-radius: 6px; transition: color .2s, background .2s;
  }
  .eg-admin-eye-btn:hover { color: var(--eg-gold); background: rgba(212,175,55,0.08); }

  .eg-admin-btn {
    padding: 12px 20px; border-radius: 12px; border: none; cursor: pointer;
    font-size: 14px; font-weight: 600; color: #1A1A1A;
    background: linear-gradient(to right, #EAB308, #D69E2E);
    box-shadow: 0 8px 22px rgba(214,158,46,0.35);
    transition: transform .15s, box-shadow .2s, opacity .2s;
  }
  .eg-admin-card .eg-admin-btn { margin-top: 22px; width: 100%; padding: 13px 16px; font-size: 15px; }
  .eg-admin-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(214,158,46,0.45); }
  .eg-admin-btn:disabled { opacity: 0.65; cursor: default; }

  .eg-admin-error { font-size: 13px; color: #DC2626; }
  .eg-admin-success { font-size: 13px; font-weight: 600; color: #059669; }
  .eg-admin-muted { font-size: 12px; color: var(--eg-ash); }
  .eg-admin-card .eg-admin-error { margin-top: 14px; text-align: center; }

  .eg-admin-link { color: var(--eg-gold-dark); font-weight: 600; font-size: 13px; background: none; border: none; cursor: pointer; padding: 0; text-decoration: none; }
  .eg-admin-link:hover { text-decoration: underline; }

  /* ── App layout ────────────────────────────────────────────────────────── */
  .eg-admin-app {
    display: flex; min-height: 100vh; width: 100%;
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--eg-ink); background: var(--eg-cream);
  }
  .eg-admin-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 40; }

  .eg-admin-sidebar {
    width: 248px; flex-shrink: 0; display: flex; flex-direction: column;
    background: #fff; border-right: 1px solid var(--eg-line); padding: 20px 16px;
    position: sticky; top: 0; height: 100vh;
  }
  .eg-admin-sidebrand {
    display: flex; align-items: center; gap: 10px; padding: 6px 8px 18px;
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 22px; font-weight: 600;
    border-bottom: 1px solid var(--eg-line); margin-bottom: 14px;
  }
  .eg-admin-navclose { display: none; margin-left: auto; }
  .eg-admin-nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
  .eg-admin-navitem {
    display: flex; align-items: center; gap: 12px; width: 100%;
    padding: 11px 12px; border-radius: 10px; border: none; cursor: pointer;
    background: transparent; color: var(--eg-ash); font-size: 14px; font-weight: 500;
    text-align: left; transition: background .15s, color .15s;
  }
  .eg-admin-navitem:hover { background: var(--eg-cream); color: var(--eg-ink); }
  .eg-admin-navitem.is-active { background: rgba(212,175,55,0.14); color: var(--eg-gold-dark); font-weight: 600; }
  .eg-admin-logout { color: #DC2626; margin-top: 8px; }
  .eg-admin-logout:hover { background: rgba(220,38,38,0.08); color: #DC2626; }

  .eg-admin-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .eg-admin-topbar {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 24px; background: #fff; border-bottom: 1px solid var(--eg-line);
    position: sticky; top: 0; z-index: 20;
  }
  .eg-admin-title { font-size: 19px; font-weight: 700; margin: 0; }
  .eg-admin-navtoggle { display: none; }
  .eg-admin-content { padding: 24px; }

  .eg-admin-iconbtn {
    display: inline-flex; align-items: center; justify-content: center;
    width: 36px; height: 36px; border-radius: 10px; cursor: pointer;
    border: 1px solid var(--eg-line); background: #fff; color: var(--eg-ash);
    transition: background .15s, color .15s, border-color .15s;
  }
  .eg-admin-iconbtn:hover { color: var(--eg-ink); border-color: rgba(212,175,55,0.5); }
  .eg-admin-danger:hover { color: #DC2626; border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.06); }

  .eg-admin-stack { display: flex; flex-direction: column; gap: 20px; }

  /* ── Stat cards ────────────────────────────────────────────────────────── */
  .eg-admin-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .eg-admin-statcard {
    display: flex; align-items: center; gap: 14px;
    background: #fff; border: 1px solid var(--eg-line); border-radius: 16px; padding: 18px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  }
  .eg-admin-staticon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
  }
  .eg-admin-staticon.tone-gold { background: rgba(212,175,55,0.15); color: var(--eg-gold-dark); }
  .eg-admin-staticon.tone-green { background: rgba(5,150,105,0.12); color: #059669; }
  .eg-admin-staticon.tone-blue { background: rgba(37,99,235,0.12); color: #2563EB; }
  .eg-admin-staticon.tone-amber { background: rgba(217,119,6,0.14); color: #D97706; }
  .eg-admin-statvalue { font-size: 24px; font-weight: 700; margin: 0; line-height: 1.1; }
  .eg-admin-statlabel { font-size: 12px; color: var(--eg-ash); margin: 2px 0 0; }

  /* ── Panels ────────────────────────────────────────────────────────────── */
  .eg-admin-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .eg-admin-panel {
    background: #fff; border: 1px solid var(--eg-line); border-radius: 16px; padding: 20px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  }
  .eg-admin-panel--narrow { max-width: 520px; }
  .eg-admin-panelhead { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
  .eg-admin-panelhead h2 { font-size: 16px; font-weight: 700; margin: 0; }

  .eg-admin-raterow { display: flex; gap: 40px; margin-bottom: 10px; }
  .eg-admin-ratebig { font-size: 28px; font-weight: 700; color: var(--eg-gold-dark); margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; }

  .eg-admin-activity { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .eg-admin-activity li { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--eg-line); }
  .eg-admin-activity li:last-child { border-bottom: none; }
  .eg-admin-activity-name { font-size: 14px; font-weight: 600; flex: 1; }
  .eg-admin-activity-date { font-size: 12px; color: var(--eg-ash); }

  /* ── Rate / profile form ──────────────────────────────────────────────── */
  .eg-admin-rateform { display: flex; flex-direction: column; gap: 14px; }
  .eg-admin-formactions { display: flex; align-items: center; gap: 14px; margin-top: 4px; }

  /* ── Tables ────────────────────────────────────────────────────────────── */
  .eg-admin-tablewrap { overflow-x: auto; }
  .eg-admin-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .eg-admin-table th {
    text-align: left; padding: 10px 12px; color: var(--eg-ash);
    font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em;
    border-bottom: 1px solid var(--eg-line); white-space: nowrap;
  }
  .eg-admin-table td { padding: 12px; border-bottom: 1px solid var(--eg-line); vertical-align: middle; }
  .eg-admin-table tr:last-child td { border-bottom: none; }
  .eg-admin-message { max-width: 280px; min-width: 180px; white-space: normal; overflow-wrap: anywhere; color: var(--eg-ash); }
  .eg-admin-empty { text-align: center; color: var(--eg-ash); padding: 28px 12px; }

  /* ── Toolbar / search / filters ───────────────────────────────────────── */
  .eg-admin-toolbar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
  .eg-admin-searchwrap { position: relative; flex: 1; min-width: 220px; }
  .eg-admin-searchicon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--eg-ash); }
  .eg-admin-search { padding-left: 36px; }
  .eg-admin-filters { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .eg-admin-chip {
    padding: 7px 14px; border-radius: 9999px; border: 1px solid var(--eg-line);
    background: #fff; color: var(--eg-ash); font-size: 13px; font-weight: 500; cursor: pointer;
    transition: background .15s, color .15s, border-color .15s;
  }
  .eg-admin-chip:hover { border-color: rgba(212,175,55,0.5); }
  .eg-admin-chip.is-active { background: rgba(212,175,55,0.16); color: var(--eg-gold-dark); border-color: rgba(212,175,55,0.5); font-weight: 600; }

  /* ── Status badges + selects ──────────────────────────────────────────── */
  .eg-admin-badge { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 9999px; }
  .eg-admin-statusselect {
    appearance: none; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600;
    border: 1px solid var(--eg-line); cursor: pointer; background: #fff;
  }
  .status-new { background: rgba(37,99,235,0.12); color: #2563EB; }
  .status-contacted { background: rgba(217,119,6,0.14); color: #D97706; }
  .status-closed { background: rgba(5,150,105,0.12); color: #059669; }

  /* ── Responsive ───────────────────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .eg-admin-cards { grid-template-columns: repeat(2, 1fr); }
    .eg-admin-grid2 { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .eg-admin-sidebar {
      position: fixed; top: 0; left: 0; z-index: 50; height: 100vh;
      transform: translateX(-100%); transition: transform .25s ease;
      box-shadow: 0 0 40px rgba(0,0,0,0.2);
    }
    .eg-admin-sidebar.is-open { transform: translateX(0); }
    .eg-admin-navclose { display: inline-flex; }
    .eg-admin-navtoggle { display: inline-flex; }
  }
  @media (max-width: 560px) {
    .eg-admin-cards { grid-template-columns: 1fr; }
    .eg-admin-content { padding: 16px; }
    .eg-admin-raterow { gap: 24px; }

    /* Card-style table rows on small screens */
    .eg-admin-table, .eg-admin-table tbody, .eg-admin-table tr, .eg-admin-table td { display: block; width: 100%; }
    .eg-admin-table thead { display: none; }
    .eg-admin-table tr { border: 1px solid var(--eg-line); border-radius: 12px; margin-bottom: 12px; padding: 6px 12px; }
    .eg-admin-table td { border: none; padding: 7px 0; display: flex; justify-content: space-between; gap: 16px; }
    .eg-admin-table td::before {
      content: attr(data-label); font-weight: 600; color: var(--eg-ash);
      font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em;
    }
    .eg-admin-message { max-width: 60%; white-space: normal; text-align: right; }
  }
`
