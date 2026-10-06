const SITE = { brand: "Senn Digital", email: "projekt@senndigital.it" };

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

const cases = [
  { label:"Automatisierung", title:"PDF-Daten ohne Abtippen übernehmen.", before:"Mitarbeiter übertragen jede Woche Daten aus PDFs manuell in Excel.", solution:"PDF hochladen, Daten automatisch erkennen, prüfen und als Excel-Datei exportieren.", result:"Weniger manuelle Eingabe. Weniger Fehler." },
  { label:"Dateiverarbeitung", title:"Dokumente automatisch richtig ablegen.", before:"Rechnungen und Dokumente werden heruntergeladen, umbenannt und händisch abgelegt.", solution:"Dateien erkennen, einheitlich benennen und automatisch der richtigen Struktur zuordnen.", result:"Weniger Suchaufwand. Verlässliche Ablage." },
  { label:"Individuelle Software", title:"Informationen an einem Ort verfügbar machen.", before:"Wichtige Informationen verteilen sich über Excel-Listen, E-Mails und Papier.", solution:"Eine einfache interne Web-App bündelt Daten, Status und Zuständigkeiten zentral.", result:"Ein gemeinsamer Stand. Klare Verantwortlichkeiten." },
  { label:"Website", title:"Einen veralteten Auftritt klar erneuern.", before:"Die Website ist mobil schwer nutzbar, langsam und passt nicht mehr zum Unternehmen.", solution:"Eine schnelle, responsive Website mit klarer Struktur und individueller Gestaltung.", result:"Professioneller Auftritt. Bessere Nutzung auf jedem Gerät." }
];
document.querySelectorAll("[data-case]").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll("[data-case]").forEach((b) => b.setAttribute("aria-selected", "false"));
  button.setAttribute("aria-selected", "true");
  const item = cases[Number(button.dataset.case)];
  const panel = document.querySelector("#case-panel"); panel.style.opacity = ".35";
  setTimeout(() => { for (const key of ["label","title","before","solution","result"]) document.querySelector(`[data-case-${key}]`).textContent = item[key]; panel.style.opacity = "1"; }, 160);
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
