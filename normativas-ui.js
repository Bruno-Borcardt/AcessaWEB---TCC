(() => {
  "use strict";
  const controller = window.AcessaWebNormativas;
  const root = document.querySelector('.normative-showcase');
  if (!controller || !root) return;

  const items = controller.getAll();
  const images = {
    'emag-31': ['imagem/pexels/pexels-click-jeth-703137695-18530501.jpg', 'Celular exibindo uma página de pesquisa em modo escuro', 'https://www.pexels.com/photo/18530501/', 'Foto: Click Jeth · Pexels'],
    'lbi': ['imagem/pexels/pexels-shvets-production-6980223.jpg', 'Mulher em cadeira de rodas utilizando um celular em uma mesa', 'https://www.pexels.com/photo/6980223/', 'Foto: SHVETS production · Pexels'],
    'wcag-22': ['imagem/pexels/pexels-kleison-leopoldino-219870943-36760144.jpg', 'Mãos percorrendo símbolos e texto em braille', 'https://www.pexels.com/photo/36760144/', 'Foto: Kleison Leopoldino · Pexels'],
    'pned': ['imagem/pexels/pexels-camiladainezl-37275436.jpg', 'Fachada de uma instituição pública de ensino superior', 'https://www.pexels.com/photo/37275436/', 'Foto: Camila Dainez · Pexels'],
    'abnt-nbr-17225': ['imagem/pexels/pexels-pavel-danilyuk-7521282.jpg', 'Pessoa organizando um diagrama em uma lousa', 'https://www.pexels.com/photo/7521282/', 'Foto: Pavel Danilyuk · Pexels'],
    'tcu-2025': ['imagem/pexels/pexels-burst-374103.jpg', 'Parede coberta por câmeras de monitoramento', 'https://www.pexels.com/photo/374103/', 'Foto: Burst · Pexels']
  };
  const complements = {
    'emag-31': 'traduz acesso em prática pública.',
    'lbi': 'transforma acessibilidade em direito.',
    'wcag-22': 'faz da inclusão um padrão verificável.',
    'pned': 'liga acesso, formação e autonomia.',
    'abnt-nbr-17225': 'aproxima requisitos da realidade brasileira.',
    'tcu-2025': 'mostra que acesso também exige governança.'
  };
  const kindLabels = {
    'modelo-governamental': 'Modelo governamental', legislacao: 'Legislação',
    'padrao-internacional': 'Padrão internacional', 'politica-publica': 'Política pública',
    'norma-brasileira': 'Norma brasileira', 'auditoria-publica': 'Auditoria pública'
  };
  const el = (selector) => root.querySelector(selector);
  const refs = {
    image: el('#normativa-imagem'), imageLink: el('#normativa-fonte-imagem'), credit: el('#normativa-credito') || Object.assign(document.createElement('a'), { id: 'normativa-credito', className: 'normative-card__credit' }), type: el('#normativa-tipo'), date: el('#normativa-data'),
    cardTitle: el('#normativa-cartao-titulo'), cardText: el('#normativa-cartao-texto'), status: el('#normativa-status'), title: el('#normativa-titulo'),
    complement: el('#normativa-complemento'), summary: el('#normativa-resumo'), read: el('#normativa-ler-mais'), previous: el('#normativa-anterior'),
    next: el('#normativa-proxima'), counter: el('#normativa-contador'), miniatures: el('#normativa-miniaturas'), details: el('#normativa-detalhes'),
    close: el('#normativa-fechar'), detailTitle: el('#normativa-detalhes-titulo'), scope: el('#normativa-escopo'), practical: el('#normativa-praticas'), sources: el('#normativa-fontes')
  };
  if (!refs.credit.isConnected) {
    refs.credit.target = '_blank'; refs.credit.rel = 'noopener noreferrer';
    el('.normative-card__copy').append(refs.credit);
  }
  let active = 0;

  function escapeHtml(value) { return String(value).replace(/[&<>"]/g, (character) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[character])); }
  function renderMiniatures() {
    refs.miniatures.innerHTML = items.map((item, index) => `<button type="button" class="normative-mini" data-index="${index}" aria-label="Exibir ${escapeHtml(item.title)}" aria-pressed="${index === active}"><img src="${images[item.slug][0]}" alt=""></button>`).join('');
  }
  function renderDetails(item) {
    refs.detailTitle.textContent = `Como aplicar ${item.title}`;
    refs.scope.textContent = `${item.summary} ${item.whyItMatters}`;
    refs.practical.innerHTML = item.practical.map((practice) => `<details><summary>${escapeHtml(practice.title)}</summary><div class="normative-practical__body"><p><b>Em termos técnicos:</b> ${escapeHtml(practice.technical)}</p><p><b>Na prática:</b> ${escapeHtml(practice.practical)}</p><p><b>Como testar:</b> ${escapeHtml(practice.test)}</p><div class="normative-related">${practice.related.map((related) => `<span>${escapeHtml(related)}</span>`).join('')}</div></div></details>`).join('');
    refs.sources.innerHTML = item.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)} ↗</a>`).join('');
  }
  function select(index, focusMiniature = false) {
    active = (index + items.length) % items.length;
    const item = items[active], image = images[item.slug];
    refs.image.src = image[0]; refs.image.alt = image[1];
    refs.imageLink.href = image[2]; refs.credit.href = image[2]; refs.credit.textContent = image[3];
    refs.type.textContent = kindLabels[item.kind] || item.kind;
    refs.date.textContent = item.year;
    refs.cardTitle.textContent = item.title;
    refs.cardText.textContent = item.subtitle;
    refs.status.textContent = item.status;
    refs.title.textContent = item.title;
    refs.complement.textContent = complements[item.slug];
    refs.summary.textContent = item.summary;
    refs.counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    root.querySelectorAll('.normative-mini').forEach((button, indexValue) => button.setAttribute('aria-pressed', String(indexValue === active)));
    renderDetails(item);
    controller.select(item.slug);
    if (focusMiniature) root.querySelector(`.normative-mini[data-index="${active}"]`)?.focus();
  }
  function toggleDetails(show) {
    refs.details.hidden = !show;
    refs.read.setAttribute('aria-expanded', String(show));
    refs.read.textContent = show ? 'Ocultar detalhes' : 'Ler mais';
    if (show) { renderDetails(items[active]); refs.details.scrollIntoView({behavior:'smooth',block:'nearest'}); }
  }

  renderMiniatures();
  refs.miniatures.addEventListener('click', (event) => { const button = event.target.closest('[data-index]'); if (button) select(Number(button.dataset.index)); });
  refs.miniatures.addEventListener('keydown', (event) => { if (!['ArrowLeft','ArrowRight'].includes(event.key)) return; event.preventDefault(); select(active + (event.key === 'ArrowRight' ? 1 : -1), true); });
  refs.previous.addEventListener('click', () => select(active - 1));
  refs.next.addEventListener('click', () => select(active + 1));
  refs.read.addEventListener('click', () => toggleDetails(refs.details.hidden));
  refs.close.addEventListener('click', () => { toggleDetails(false); refs.read.focus(); });
  select(0);
})();
