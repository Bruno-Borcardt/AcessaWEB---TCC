(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const elements = {
    tabs: $$('[data-source-tab]'),
    panels: $$('.source-content[role="tabpanel"]'),
    url: $('#site-url'),
    html: $('#codigo-html'),
    file: $('#arquivo-html'),
    fileName: $('#nome-arquivo'),
    analyzeUrl: $('#analisar-url'),
    analyzeHtml: $('#analisar-html'),
    analyzeFile: $('#analisar-arquivo'),
    example: $('#carregar-exemplo'),
    clear: $('#limpar-html'),
    message: $('#mensagem-analise'),
    results: $('#resultados'),
    sourceSummary: $('#resumo-fonte'),
    score: $('#pontuacao'),
    scoreLabel: $('#rotulo-pontuacao'),
    errors: $('#total-erros'),
    warnings: $('#total-alertas'),
    passes: $('#total-aprovacoes'),
    list: $('#lista-resultados'),
    filters: $$('[data-filter]'),
    previewPanel: $('#painel-previa'),
    preview: $('#audit-preview'),
    closePreview: $('#fechar-previa'),
    exportJson: $('#exportar-json'),
    print: $('#imprimir-relatorio')
  };

  const state = { fileContent: '', report: null, sourceHtml: '' };
  const labels = {
    error: 'Erro', warning: 'Alerta', pass: 'Aprovado',
    critical: 'Crítica', high: 'Alta', medium: 'Média', low: 'Baixa', info: 'Informativa'
  };

  const sampleHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Página de serviços</title>
</head>
<body>
  <div class="menu"><a href="#">Clique aqui</a></div>
  <h1>Serviços ao cidadão</h1>
  <h3>Solicite atendimento</h3>
  <img src="atendimento.jpg">
  <form>
    <input id="nome" placeholder="Seu nome">
    <button></button>
  </form>
  <a href="https://exemplo.org" target="_blank">Saiba mais</a>
</body>
</html>`;

  function setMessage(text, isError = false) {
    elements.message.textContent = text;
    elements.message.classList.toggle('error', isError);
  }

  function selectTab(name) {
    elements.tabs.forEach((tab) => {
      const selected = tab.dataset.sourceTab === name;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    elements.panels.forEach((panel) => { panel.hidden = panel.id !== `painel-${name}`; });
  }

  elements.tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab.dataset.sourceTab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = elements.tabs[(index + direction + elements.tabs.length) % elements.tabs.length];
      selectTab(next.dataset.sourceTab);
      next.focus();
    });
  });

  elements.example.addEventListener('click', () => {
    elements.html.value = sampleHtml;
    setMessage('Exemplo carregado. Selecione “Analisar HTML” para ver as barreiras.');
    elements.html.focus();
  });
  elements.clear.addEventListener('click', () => {
    elements.html.value = '';
    setMessage('');
    elements.html.focus();
  });

  elements.file.addEventListener('change', async () => {
    const file = elements.file.files?.[0];
    if (!file) {
      state.fileContent = '';
      elements.fileName.textContent = 'Nenhum arquivo selecionado.';
      elements.analyzeFile.disabled = true;
      return;
    }
    if (!/\.html?$/i.test(file.name) && file.type !== 'text/html') {
      setMessage('Selecione um arquivo com extensão .html ou .htm.', true);
      elements.file.value = '';
      return;
    }
    state.fileContent = await file.text();
    elements.fileName.textContent = `${file.name} · ${Math.max(1, Math.round(file.size / 1024))} KB`;
    elements.analyzeFile.disabled = false;
    setMessage('Arquivo pronto para análise.');
  });

  elements.analyzeHtml.addEventListener('click', () => {
    const html = elements.html.value.trim();
    if (!html) return setMessage('Cole um código HTML antes de iniciar a análise.', true);
    runAudit(html, 'Código HTML colado');
  });
  elements.analyzeFile.addEventListener('click', () => {
    if (!state.fileContent) return setMessage('Selecione um arquivo HTML antes de analisar.', true);
    runAudit(state.fileContent, elements.file.files[0]?.name || 'Arquivo local');
  });
  elements.analyzeUrl.addEventListener('click', analyzeUrl);
  elements.url.addEventListener('keydown', (event) => { if (event.key === 'Enter') analyzeUrl(); });

  async function analyzeUrl() {
    let url;
    try { url = new URL(elements.url.value.trim()); } catch { return setMessage('Informe uma URL completa, começando com http:// ou https://.', true); }
    if (!['http:', 'https:'].includes(url.protocol)) return setMessage('A análise aceita apenas endereços HTTP ou HTTPS.', true);
    setMessage('Tentando acessar a página com segurança…');
    elements.analyzeUrl.disabled = true;
    try {
      const response = await fetch(url.href, { mode: 'cors', credentials: 'omit', redirect: 'follow' });
      if (!response.ok) throw new Error(`Resposta HTTP ${response.status}`);
      const type = response.headers.get('content-type') || '';
      if (!type.includes('text/html')) throw new Error('O endereço não retornou uma página HTML');
      const html = await response.text();
      await runAudit(html, url.href);
    } catch (error) {
      setMessage(`Não foi possível ler esta URL diretamente (${error.message}). Isso geralmente ocorre por uma proteção CORS do próprio site. Use “Código HTML” ou “Arquivo local” para analisar a mesma página.`, true);
    } finally { elements.analyzeUrl.disabled = false; }
  }

  function accessibleName(element) {
    const labelledBy = element.getAttribute('aria-labelledby');
    if (labelledBy) {
      const text = labelledBy.split(/\s+/).map((id) => element.ownerDocument.getElementById(id)?.textContent || '').join(' ').trim();
      if (text) return text;
    }
    return (element.getAttribute('aria-label') || element.getAttribute('alt') || element.getAttribute('title') || element.textContent || '').trim();
  }

  function snippet(element) {
    if (!element) return '';
    const clone = element.cloneNode(false);
    [...clone.attributes].forEach((attribute) => {
      if (attribute.name === 'data-aw-audit-id') clone.removeAttribute(attribute.name);
    });
    let value = clone.outerHTML || `<${element.localName}>`;
    if (value.length > 240) value = `${value.slice(0, 237)}…`;
    return value;
  }

  function addFinding(findings, data) {
    findings.push({
      id: `resultado-${findings.length + 1}`,
      type: data.type,
      severity: data.severity || (data.type === 'pass' ? 'info' : 'medium'),
      title: data.title,
      description: data.description,
      criterion: data.criterion || 'Revisão de boas práticas',
      standard: data.standard || 'WCAG 2.2 / eMAG 3.1',
      affected: data.affected || 'Pessoas com diferentes formas de acesso',
      fix: data.fix || '',
      code: data.code || '',
      auditId: data.element?.dataset?.awAuditId || ''
    });
  }

  function addAggregatePass(findings, count, data) {
    if (count > 0) addFinding(findings, { ...data, type: 'pass', severity: 'info', description: `${count} ${count === 1 ? 'elemento foi verificado e atende' : 'elementos foram verificados e atendem'} a esta checagem automática.` });
  }

  async function runAudit(html, sourceLabel) {
    setMessage('Analisando estrutura, semântica, formulários, teclado e contraste…');
    elements.results.hidden = true;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    $$('*', doc).forEach((element, index) => { element.dataset.awAuditId = `aw-${index + 1}`; });
    const findings = [];

    auditDocument(doc, findings);
    state.sourceHtml = `<!doctype html>\n${doc.documentElement.outerHTML}`;
    elements.preview.srcdoc = state.sourceHtml;
    await new Promise((resolve) => {
      const timer = setTimeout(resolve, 1200);
      elements.preview.addEventListener('load', () => { clearTimeout(timer); resolve(); }, { once: true });
    });
    auditContrast(elements.preview.contentDocument, findings);

    const counts = {
      error: findings.filter((item) => item.type === 'error').length,
      warning: findings.filter((item) => item.type === 'warning').length,
      pass: findings.filter((item) => item.type === 'pass').length
    };
    const penalty = findings.reduce((total, item) => total + (item.type === 'error' ? ({ critical: 18, high: 10, medium: 5, low: 2 }[item.severity] || 4) : item.type === 'warning' ? 1 : 0), 0);
    const score = Math.max(0, Math.min(100, 100 - penalty));
    state.report = { generatedAt: new Date().toISOString(), source: sourceLabel, score, counts, findings };
    renderReport();
    setMessage(`Análise concluída: ${counts.error} erros, ${counts.warning} alertas e ${counts.pass} verificações aprovadas.`);
  }

  function auditDocument(doc, findings) {
    const title = $('title', doc)?.textContent.trim();
    addFinding(findings, title ? { type: 'pass', title: 'Título da página identificado', criterion: '2.4.2 Página com título', affected: 'Pessoas que navegam por abas ou leitores de tela' } : { type: 'error', severity: 'high', title: 'A página não possui título', description: 'Sem um título, é difícil identificar a página entre abas, favoritos e históricos.', criterion: 'WCAG 2.4.2', standard: 'WCAG 2.2 A · eMAG 3.1', affected: 'Pessoas cegas, com baixa visão ou dificuldades cognitivas', fix: 'Inclua um título curto e específico dentro de <head>.', code: '<title>Nome da página | Nome do serviço</title>', element: doc.documentElement });

    const lang = doc.documentElement.getAttribute('lang')?.trim();
    addFinding(findings, lang ? { type: 'pass', title: `Idioma principal informado (${lang})`, criterion: '3.1.1 Idioma da página', affected: 'Usuários de leitores de tela e tradução' } : { type: 'error', severity: 'high', title: 'Idioma principal não informado', description: 'Leitores de tela podem usar pronúncia incorreta quando o idioma não é declarado.', criterion: 'WCAG 3.1.1', standard: 'WCAG 2.2 A · eMAG 3.1', affected: 'Pessoas cegas, com baixa visão, dislexia ou que usam tradução', fix: 'Declare o idioma no elemento raiz.', code: '<html lang="pt-BR">', element: doc.documentElement });

    const viewport = $('meta[name="viewport"]', doc);
    addFinding(findings, viewport ? { type: 'pass', title: 'Configuração responsiva encontrada', criterion: '1.4.10 Reflow' } : { type: 'warning', severity: 'medium', title: 'Configuração de viewport não encontrada', description: 'A página pode ser exibida com escala inadequada em dispositivos móveis.', criterion: 'WCAG 1.4.10', affected: 'Pessoas com baixa visão e usuários de celulares', fix: 'Adicione a configuração de viewport sem bloquear o zoom.', code: '<meta name="viewport" content="width=device-width, initial-scale=1">', element: $('head', doc) });

    const main = $('main,[role="main"]', doc);
    addFinding(findings, main ? { type: 'pass', title: 'Região principal identificada', criterion: '1.3.1 Informações e relações' } : { type: 'error', severity: 'medium', title: 'Região principal não identificada', description: 'A ausência de <main> dificulta saltar diretamente ao conteúdo relevante.', criterion: 'WCAG 1.3.1 / 2.4.1', standard: 'WCAG 2.2 A · eMAG 3.1', affected: 'Pessoas que navegam por teclado ou leitor de tela', fix: 'Envolva o conteúdo exclusivo da página em um único elemento <main>.', code: '<main id="conteudo-principal">…</main>', element: $('body', doc) });

    const headings = $$('h1,h2,h3,h4,h5,h6', doc);
    const h1s = headings.filter((heading) => heading.localName === 'h1');
    if (h1s.length === 1) addFinding(findings, { type: 'pass', title: 'Um título principal foi encontrado', criterion: '1.3.1 Estrutura semântica' });
    else addFinding(findings, { type: 'error', severity: h1s.length === 0 ? 'high' : 'medium', title: h1s.length === 0 ? 'Título principal ausente' : 'Mais de um título principal encontrado', description: `Foram encontrados ${h1s.length} elementos <h1>. Uma hierarquia clara ajuda a compreender a organização da página.`, criterion: 'WCAG 1.3.1 / 2.4.6', affected: 'Pessoas que navegam por títulos, com leitor de tela ou dificuldades cognitivas', fix: 'Use um H1 claro para o assunto central e H2/H3 para as subseções.', code: '<h1>Título principal da página</h1>', element: h1s[1] || $('body', doc) });
    let headingErrors = 0;
    headings.forEach((heading, index) => {
      if (!index) return;
      const current = Number(heading.localName[1]);
      const previous = Number(headings[index - 1].localName[1]);
      if (current > previous + 1) {
        headingErrors++;
        addFinding(findings, { type: 'error', severity: 'medium', title: `Salto na hierarquia: H${previous} para H${current}`, description: 'O salto pode transmitir uma estrutura diferente da organização visual.', criterion: 'WCAG 1.3.1', affected: 'Pessoas que navegam por títulos ou usam leitores de tela', fix: `Considere usar H${previous + 1} neste ponto, respeitando o significado da seção.`, code: snippet(heading), element: heading });
      }
    });
    if (headings.length && !headingErrors) addFinding(findings, { type: 'pass', title: 'Hierarquia de títulos sem saltos', description: `${headings.length} títulos foram verificados.`, criterion: 'WCAG 1.3.1' });

    const images = $$('img', doc); let goodImages = 0;
    images.forEach((image) => {
      if (!image.hasAttribute('alt')) addFinding(findings, { type: 'error', severity: 'critical', title: 'Imagem sem texto alternativo', description: 'A imagem pode desaparecer completamente para quem não enxerga o conteúdo visual.', criterion: 'WCAG 1.1.1', standard: 'WCAG 2.2 A · eMAG 3.1', affected: 'Pessoas cegas, com baixa visão ou imagens desativadas', fix: 'Descreva a informação ou função da imagem. Se for apenas decorativa, use alt vazio.', code: '<img src="imagem.jpg" alt="Descrição objetiva da informação">', element: image });
      else if (image.getAttribute('alt').trim() === '' && !['presentation', 'none'].includes(image.getAttribute('role'))) addFinding(findings, { type: 'warning', severity: 'medium', title: 'Imagem marcada como decorativa', description: 'O alt vazio pode estar correto, mas exige confirmar que a imagem não comunica informação nem funciona como controle.', criterion: 'WCAG 1.1.1', affected: 'Pessoas que usam leitores de tela', fix: 'Mantenha alt="" somente se a imagem puder ser removida sem perda de sentido.', code: snippet(image), element: image });
      else goodImages++;
    });
    addAggregatePass(findings, goodImages, { title: 'Imagens com alternativa textual', criterion: 'WCAG 1.1.1', affected: 'Pessoas cegas, com baixa visão ou conexão limitada' });

    const links = $$('a[href]', doc); let goodLinks = 0;
    links.forEach((link) => {
      const name = accessibleName(link);
      if (!name) addFinding(findings, { type: 'error', severity: 'high', title: 'Link sem nome acessível', description: 'O destino não pode ser compreendido por voz ou por uma lista de links.', criterion: 'WCAG 2.4.4 / 4.1.2', affected: 'Pessoas cegas, com baixa visão ou navegação por voz', fix: 'Adicione texto visível ou aria-label que descreva o destino.', code: '<a href="/contato">Fale conosco</a>', element: link });
      else if (/^(clique aqui|saiba mais|mais|link)$/i.test(name)) addFinding(findings, { type: 'warning', severity: 'medium', title: `Link pouco descritivo: “${name}”`, description: 'Fora do contexto visual, o texto não informa claramente para onde o link leva.', criterion: 'WCAG 2.4.4', affected: 'Pessoas que navegam por listas de links ou têm dificuldades cognitivas', fix: 'Inclua o assunto ou destino no próprio texto do link.', code: '<a href="/relatorio">Consultar relatório de acessibilidade</a>', element: link });
      else goodLinks++;
      if (link.target === '_blank' && !/\bnoopener\b/i.test(link.rel)) addFinding(findings, { type: 'warning', severity: 'low', title: 'Nova aba sem proteção noopener', description: 'Além de segurança, abrir uma nova aba deve ser informado quando puder desorientar.', criterion: 'Boas práticas de segurança e previsibilidade', affected: 'Pessoas com dificuldades cognitivas e todos os usuários', fix: 'Adicione rel="noopener noreferrer" e, quando necessário, informe que uma nova aba será aberta.', code: snippet(link), element: link });
    });
    addAggregatePass(findings, goodLinks, { title: 'Links com nomes compreensíveis', criterion: 'WCAG 2.4.4', affected: 'Pessoas que navegam por voz, teclado ou leitor de tela' });

    const buttons = $$('button,input[type="button"],input[type="submit"],input[type="reset"]', doc); let goodButtons = 0;
    buttons.forEach((button) => {
      const name = accessibleName(button) || button.value?.trim();
      if (!name) addFinding(findings, { type: 'error', severity: 'high', title: 'Botão sem nome acessível', description: 'A função do controle não pode ser anunciada por tecnologias assistivas.', criterion: 'WCAG 4.1.2', affected: 'Pessoas que usam leitores de tela ou navegação por voz', fix: 'Use um texto visível ou um aria-label objetivo.', code: '<button type="button">Salvar alterações</button>', element: button }); else goodButtons++;
    });
    addAggregatePass(findings, goodButtons, { title: 'Botões com nomes acessíveis', criterion: 'WCAG 4.1.2' });

    const controls = $$('input:not([type="hidden"]),select,textarea', doc); let labelled = 0;
    controls.forEach((control) => {
      const id = control.id;
      const hasLabel = (id && $(`label[for="${cssEscape(id)}"]`, doc)) || control.closest('label') || control.hasAttribute('aria-label') || control.hasAttribute('aria-labelledby');
      if (!hasLabel) addFinding(findings, { type: 'error', severity: 'high', title: 'Campo de formulário sem rótulo', description: 'Placeholder não substitui um rótulo: ele desaparece durante o preenchimento e pode não ser anunciado de forma consistente.', criterion: 'WCAG 1.3.1 / 3.3.2 / 4.1.2', affected: 'Pessoas cegas, com baixa visão, dificuldades cognitivas ou motoras', fix: 'Associe um <label> visível ao campo usando for e id.', code: `<label for="${id || 'campo'}">Nome do campo</label>\n${snippet(control)}`, element: control }); else labelled++;
    });
    addAggregatePass(findings, labelled, { title: 'Campos associados a rótulos', criterion: 'WCAG 1.3.1 / 3.3.2' });

    const ids = $$('[id]', doc).map((element) => element.id).filter(Boolean);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    duplicateIds.forEach((id) => addFinding(findings, { type: 'error', severity: 'medium', title: `Identificador duplicado: #${id}`, description: 'IDs repetidos podem associar rótulos, descrições e controles ao elemento errado.', criterion: 'WCAG 4.1.2', affected: 'Usuários de tecnologias assistivas', fix: 'Garanta que cada atributo id seja único na página.', code: `id="${id}"`, element: doc.getElementById(id) }));
    if (ids.length && !duplicateIds.length) addFinding(findings, { type: 'pass', title: 'Identificadores únicos', description: `${ids.length} identificadores foram verificados.`, criterion: 'WCAG 4.1.2' });

    $$('[tabindex]', doc).filter((element) => Number(element.getAttribute('tabindex')) > 0).forEach((element) => addFinding(findings, { type: 'error', severity: 'medium', title: 'Ordem de foco forçada com tabindex positivo', description: 'Uma ordem manual pode divergir da leitura visual e se tornar difícil de manter.', criterion: 'WCAG 2.4.3', affected: 'Pessoas que navegam por teclado ou controle alternativo', fix: 'Prefira a ordem natural do HTML e use tabindex="0" apenas quando necessário.', code: snippet(element), element }));

    const hiddenFocusable = $$('[aria-hidden="true"]', doc).filter((element) => element.matches('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])') || $('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])', element));
    hiddenFocusable.forEach((element) => addFinding(findings, { type: 'error', severity: 'high', title: 'Conteúdo oculto para leitor de tela contém foco', description: 'O foco pode chegar a um controle que não será anunciado.', criterion: 'WCAG 4.1.2 / 2.4.3', affected: 'Pessoas que usam teclado e leitores de tela', fix: 'Remova o foco dos descendentes enquanto a região estiver oculta ou use o atributo hidden/inert.', code: snippet(element), element }));

    const frames = $$('iframe', doc); let titledFrames = 0;
    frames.forEach((frame) => { if (!frame.getAttribute('title')?.trim()) addFinding(findings, { type: 'error', severity: 'medium', title: 'Iframe sem título', description: 'O conteúdo incorporado não pode ser identificado antes de ser aberto.', criterion: 'WCAG 4.1.2', affected: 'Pessoas que usam leitores de tela', fix: 'Inclua um title curto que descreva o conteúdo incorporado.', code: '<iframe src="…" title="Mapa de localização"></iframe>', element: frame }); else titledFrames++; });
    addAggregatePass(findings, titledFrames, { title: 'Conteúdos incorporados com título', criterion: 'WCAG 4.1.2' });

    const tables = $$('table', doc); let goodTables = 0;
    tables.forEach((table) => { if (!$('th', table)) addFinding(findings, { type: 'error', severity: 'medium', title: 'Tabela sem cabeçalhos', description: 'Sem cabeçalhos semânticos, a relação entre células pode se perder durante a leitura linear.', criterion: 'WCAG 1.3.1', affected: 'Pessoas que usam leitores de tela ou ampliação', fix: 'Use <th> e, em tabelas complexas, scope, headers e id.', code: '<th scope="col">Período</th>', element: table }); else goodTables++; });
    addAggregatePass(findings, goodTables, { title: 'Tabelas com cabeçalhos semânticos', criterion: 'WCAG 1.3.1' });

    $$('video', doc).forEach((video) => { if (!$('track[kind="captions"]', video)) addFinding(findings, { type: 'warning', severity: 'high', title: 'Vídeo sem faixa de legendas identificada', description: 'A ferramenta não encontrou uma faixa de legendas no elemento de vídeo.', criterion: 'WCAG 1.2.2', affected: 'Pessoas surdas, com deficiência auditiva ou em ambientes sem áudio', fix: 'Inclua legendas sincronizadas e confirme sua qualidade com revisão humana.', code: '<track kind="captions" src="legendas.vtt" srclang="pt-BR" label="Português">', element: video }); });

    const skip = $$('a[href^="#"]', doc).some((link) => /pular|saltar|conteúdo|conteudo/i.test(link.textContent));
    addFinding(findings, skip ? { type: 'pass', title: 'Atalho para o conteúdo encontrado', criterion: 'WCAG 2.4.1' } : { type: 'warning', severity: 'medium', title: 'Atalho para o conteúdo não identificado', description: 'Em páginas com navegação repetida, um link de salto reduz o esforço de teclado.', criterion: 'WCAG 2.4.1', affected: 'Pessoas que navegam por teclado, leitores de tela ou controle alternativo', fix: 'Adicione no início da página um link visível ao receber foco.', code: '<a class="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>', element: $('body', doc) });

    $$('[aria-labelledby],[aria-describedby]', doc).forEach((element) => {
      ['aria-labelledby', 'aria-describedby'].forEach((attribute) => {
        const missing = (element.getAttribute(attribute) || '').split(/\s+/).filter((id) => id && !doc.getElementById(id));
        if (missing.length) addFinding(findings, { type: 'error', severity: 'high', title: `Referência ARIA inexistente em ${attribute}`, description: `Os identificadores ${missing.join(', ')} não existem na página.`, criterion: 'WCAG 4.1.2', affected: 'Pessoas que usam leitores de tela', fix: 'Corrija o ID referenciado ou remova o atributo quando não for necessário.', code: snippet(element), element });
      });
    });
  }

  function cssEscape(value) { return window.CSS?.escape ? CSS.escape(value) : value.replace(/[^a-zA-Z0-9_-]/g, '\\$&'); }

  function parseColor(value) {
    const match = value?.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)(?:[, /]+([\d.]+))?\)/i);
    return match ? [Number(match[1]), Number(match[2]), Number(match[3]), match[4] === undefined ? 1 : Number(match[4])] : null;
  }
  function luminance(rgb) { return rgb.slice(0, 3).map((value) => { const channel = value / 255; return channel <= .03928 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4; }).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0); }
  function contrastRatio(a, b) { const values = [luminance(a), luminance(b)].sort((x, y) => y - x); return (values[0] + .05) / (values[1] + .05); }
  function backgroundOf(element, win) {
    let current = element;
    while (current) { const color = parseColor(win.getComputedStyle(current).backgroundColor); if (color && color[3] > .95) return color; current = current.parentElement; }
    return [255, 255, 255, 1];
  }
  function auditContrast(doc, findings) {
    if (!doc?.defaultView) return;
    const win = doc.defaultView;
    const candidates = $$('p,a,button,label,li,td,th,h1,h2,h3,h4,h5,h6,span', doc).filter((element) => element.textContent.trim() && win.getComputedStyle(element).display !== 'none').slice(0, 400);
    let good = 0, failures = 0;
    candidates.forEach((element) => {
      const style = win.getComputedStyle(element);
      const foreground = parseColor(style.color), background = backgroundOf(element, win);
      if (!foreground || foreground[3] < .95) return;
      const ratio = contrastRatio(foreground, background);
      const size = parseFloat(style.fontSize) || 16;
      const bold = Number(style.fontWeight) >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const required = large ? 3 : 4.5;
      if (ratio + .01 < required && failures < 15) {
        failures++;
        addFinding(findings, { type: 'error', severity: ratio < 2 ? 'high' : 'medium', title: `Contraste de texto insuficiente (${ratio.toFixed(2)}:1)`, description: `Este texto precisa atingir ao menos ${required}:1 nas condições calculadas. Folhas de estilo externas não carregadas podem alterar o resultado.`, criterion: 'WCAG 1.4.3', affected: 'Pessoas com baixa visão, daltonismo ou uso sob luminosidade intensa', fix: 'Aumente a diferença de luminosidade entre texto e fundo e confirme o estado de foco/hover.', code: snippet(element), element });
      } else if (ratio >= required) good++;
    });
    addAggregatePass(findings, good, { title: 'Amostras de texto com contraste suficiente', criterion: 'WCAG 1.4.3', affected: 'Pessoas com baixa visão ou percepção de cores reduzida' });
    if (!candidates.length) addFinding(findings, { type: 'warning', severity: 'low', title: 'Contraste não pôde ser calculado', description: 'Não foram encontrados textos renderizados suficientes na prévia isolada.', criterion: 'WCAG 1.4.3', affected: 'Pessoas com baixa visão', fix: 'Faça uma verificação visual com a página completa e suas folhas de estilo.' });
  }

  function escapeHtml(value) { return String(value || '').replace(/[&<>"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[character])); }

  function renderReport() {
    const { report } = state;
    elements.score.textContent = report.score;
    elements.scoreLabel.textContent = report.score >= 90 ? 'Bom ponto de partida' : report.score >= 70 ? 'Requer melhorias' : report.score >= 50 ? 'Barreiras relevantes' : 'Barreiras críticas';
    elements.errors.textContent = report.counts.error;
    elements.warnings.textContent = report.counts.warning;
    elements.passes.textContent = report.counts.pass;
    elements.sourceSummary.textContent = `Fonte: ${report.source}`;
    elements.list.innerHTML = report.findings.map((item) => `
      <details class="finding" data-type="${item.type}" id="${item.id}">
        <summary><span class="finding-badge">${labels[item.type]}</span><span class="finding-title"><b>${escapeHtml(item.title)}</b><span>${escapeHtml(item.criterion)}</span></span><span class="finding-severity">${labels[item.severity]}</span></summary>
        <div class="finding-body">
          <p>${escapeHtml(item.description)}</p>
          <div class="finding-meta"><div><small>CRITÉRIO</small><b>${escapeHtml(item.criterion)}</b></div><div><small>REFERÊNCIA</small><b>${escapeHtml(item.standard)}</b></div><div><small>PODE AFETAR</small><b>${escapeHtml(item.affected)}</b></div></div>
          ${item.fix ? `<div class="finding-fix"><strong>Como corrigir</strong><p>${escapeHtml(item.fix)}</p>${item.code ? `<code class="finding-code">${escapeHtml(item.code)}</code>` : ''}</div>` : ''}
          ${(item.code || item.auditId) ? `<div class="finding-actions">${item.auditId ? `<button type="button" class="analyzer-button secondary-action" data-locate="${item.auditId}">Ver elemento</button>` : ''}${item.code ? `<button type="button" class="text-action" data-copy="${escapeHtml(item.id)}">Copiar correção</button>` : ''}</div>` : ''}
        </div>
      </details>`).join('');
    elements.results.hidden = false;
    elements.results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  elements.list.addEventListener('click', async (event) => {
    const copyButton = event.target.closest('[data-copy]');
    if (copyButton) {
      const finding = state.report.findings.find((item) => item.id === copyButton.dataset.copy);
      try { await navigator.clipboard.writeText(finding.code); copyButton.textContent = 'Copiado'; setTimeout(() => copyButton.textContent = 'Copiar correção', 1400); } catch { setMessage('O navegador não permitiu copiar automaticamente. Selecione o código exibido.', true); }
      return;
    }
    const locateButton = event.target.closest('[data-locate]');
    if (locateButton) showElement(locateButton.dataset.locate);
  });

  function showElement(auditId) {
    elements.previewPanel.hidden = false;
    const doc = elements.preview.contentDocument;
    if (!doc) return;
    $$('[data-aw-audit-id]', doc).forEach((element) => { element.style.outline = ''; element.style.outlineOffset = ''; });
    const target = $(`[data-aw-audit-id="${auditId}"]`, doc);
    if (target) {
      target.style.outline = '4px solid #d43b32';
      target.style.outlineOffset = '4px';
      target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }
  elements.closePreview.addEventListener('click', () => { elements.previewPanel.hidden = true; });

  elements.filters.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    elements.filters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    $$('.finding', elements.list).forEach((finding) => { finding.hidden = filter !== 'all' && finding.dataset.type !== filter; });
  }));

  elements.exportJson.addEventListener('click', () => {
    if (!state.report) return;
    const blob = new Blob([JSON.stringify(state.report, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `acessaweb-relatorio-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  });
  elements.print.addEventListener('click', () => {
    if (!state.report) return;
    const closed = $$('details.finding:not([open])', elements.list);
    closed.forEach((detail) => { detail.open = true; });
    window.addEventListener('afterprint', () => closed.forEach((detail) => { detail.open = false; }), { once: true });
    window.print();
  });
})();
