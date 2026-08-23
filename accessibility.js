(() => {
  if (document.querySelector(".accessibility-toggle")) return;
  const classes = ["fonte-grande", "fonte-extra-grande", "espacamento-ampliado", "alto-contraste", "modo-leitura", "movimento-reduzido"];
  const labels = [["fonte-grande", "Texto maior"], ["fonte-extra-grande", "Texto extra grande"], ["espacamento-ampliado", "Mais espaçamento"], ["alto-contraste", "Alto contraste"], ["modo-leitura", "Modo leitura"], ["movimento-reduzido", "Reduzir movimento"]];
  try { JSON.parse(localStorage.getItem("acessaweb-preferencias") || "[]").forEach((item) => document.body.classList.add(item)); } catch { localStorage.removeItem("acessaweb-preferencias"); }

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "accessibility-toggle";
  toggle.textContent = "Acessibilidade";
  toggle.setAttribute("aria-controls", "painel-acessibilidade");
  toggle.setAttribute("aria-expanded", "false");
  const panel = document.createElement("section");
  panel.id = "painel-acessibilidade";
  panel.className = "accessibility-panel";
  panel.hidden = true;
  panel.setAttribute("aria-label", "Opções de acessibilidade");
  panel.innerHTML = "<h2>Personalize sua navegação</h2><p>Escolha as opções que deixam a leitura mais confortável.</p><div class=\"accessibility-actions\"></div>";
  const actions = panel.querySelector(".accessibility-actions");
  const save = () => localStorage.setItem("acessaweb-preferencias", JSON.stringify(classes.filter((item) => document.body.classList.contains(item))));

  labels.forEach(([className, label]) => {
    const button = document.createElement("button");
    button.type = "button"; button.textContent = label; button.dataset.classe = className;
    button.setAttribute("aria-pressed", String(document.body.classList.contains(className)));
    button.addEventListener("click", () => {
      if (className === "fonte-grande") document.body.classList.remove("fonte-extra-grande");
      if (className === "fonte-extra-grande") document.body.classList.remove("fonte-grande");
      document.body.classList.toggle(className);
      panel.querySelectorAll("button[data-classe]").forEach((item) => item.setAttribute("aria-pressed", String(document.body.classList.contains(item.dataset.classe))));
      save();
    });
    actions.append(button);
  });
  const speak = document.createElement("button");
  speak.type = "button"; speak.textContent = "Ouvir esta página";
  speak.addEventListener("click", () => { if ("speechSynthesis" in window) { window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance((document.querySelector("main.content") || document.body).innerText); utterance.lang = "pt-BR"; window.speechSynthesis.speak(utterance); } });
  const reset = document.createElement("button");
  reset.type = "button"; reset.className = "accessibility-reset"; reset.textContent = "Restaurar preferências";
  reset.addEventListener("click", () => { classes.forEach((item) => document.body.classList.remove(item)); localStorage.removeItem("acessaweb-preferencias"); panel.querySelectorAll("button[data-classe]").forEach((item) => item.setAttribute("aria-pressed", "false")); });
  actions.append(speak, reset);
  toggle.addEventListener("click", () => { panel.hidden = !panel.hidden; toggle.setAttribute("aria-expanded", String(!panel.hidden)); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !panel.hidden) { panel.hidden = true; toggle.setAttribute("aria-expanded", "false"); toggle.focus(); } });
  document.body.append(toggle, panel);

  const menu = document.querySelector(".sidebar");
  const list = menu?.querySelector("ul");
  if (menu && list && !menu.querySelector(".menu-search")) {
    const search = document.createElement("label");
    search.className = "menu-search";
    search.innerHTML = "<span aria-hidden=\"true\">⌕</span><input type=\"search\" placeholder=\"Buscar um tema\" aria-label=\"Buscar tema no menu\">";
    const input = search.querySelector("input");
    const empty = document.createElement("li");
    empty.className = "menu-empty"; empty.textContent = "Nenhum tema encontrado."; empty.hidden = true;
    list.after(search); search.after(list); list.append(empty);
    input.addEventListener("input", () => { const term = input.value.trim().toLocaleLowerCase("pt-BR"); let count = 0; list.querySelectorAll("li:not(.menu-empty)").forEach((item) => { const visible = item.textContent.toLocaleLowerCase("pt-BR").includes(term); item.hidden = !visible; if (visible) count++; }); empty.hidden = count !== 0; });
  }
  const progress = document.createElement("div");
  progress.className = "reading-progress"; progress.setAttribute("aria-hidden", "true"); document.body.append(progress);
  const updateProgress = () => { const height = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = (height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0) + "%"; };
  window.addEventListener("scroll", updateProgress, { passive: true }); window.addEventListener("resize", updateProgress); updateProgress();

  const main = document.querySelector("main.content");
  const activeLink = document.querySelector(".sidebar a.active");
  const links = [...document.querySelectorAll(".sidebar a")];
  if (main && activeLink && !main.querySelector(".page-context")) {
    const index = links.indexOf(activeLink);
    const context = document.createElement("div");
    context.className = "page-context";
    context.innerHTML = `<span class="page-context__meta">Biblioteca de diretrizes · ${Math.max(1, index)} de ${Math.max(1, links.length - 1)}</span>`;
    main.prepend(context);
    const next = links[index + 1] || links[1];
    if (next) { const nextCard = document.createElement("section"); nextCard.className = "page-next"; nextCard.innerHTML = `<div><small>PRÓXIMO TÓPICO</small><strong>${next.textContent.trim()}</strong></div><a href="${next.getAttribute("href")}">Continuar →</a>`; main.append(nextCard); }
  }
})();
