const SITE = { brand: "Process Engine", email: "projekt@processengine.it" };

document.querySelectorAll("[data-brand]").forEach((el) => el.textContent = SITE.brand);
document.querySelectorAll("[data-email-link]").forEach((el) => { el.textContent = SITE.email; el.href = `mailto:${SITE.email}`; });
document.querySelector("[data-year]").textContent = new Date().getFullYear();

const header = document.querySelector("[data-header]");
const menu = document.querySelector("#site-nav");
const toggle = document.querySelector(".nav-toggle");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 20), { passive: true });
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open");
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* Pathfinder selector */
const paths = [
  { tag: "Automatisierung", text: "Wiederkehrende Aufgaben wie Dateneingabe, Abgleiche oder Dokumentenerstellung lassen sich oft automatisieren — ohne das bestehende System zu ersetzen.", link: "#svc-automatisierung" },
  { tag: "Individuelle Software", text: "Wenn Excel, E-Mail oder Papier an ihre Grenzen stoßen, entsteht oft ein einfaches internes Tool, das genau zum Arbeitsablauf passt.", link: "#svc-software" },
  { tag: "Schnittstellen", text: "Verschiedene Programme, die heute getrennt laufen, lassen sich über Schnittstellen verbinden, damit Daten nicht mehrfach gepflegt werden müssen.", link: "#svc-schnittstellen" },
  { tag: "Websites", text: "Eine veraltete oder langsame Website lässt sich durch einen klar strukturierten, modernen Auftritt ersetzen — zweisprachig, wenn gewünscht.", link: "#svc-websites" }
];
document.querySelectorAll("[data-path]").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll("[data-path]").forEach((b) => b.setAttribute("aria-selected", "false"));
  button.setAttribute("aria-selected", "true");
  const item = paths[Number(button.dataset.path)];
  document.querySelector("[data-path-tag]").textContent = item.tag;
  document.querySelector("[data-path-text]").textContent = item.text;
  document.querySelector("[data-path-link]").href = item.link;
}));

/* Case examples */
const cases = [
  { label: "Automatisierung", title: "PDF-Daten ohne Abtippen übernehmen.", before: "Mitarbeiter übertragen jede Woche Daten aus PDFs manuell in Excel.", solution: "PDF hochladen, Daten automatisch erkennen, prüfen und als Excel-Datei exportieren.", result: "Weniger manuelle Eingabe. Weniger Fehler.",
    metrics: [{ v: "35 → 2 Min", l: "Zeit je Vorgang" }, { v: "deutlich weniger", l: "Eingabefehler" }, { v: "3 entfallen", l: "Arbeitsschritte" }],
    visual: `<div class="case-mock"><div class="case-mock-bar"><i></i><i></i><i></i><span>Rechnung_014.pdf</span></div><div class="ui-frame"><ul class="ui-checklist"><li class="done"><i></i>Rechnungsnummer erkannt</li><li class="done"><i></i>Datum erkannt</li><li class="done"><i></i>Betrag erkannt</li><li class="pending"><i></i>IBAN wird geprüft …</li></ul></div></div>` },
  { label: "Dateiverarbeitung", title: "Dokumente automatisch richtig ablegen.", before: "Rechnungen und Dokumente werden heruntergeladen, umbenannt und händisch abgelegt.", solution: "Dateien erkennen, einheitlich benennen und automatisch der richtigen Struktur zuordnen.", result: "Weniger Suchaufwand. Verlässliche Ablage.",
    visual: `<div class="case-mock"><div class="case-mock-bar"><i></i><i></i><i></i><span>Dateiablage</span></div><div class="ui-frame"><div class="ui-table"><div class="ui-row ui-row-head"><span>Datei</span><span>Ordner</span><span>Status</span></div><div class="ui-row"><span>Rechnung_014.pdf</span><span>Kunden/2026</span><span class="pill pill-done">Abgelegt</span></div><div class="ui-row"><span>Lieferschein_22.pdf</span><span>Lager/Okt</span><span class="pill pill-done">Abgelegt</span></div><div class="ui-row"><span>scan_0391.jpg</span><span>Posteingang</span><span class="pill pill-progress">Wird sortiert</span></div></div></div></div>` },
  { label: "Individuelle Software", title: "Informationen an einem Ort verfügbar machen.", before: "Wichtige Informationen verteilen sich über Excel-Listen, E-Mails und Papier.", solution: "Eine einfache interne Web-App bündelt Daten, Status und Zuständigkeiten zentral.", result: "Ein gemeinsamer Stand. Klare Verantwortlichkeiten.",
    visual: `<div class="case-mock"><div class="case-mock-bar"><i></i><i></i><i></i><span>Team-Dashboard</span></div><div class="ui-frame"><div class="ui-stats"><div class="ui-stat"><strong>12</strong><span>Offene Vorgänge</span></div><div class="ui-stat"><strong>8</strong><span>Heute bearbeitet</span></div><div class="ui-stat"><strong>4 Min</strong><span>Ø Bearbeitungszeit</span></div></div><div class="ui-chart"><i style="--h:38%"></i><i style="--h:62%"></i><i style="--h:45%"></i><i style="--h:80%"></i><i style="--h:55%"></i><i style="--h:70%"></i><i style="--h:90%"></i></div></div></div>` },
  { label: "Reports", title: "Wiederkehrende Reports automatisch erstellen.", before: "Jeden Monat werden Zahlen manuell aus mehreren Quellen zusammengetragen.", solution: "Daten werden automatisch zusammengeführt und als fertiger Report bereitgestellt.", result: "Reports stehen pünktlich, ohne manuellen Aufwand.",
    visual: `<div class="case-mock"><div class="case-mock-bar"><i></i><i></i><i></i><span>Monatsreport</span></div><div class="ui-frame"><div class="ui-export"><div class="ui-filetypes"><span>XLSX</span><span>CSV</span><span>PDF</span></div><button type="button" class="ui-export-btn" tabindex="-1">Export starten</button><small>Zuletzt exportiert vor 2 Minuten</small></div></div></div>` },
  { label: "Website", title: "Einen veralteten Auftritt klar erneuern.", before: "Die Website ist mobil schwer nutzbar, langsam und passt nicht mehr zum Unternehmen.", solution: "Eine schnelle, responsive Website mit klarer Struktur und individueller Gestaltung.", result: "Professioneller Auftritt. Bessere Nutzung auf jedem Gerät.",
    visual: `<div class="case-mock"><div class="case-mock-bar"><i></i><i></i><i></i><span>www.mein-betrieb.it</span></div><div class="ui-frame"><div class="ui-website-nav"><span>Logo</span><span>Leistungen</span><span>Kontakt</span></div><div class="ui-website-hero"><strong>Qualität, der man vertraut.</strong><small>Ihr Partner für Technik und Service — jetzt auch mobil.</small><em>Jetzt anfragen</em></div></div></div>` }
];
const metricsBox = document.querySelector("[data-case-metrics]");
const metricsNote = document.querySelector("[data-metrics-note]");
const caseVisual = document.querySelector("[data-case-visual]");
document.querySelectorAll("[data-case]").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll("[data-case]").forEach((b) => b.setAttribute("aria-selected", "false"));
  button.setAttribute("aria-selected", "true");
  const item = cases[Number(button.dataset.case)];
  const panel = document.querySelector("#case-panel"); panel.style.opacity = ".35";
  setTimeout(() => {
    for (const key of ["label", "title", "before", "solution", "result"]) document.querySelector(`[data-case-${key}]`).textContent = item[key];
    if (item.metrics) {
      item.metrics.forEach((m, i) => {
        document.querySelector(`[data-m${i}-v]`).textContent = m.v;
        document.querySelector(`[data-m${i}-l]`).textContent = m.l;
      });
      metricsBox.hidden = false; metricsNote.hidden = false;
    } else {
      metricsBox.hidden = true; metricsNote.hidden = true;
    }
    caseVisual.innerHTML = item.visual;
    panel.style.opacity = "1";
  }, 160);
}));

const form = document.querySelector("[data-project-form]");
form.addEventListener("submit", (event) => {
  event.preventDefault(); const status = form.querySelector(".form-status");
  if (!form.checkValidity()) { form.reportValidity(); status.textContent = "Bitte füllen Sie alle Pflichtfelder aus."; status.className = "form-status error"; return; }
  const data = new FormData(form); const files = form.querySelector('[name="files"]').files;
  const lines = [
    `Name: ${data.get("name")}`, `Unternehmen: ${data.get("company")}`, `E-Mail: ${data.get("email")}`, `Website: ${data.get("website") || "—"}`,
    `Thema: ${data.get("type")}`, "", "Aktueller Ablauf:", data.get("current"), "", "Unnötiger Aufwand:", data.get("effort"), "",
    `Häufigkeit: ${data.get("frequency")}`, `Personen: ${data.get("people") || "—"}`, `Systeme: ${data.get("systems") || "—"}`, `Zeitraum: ${data.get("timeline")}`, `Budget: ${data.get("budget")}`,
    files.length ? `Dateien zum Anhängen: ${[...files].map(f => f.name).join(", ")}` : "Dateien: —"
  ];
  status.textContent = "E-Mail-Entwurf wird geöffnet. Bitte prüfen, Dateien anhängen und absenden."; status.className = "form-status";
  window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Projektanfrage — ${data.get("company")}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
});

const legal = {
  impressum: `<p class="eyebrow">Rechtliches</p><h2>Impressum</h2><p>Die Unternehmens- und Kontaktdaten werden ergänzt, sobald Firmenname, Rechtsform, Anschrift und Partita IVA final feststehen.</p><p><strong>Kontakt</strong><br>${SITE.email}</p>`,
  datenschutz: `<p class="eyebrow">Rechtliches</p><h2>Datenschutz</h2><p>Diese Website setzt in der aktuellen Version keine Analyse- oder Marketing-Cookies ein. Angaben aus dem Projektformular werden erst in Ihrem E-Mail-Programm verarbeitet und nicht automatisch auf dieser Website gespeichert.</p><p>Vor der öffentlichen Veröffentlichung wird eine vollständige Datenschutzerklärung mit den finalen Anbieter- und Hostingangaben ergänzt.</p>`
};
const dialog = document.querySelector("[data-legal-dialog]");
document.querySelectorAll("[data-legal]").forEach((button) => button.addEventListener("click", () => { dialog.querySelector("[data-legal-content]").innerHTML = legal[button.dataset.legal]; dialog.showModal(); }));
dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
