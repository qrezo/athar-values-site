:root {
  --navy-950: #09172d;
  --navy-900: #10213d;
  --navy-800: #19375f;
  --navy-700: #264b77;
  --gold-700: #9d7235;
  --gold-600: #bc9351;
  --gold-400: #d7b875;
  --ivory-50: #fdfbf6;
  --ivory-100: #f7f2e8;
  --ivory-200: #eee4d1;
  --paper: #ffffff;
  --ink: #152a45;
  --muted: #6b7887;
  --soft: #f4f6f8;
  --line: #e4e8ed;
  --success: #2f7b59;
  --danger: #b64141;
  --warning: #9a6718;
  --shadow: 0 16px 44px rgba(16, 33, 61, .10);
  --shadow-lg: 0 30px 90px rgba(9, 23, 45, .22);
}
* { box-sizing: border-box; }
html { min-height: 100%; scroll-behavior: smooth; }
body {
  margin: 0;
  min-height: 100%;
  font-family: "IBM Plex Sans Arabic", "Noto Sans Arabic", Tahoma, Arial, sans-serif;
  color: var(--ink);
  background: #f3f5f7;
}
button, input, select, textarea { font: inherit; }
button { cursor: pointer; }
a { color: inherit; }
.is-hidden { display: none !important; }
.visually-hidden { position: fixed; width: 1px; height: 1px; opacity: 0; pointer-events: none; }

.button {
  border: 0;
  border-radius: 12px;
  padding: 12px 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 800;
  text-decoration: none;
  transition: .2s ease;
  white-space: nowrap;
}
.button:hover { transform: translateY(-1px); }
.button:disabled { opacity: .55; cursor: not-allowed; transform: none; }
.button-primary { color: #fff; background: linear-gradient(135deg, var(--navy-800), var(--navy-950)); box-shadow: 0 10px 24px rgba(16,33,61,.18); }
.button-soft { color: var(--navy-900); background: var(--ivory-100); border: 1px solid #eadfc8; }
.button-plain { color: var(--ink); background: #fff; border: 1px solid var(--line); }
.button-danger { color: #fff; background: var(--danger); }
.button.compact { padding: 10px 14px; font-size: 13px; }
.icon-button { width: 42px; height: 42px; border: 1px solid var(--line); background: #fff; border-radius: 12px; color: var(--ink); display: inline-grid; place-items: center; font-size: 23px; }

/* Login */
.login-screen {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(360px, 720px) minmax(300px, 430px);
  align-items: stretch;
  justify-content: center;
  background:
    radial-gradient(circle at 10% 15%, rgba(188,147,81,.22), transparent 28rem),
    linear-gradient(135deg, #f9f5ec, #efe3cd);
}
.login-panel { padding: 54px clamp(28px, 6vw, 92px); display: flex; flex-direction: column; justify-content: center; }
.login-brand { display: flex; align-items: center; gap: 14px; margin-bottom: 54px; }
.login-brand img { width: 70px; height: 70px; object-fit: contain; }
.login-brand strong, .login-brand span { display: block; }
.login-brand strong { font: 800 20px "Noto Kufi Arabic"; color: var(--navy-900); }
.login-brand span { color: var(--muted); font-size: 13px; margin-top: 2px; }
.eyebrow { color: var(--gold-700); font-weight: 900; font-size: 13px; letter-spacing: .03em; }
.login-copy h1 { max-width: 760px; font: 900 clamp(34px, 5vw, 66px)/1.35 "Noto Kufi Arabic"; margin: 14px 0 20px; color: var(--navy-950); }
.login-copy p { max-width: 670px; color: var(--muted); line-height: 2; font-size: 17px; margin: 0; }
.login-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 34px; }
.login-actions .button { min-width: 160px; }
.login-help { font-size: 12px; color: var(--muted); margin-top: 22px; }
.login-aside { background: linear-gradient(155deg, var(--navy-800), var(--navy-950)); color: #fff; padding: 64px 44px; display: flex; flex-direction: column; justify-content: center; gap: 18px; position: relative; overflow: hidden; }
.login-aside::before { content: ""; position: absolute; width: 360px; height: 520px; inset-inline-end: -150px; inset-block-end: -160px; background: url("../assets/images/fingerprint.svg") center/contain no-repeat; opacity: .1; }
.aside-badge { align-self: flex-start; border: 1px solid rgba(255,255,255,.16); border-radius: 999px; padding: 9px 14px; color: var(--gold-400); font-weight: 800; font-size: 12px; margin-bottom: 18px; }
.login-feature { position: relative; z-index: 1; display: flex; gap: 16px; align-items: flex-start; padding: 20px; border: 1px solid rgba(255,255,255,.1); border-radius: 18px; background: rgba(255,255,255,.045); }
.login-feature b { color: var(--gold-400); font: 900 22px "Noto Kufi Arabic"; }
.login-feature strong, .login-feature span { display: block; }
.login-feature strong { font-size: 16px; margin-bottom: 5px; }
.login-feature span { color: rgba(255,255,255,.66); font-size: 13px; line-height: 1.8; }

/* Shell */
.admin-app { min-height: 100vh; display: grid; grid-template-columns: 286px minmax(0,1fr); }
.sidebar { position: sticky; top: 0; height: 100vh; background: linear-gradient(180deg, #102541, var(--navy-950)); color: #fff; padding: 22px 18px; display: flex; flex-direction: column; overflow-y: auto; z-index: 30; }
.sidebar-head { display: flex; align-items: center; gap: 11px; padding: 2px 8px 20px; border-bottom: 1px solid rgba(255,255,255,.08); }
.sidebar-head img { width: 48px; height: 48px; object-fit: contain; }
.sidebar-head strong, .sidebar-head span { display: block; }
.sidebar-head strong { font: 800 15px "Noto Kufi Arabic"; }
.sidebar-head span { color: rgba(255,255,255,.55); font-size: 11px; margin-top: 2px; }
.sidebar-close { margin-inline-start: auto; display: none; background: rgba(255,255,255,.07); color: #fff; border-color: rgba(255,255,255,.12); }
.primary-create { width: 100%; border: 0; border-radius: 14px; background: linear-gradient(135deg, var(--gold-400), var(--gold-600)); color: var(--navy-950); padding: 14px; margin: 22px 0 12px; font-weight: 900; display: flex; justify-content: center; gap: 8px; box-shadow: 0 15px 34px rgba(0,0,0,.18); }
.primary-create span { font-size: 20px; line-height: 1; }
.sidebar-nav { display: flex; flex-direction: column; gap: 4px; }
.nav-label { color: rgba(255,255,255,.36); font-size: 10px; font-weight: 800; padding: 17px 12px 7px; }
.nav-button { width: 100%; border: 0; color: rgba(255,255,255,.72); background: transparent; border-radius: 12px; padding: 11px 12px; display: grid; grid-template-columns: 28px 1fr auto; align-items: center; gap: 8px; text-align: right; font-weight: 700; font-size: 13px; transition: .18s ease; }
.nav-button:hover { color: #fff; background: rgba(255,255,255,.065); }
.nav-button.is-active { color: #fff; background: rgba(188,147,81,.17); box-shadow: inset -3px 0 0 var(--gold-400); }
.nav-symbol { width: 26px; height: 26px; display: grid; place-items: center; color: var(--gold-400); font-size: 17px; }
.nav-button em { font-style: normal; min-width: 25px; text-align: center; color: var(--gold-400); border-radius: 999px; background: rgba(188,147,81,.13); padding: 3px 7px; font-size: 10px; }
.sidebar-bottom { margin-top: auto; padding-top: 22px; display: grid; gap: 8px; }
.sidebar-bottom a, .sidebar-bottom button { text-decoration: none; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.045); color: rgba(255,255,255,.75); border-radius: 11px; padding: 11px 12px; font-weight: 700; font-size: 12px; text-align: center; }

.app-main { min-width: 0; }
.topbar { min-height: 86px; padding: 15px clamp(18px, 3vw, 38px); background: rgba(255,255,255,.95); border-bottom: 1px solid var(--line); position: sticky; top: 0; z-index: 20; display: flex; align-items: center; justify-content: space-between; gap: 20px; backdrop-filter: blur(12px); }
.topbar-title-wrap { display: flex; align-items: center; gap: 12px; }
.topbar-title-wrap span { display: block; color: var(--gold-700); font-weight: 800; font-size: 11px; }
.topbar-title-wrap h1 { margin: 2px 0 0; font: 900 23px "Noto Kufi Arabic"; color: var(--navy-950); }
.menu-button { display: none; }
.topbar-actions { display: flex; align-items: center; gap: 10px; }
.connection-state { display: flex; align-items: center; gap: 7px; color: var(--muted); font-size: 11px; white-space: nowrap; }
.connection-state i { width: 9px; height: 9px; background: var(--warning); border-radius: 50%; box-shadow: 0 0 0 4px rgba(154,103,24,.1); }
.connection-state.is-online i { background: var(--success); box-shadow: 0 0 0 4px rgba(47,123,89,.1); }
.connection-state.is-local i { background: var(--gold-600); }
.user-menu { display: flex; align-items: center; gap: 9px; padding-inline-start: 10px; border-inline-start: 1px solid var(--line); }
.user-menu > span { width: 38px; height: 38px; border-radius: 50%; background: var(--navy-900); color: #fff; display: grid; place-items: center; font-weight: 900; }
.user-menu strong, .user-menu small { display: block; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.user-menu strong { font-size: 12px; }
.user-menu small { color: var(--muted); font-size: 10px; direction: ltr; text-align: right; }

.workspace { padding: clamp(18px, 3vw, 38px); min-height: calc(100vh - 86px); }
.loading-view { min-height: 65vh; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--muted); gap: 8px; }
.loading-view strong { color: var(--navy-900); }
.loader { width: 42px; height: 42px; border: 4px solid #dfe5eb; border-top-color: var(--gold-600); border-radius: 50%; animation: spin .8s linear infinite; margin-bottom: 8px; }
@keyframes spin { to { transform: rotate(360deg); } }
.page-content { max-width: 1500px; margin: 0 auto; }

/* Dashboard */
.welcome-panel { border-radius: 24px; padding: 34px; color: #fff; background: linear-gradient(135deg, var(--navy-800), var(--navy-950)); position: relative; overflow: hidden; display: flex; justify-content: space-between; align-items: center; gap: 24px; box-shadow: var(--shadow); }
.welcome-panel::after { content: ""; position: absolute; width: 300px; height: 420px; inset-inline-start: -110px; inset-block-end: -150px; background: url("../assets/images/fingerprint.svg") center/contain no-repeat; opacity: .09; }
.welcome-panel > div { position: relative; z-index: 1; }
.welcome-panel h2 { font: 900 clamp(25px, 3vw, 38px) "Noto Kufi Arabic"; margin: 8px 0 10px; }
.welcome-panel p { margin: 0; color: rgba(255,255,255,.68); max-width: 760px; line-height: 1.9; }
.welcome-actions { display: flex; flex-wrap: wrap; gap: 10px; position: relative; z-index: 2; }
.welcome-actions .button-primary { background: linear-gradient(135deg, var(--gold-400), var(--gold-600)); color: var(--navy-950); }
.welcome-actions .button-plain { border-color: rgba(255,255,255,.18); background: rgba(255,255,255,.08); color: #fff; }
.metric-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 16px; margin: 20px 0; }
.metric-card { background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 22px; box-shadow: 0 8px 24px rgba(16,33,61,.045); }
.metric-card > span { width: 42px; height: 42px; border-radius: 12px; background: var(--ivory-100); color: var(--gold-700); display: grid; place-items: center; font-size: 20px; margin-bottom: 16px; }
.metric-card strong { display: block; font: 900 28px "Noto Kufi Arabic"; color: var(--navy-900); }
.metric-card small { color: var(--muted); }
.dashboard-grid { display: grid; grid-template-columns: minmax(0,1.3fr) minmax(320px,.7fr); gap: 20px; }
.panel { background: #fff; border: 1px solid var(--line); border-radius: 20px; box-shadow: 0 8px 25px rgba(16,33,61,.04); }
.panel-head { padding: 21px 22px; border-bottom: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.panel-head h2 { margin: 0; font: 800 18px "Noto Kufi Arabic"; }
.panel-head p { margin: 4px 0 0; color: var(--muted); font-size: 12px; }
.panel-body { padding: 20px 22px; }
.quick-actions-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
.quick-action { border: 1px solid var(--line); background: #fff; border-radius: 16px; padding: 17px; text-align: right; display: flex; gap: 12px; align-items: flex-start; transition: .18s ease; }
.quick-action:hover { border-color: #d9bd82; background: #fffdf7; transform: translateY(-2px); }
.quick-action > span { flex: 0 0 38px; width: 38px; height: 38px; display: grid; place-items: center; border-radius: 11px; color: var(--gold-700); background: var(--ivory-100); font-size: 19px; }
.quick-action strong, .quick-action small { display: block; }
.quick-action strong { color: var(--navy-900); margin-bottom: 3px; }
.quick-action small { color: var(--muted); line-height: 1.65; }
.activity-list { display: grid; gap: 10px; }
.activity-row { display: grid; grid-template-columns: 44px minmax(0,1fr) auto; align-items: center; gap: 12px; border: 1px solid var(--line); border-radius: 14px; padding: 12px; }
.activity-row .thumb { width: 44px; height: 44px; border-radius: 10px; overflow: hidden; background: var(--ivory-100); display: grid; place-items: center; color: var(--gold-700); font-weight: 900; }
.activity-row .thumb img { width: 100%; height: 100%; object-fit: cover; }
.activity-row strong, .activity-row small { display: block; }
.activity-row strong { font-size: 13px; }
.activity-row small { color: var(--muted); font-size: 11px; margin-top: 3px; }
.activity-row button { border: 0; background: var(--soft); color: var(--ink); border-radius: 9px; padding: 7px 10px; font-weight: 700; font-size: 11px; }
.empty-box { border: 1px dashed #ccd4dd; background: #fafbfc; border-radius: 15px; padding: 30px; text-align: center; color: var(--muted); }
.empty-box strong { display: block; color: var(--navy-900); margin-bottom: 5px; }

/* Page header & toolbars */
.content-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; margin-bottom: 18px; }
.content-head h2 { margin: 5px 0 0; font: 900 clamp(22px, 3vw, 31px) "Noto Kufi Arabic"; color: var(--navy-950); }
.content-head p { margin: 7px 0 0; color: var(--muted); line-height: 1.7; }
.content-actions { display: flex; gap: 9px; flex-wrap: wrap; }
.toolbar { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 12px; display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.search-box { min-width: min(100%, 360px); display: flex; align-items: center; gap: 8px; background: var(--soft); border: 1px solid transparent; border-radius: 11px; padding: 0 13px; }
.search-box:focus-within { border-color: var(--gold-400); background: #fff; }
.search-box input { width: 100%; min-height: 42px; border: 0; background: transparent; outline: 0; color: var(--ink); }
.filter-group { display: flex; gap: 7px; flex-wrap: wrap; }
.filter-chip { border: 1px solid var(--line); border-radius: 999px; background: #fff; color: var(--muted); padding: 8px 12px; font-weight: 700; font-size: 11px; }
.filter-chip.is-active { color: var(--navy-900); background: var(--ivory-100); border-color: #dfc999; }

/* Forms */
.form-panel { background: #fff; border: 1px solid var(--line); border-radius: 20px; overflow: hidden; }
.form-section { padding: 25px; border-bottom: 1px solid var(--line); }
.form-section:last-child { border-bottom: 0; }
.form-section-head { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; }
.form-section-head b { width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; background: var(--ivory-100); color: var(--gold-700); }
.form-section-head h3 { margin: 0; font: 800 16px "Noto Kufi Arabic"; }
.form-section-head p { margin: 4px 0 0; color: var(--muted); font-size: 12px; }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 18px; }
.field { display: grid; gap: 7px; }
.field.full { grid-column: 1 / -1; }
.field > span { font-weight: 800; font-size: 12px; color: var(--ink); }
.field > small { color: var(--muted); font-size: 10px; line-height: 1.6; }
.field input, .field textarea, .field select { width: 100%; border: 1px solid #dbe1e7; border-radius: 11px; background: #fff; color: var(--ink); outline: 0; padding: 12px 13px; transition: .16s ease; }
.field textarea { min-height: 125px; resize: vertical; line-height: 1.8; }
.field input:focus, .field textarea:focus, .field select:focus { border-color: var(--gold-600); box-shadow: 0 0 0 4px rgba(188,147,81,.10); }
.sticky-save { position: sticky; bottom: 14px; display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; z-index: 5; }
.sticky-save-inner { background: rgba(255,255,255,.96); border: 1px solid var(--line); box-shadow: var(--shadow); border-radius: 15px; padding: 10px; display: flex; align-items: center; gap: 10px; backdrop-filter: blur(12px); }
.unsaved-note { color: var(--muted); font-size: 11px; margin-inline-end: 4px; }
.goals-editor { display: grid; gap: 9px; }
.repeater-row { display: grid; grid-template-columns: 1fr auto; gap: 8px; }
.repeater-row button { border: 1px solid #eed3d3; background: #fff5f5; color: var(--danger); border-radius: 10px; width: 44px; }
.add-row-button { justify-self: start; border: 1px dashed #d5bc86; color: var(--gold-700); background: #fffdf7; border-radius: 10px; padding: 9px 13px; font-weight: 800; }

/* Cards */
.item-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 15px; }
.item-card { background: #fff; border: 1px solid var(--line); border-radius: 18px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 8px 20px rgba(16,33,61,.035); }
.item-card-media { aspect-ratio: 16/9; background: linear-gradient(135deg, var(--ivory-100), #e8edf2); overflow: hidden; display: grid; place-items: center; color: var(--gold-700); font: 900 26px "Noto Kufi Arabic"; }
.item-card-media img { width: 100%; height: 100%; object-fit: cover; }
.item-card-body { padding: 17px; flex: 1; }
.item-card-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
.badge { display: inline-flex; align-items: center; gap: 5px; border-radius: 999px; padding: 5px 9px; background: var(--ivory-100); color: var(--gold-700); font-size: 10px; font-weight: 800; }
.badge.status-active { color: var(--success); background: #eaf6ef; }
.badge.status-draft { color: var(--warning); background: #fff4dc; }
.item-card h3 { font: 800 15px/1.7 "Noto Kufi Arabic"; margin: 0 0 7px; }
.item-card p { color: var(--muted); line-height: 1.7; font-size: 12px; margin: 0; }
.item-card-actions { border-top: 1px solid var(--line); padding: 10px 13px; display: flex; gap: 7px; }
.item-card-actions button { flex: 1; border: 0; background: var(--soft); border-radius: 9px; padding: 8px; color: var(--ink); font-size: 11px; font-weight: 800; }
.item-card-actions button.danger { flex: 0 0 auto; color: var(--danger); background: #fff4f4; }
.list-panel { background: #fff; border: 1px solid var(--line); border-radius: 18px; overflow: hidden; }
.list-row { display: grid; grid-template-columns: minmax(0,1.7fr) minmax(120px,.6fr) minmax(100px,.5fr) auto; align-items: center; gap: 14px; padding: 14px 17px; border-bottom: 1px solid var(--line); }
.list-row:last-child { border-bottom: 0; }
.list-row strong, .list-row small { display: block; }
.list-row strong { font-size: 13px; }
.list-row small { color: var(--muted); font-size: 11px; margin-top: 3px; }
.list-row .row-actions { display: flex; gap: 6px; }
.list-row .row-actions button { border: 0; border-radius: 8px; padding: 7px 9px; font-size: 10px; font-weight: 800; background: var(--soft); color: var(--ink); }
.list-row .row-actions button.danger { background: #fff2f2; color: var(--danger); }

/* Organization */
.tab-bar { display: inline-flex; gap: 5px; padding: 5px; background: #e9edf1; border-radius: 13px; margin-bottom: 16px; }
.tab-button { border: 0; background: transparent; color: var(--muted); border-radius: 9px; padding: 9px 13px; font-weight: 800; font-size: 11px; }
.tab-button.is-active { background: #fff; color: var(--navy-900); box-shadow: 0 4px 12px rgba(16,33,61,.08); }
.member-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 14px; }
.member-card { background: #fff; border: 1px solid var(--line); border-radius: 17px; padding: 18px; }
.member-card-head { display: flex; align-items: center; gap: 11px; }
.member-avatar { width: 46px; height: 46px; border-radius: 13px; background: var(--navy-900); color: var(--gold-400); display: grid; place-items: center; font: 900 15px "Noto Kufi Arabic"; }
.member-card strong, .member-card span { display: block; }
.member-card strong { font-size: 14px; }
.member-card span { color: var(--muted); font-size: 11px; margin-top: 3px; }
.member-contact { display: grid; gap: 5px; margin-top: 13px; color: var(--muted); font-size: 11px; direction: ltr; text-align: right; }
.member-actions { display: flex; gap: 7px; margin-top: 14px; }
.member-actions button { flex: 1; border: 0; border-radius: 9px; padding: 8px; font-weight: 800; font-size: 10px; background: var(--soft); }
.member-actions .danger { flex: 0 0 auto; color: var(--danger); background: #fff3f3; }

/* Drawer */
.drawer-backdrop { position: fixed; inset: 0; background: rgba(9,23,45,.55); z-index: 80; backdrop-filter: blur(3px); }
.editor-drawer { position: fixed; z-index: 90; inset-block: 0; inset-inline-start: 0; width: min(640px, 100%); background: #fff; box-shadow: var(--shadow-lg); transform: translateX(-105%); transition: transform .25s ease; display: grid; grid-template-rows: auto 1fr auto; }
[dir="rtl"] .editor-drawer { transform: translateX(105%); }
.editor-drawer.is-open { transform: translateX(0); }
.drawer-header { padding: 20px 24px; border-bottom: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; gap: 14px; }
.drawer-header span { color: var(--gold-700); font-size: 11px; font-weight: 800; }
.drawer-header h2 { margin: 4px 0 0; font: 900 21px "Noto Kufi Arabic"; }
.drawer-body { padding: 24px; overflow-y: auto; }
.drawer-footer { padding: 14px 24px; border-top: 1px solid var(--line); display: flex; justify-content: flex-end; gap: 9px; background: #fafbfc; }
.upload-field { border: 1px dashed #c9d1da; border-radius: 14px; padding: 16px; background: #fafbfc; display: flex; align-items: center; gap: 13px; }
.upload-preview { width: 82px; height: 68px; border-radius: 10px; background: #eef1f4; overflow: hidden; display: grid; place-items: center; color: var(--muted); font-size: 11px; }
.upload-preview img { width: 100%; height: 100%; object-fit: cover; }
.upload-actions { flex: 1; }
.upload-actions strong, .upload-actions small { display: block; }
.upload-actions strong { font-size: 12px; }
.upload-actions small { color: var(--muted); font-size: 10px; margin: 3px 0 8px; }
.upload-actions button { border: 1px solid var(--line); border-radius: 9px; padding: 7px 10px; background: #fff; font-weight: 800; font-size: 10px; }
.upload-progress { height: 5px; background: #e8edf1; border-radius: 999px; margin-top: 8px; overflow: hidden; display: none; }
.upload-progress i { display: block; height: 100%; width: 45%; background: var(--gold-600); animation: upload 1.1s infinite ease-in-out; }
@keyframes upload { 0% { transform: translateX(-100%); } 100% { transform: translateX(240%); } }

/* Confirm and toast */
.confirm-dialog { position: fixed; inset: 0; z-index: 120; background: rgba(9,23,45,.58); display: grid; place-items: center; padding: 20px; }
.confirm-card { width: min(430px, 100%); background: #fff; border-radius: 20px; padding: 28px; text-align: center; box-shadow: var(--shadow-lg); }
.confirm-icon { width: 54px; height: 54px; margin: 0 auto 14px; display: grid; place-items: center; border-radius: 50%; background: #fff0f0; color: var(--danger); font: 900 24px "Noto Kufi Arabic"; }
.confirm-card h2 { margin: 0; font: 900 20px "Noto Kufi Arabic"; }
.confirm-card p { color: var(--muted); line-height: 1.8; margin: 10px 0 22px; }
.confirm-card > div:last-child { display: flex; justify-content: center; gap: 9px; }
.toast-region { position: fixed; z-index: 160; inset-inline-start: 22px; inset-block-end: 22px; display: grid; gap: 8px; width: min(380px, calc(100% - 44px)); }
.toast { background: var(--navy-950); color: #fff; border-radius: 13px; padding: 14px 16px; box-shadow: var(--shadow-lg); display: flex; gap: 10px; align-items: flex-start; animation: toast-in .25s ease; }
.toast.success { background: #215f45; }
.toast.error { background: #8f3030; }
.toast strong, .toast span { display: block; }
.toast strong { font-size: 12px; }
.toast span { color: rgba(255,255,255,.7); font-size: 10px; margin-top: 2px; }
@keyframes toast-in { from { opacity: 0; transform: translateY(12px); } }

/* Local notice */
.local-notice { border: 1px solid #e4c98f; background: #fff9e9; color: #76551f; border-radius: 14px; padding: 13px 15px; margin-bottom: 16px; font-size: 12px; line-height: 1.8; }
.local-notice strong { display: block; }

@media (max-width: 1180px) {
  .metric-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .item-grid, .member-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .topbar-actions .button-plain, .topbar-actions .button-soft { display: none; }
}
@media (max-width: 940px) {
  .admin-app { grid-template-columns: 1fr; }
  .sidebar { position: fixed; inset-block: 0; right: 0; width: min(310px, 88vw); transform: translateX(105%); transition: transform .23s ease; box-shadow: var(--shadow-lg); }
  [dir="rtl"] .sidebar { transform: translateX(105%); }
  .sidebar.is-open { transform: translateX(0); }
  .sidebar-close, .menu-button { display: inline-grid; }
  .topbar { padding: 13px 18px; }
  .dashboard-grid { grid-template-columns: 1fr; }
  .login-screen { grid-template-columns: 1fr; }
  .login-aside { display: none; }
}
@media (max-width: 700px) {
  .workspace { padding: 16px; }
  .topbar-title-wrap h1 { font-size: 18px; }
  .topbar-title-wrap > div > span { display: none; }
  .connection-state span, .user-menu div { display: none; }
  .user-menu { padding-inline-start: 0; border: 0; }
  .welcome-panel { padding: 24px; flex-direction: column; align-items: flex-start; }
  .metric-grid, .item-grid, .member-grid, .quick-actions-grid, .form-grid { grid-template-columns: 1fr; }
  .content-head, .toolbar { align-items: stretch; flex-direction: column; }
  .content-actions { width: 100%; }
  .content-actions .button { flex: 1; }
  .search-box { min-width: 100%; }
  .list-row { grid-template-columns: 1fr auto; }
  .list-row > :nth-child(2), .list-row > :nth-child(3) { display: none; }
  .login-panel { padding: 30px 22px; }
  .login-brand { margin-bottom: 35px; }
  .login-copy h1 { font-size: 35px; }
  .drawer-body { padding: 18px; }
  .drawer-header, .drawer-footer { padding-inline: 18px; }
  .sticky-save-inner { width: 100%; justify-content: space-between; }
  .unsaved-note { display: none; }
}


/* Typography alignment with the public site */
h1, h2, h3, .login-brand strong, .sidebar-brand strong, .content-head h2, .panel-head h2 { font-family: "Noto Kufi Arabic", "Noto Sans Arabic", sans-serif; letter-spacing: 0; }
