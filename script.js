// Aumentar e Diminuir Fonte
function aumentarFonte() {
    document.body.style.fontSize = "18px";
}

function diminuirFonte() {
    document.body.style.fontSize = "16px";
}

// Temporizador ajustável
let tempoRestante = 30;
let intervalo;

if (document.getElementById("tempo")) {
    intervalo = setInterval(contagem, 1000);
}

function reiniciarTempo() {
    tempoRestante = 30;
    const tempo = document.getElementById("tempo");
    if (tempo) tempo.innerText = tempoRestante;
}

function contagem() {
    const tempo = document.getElementById("tempo");
    if (!tempo) return;
    if (tempoRestante > 0) {
        tempoRestante--;
        tempo.innerText = tempoRestante;
    }
}

function pausarTempo() {
    clearInterval(intervalo);
}

function retomarTempo() {
    clearInterval(intervalo);
    intervalo = setInterval(contagem, 1000);
}

// Modo de leitura simples
function ativarModoSimples() {
    document.getElementById("conteudo").style.backgroundColor = "#FFF";
    document.getElementById("conteudo").style.color = "#000";
}

function desativarModoSimples() {
    document.getElementById("conteudo").style.backgroundColor = "#e3f2fd";
    document.getElementById("conteudo").style.color = "#212529";
}

// Confirmação de exclusão
function confirmarExclusao() {
    const confirmacao = confirm("Tem certeza que deseja excluir sua conta?");
    document.getElementById("mensagem-erro").innerText = confirmacao
        ? "Simulação concluída: a conta seria excluída."
        : "Ação cancelada.";
}

// Verificar senha
function verificarSenha() {
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem-seguranca");
  
    if (senha.length >= 6) {
      mensagem.innerText = "A senha de exemplo atende ao tamanho mínimo.";
      mensagem.style.color = "green";
    } else {
      mensagem.innerText = "A senha deve ter pelo menos 6 caracteres.";
      mensagem.style.color = "red";
      const aviso = new SpeechSynthesisUtterance("A senha deve ter pelo menos seis caracteres.");
      window.speechSynthesis.speak(aviso);
    }
  }

// Alto contraste (classe)
function ativarAltoContraste() {
    document.body.classList.add("alto-contraste");
}

function desativarAltoContraste() {
    document.body.classList.remove("alto-contraste");
}

// Leitura com voz
function lerTexto() {
    const texto = document.getElementById("texto-leitura").innerText;
    const sintetizador = new SpeechSynthesisUtterance(texto);
    window.speechSynthesis.speak(sintetizador);
}

// Espaçamento de linha
function aumentarEspacamento() {
    document.getElementById("texto-espacamento").style.lineHeight = "2";
}

function diminuirEspacamento() {
    document.getElementById("texto-espacamento").style.lineHeight = "1.2";
}

// Notificação visual
function mostrarNotificacao() {
    const notificacao = document.getElementById("notificacao");
    notificacao.style.display = "block";
    setTimeout(() => {
        notificacao.style.display = "none";
    }, 3000);
}

// Gestos
let startX = 0;
let endX = 0;

const area = document.getElementById("gesto-area");
const mensagem = document.getElementById("gesto-mensagem");

if (area) {
    area.addEventListener("mousedown", (e) => startX = e.clientX);
    area.addEventListener("mouseup", (e) => {
        endX = e.clientX;
        detectarMovimento();
    });

    area.addEventListener("touchstart", (e) => startX = e.touches[0].clientX, false);
    area.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        detectarMovimento();
    });
}

function detectarMovimento() {
    if (startX - endX > 50) {
        mensagem.innerText = "Você arrastou para a esquerda!";
    } else if (endX - startX > 50) {
        mensagem.innerText = "Você arrastou para a direita!";
    }
}

// Confirmação de compra
function confirmarCompra() {
    document.getElementById("mensagem-pagamento").innerText = "Dados de exemplo validados. Nenhuma compra foi realizada.";
}

// Feedback
function enviarFeedback() {
    document.getElementById("mensagem-feedback").innerText = "Obrigado pelo seu feedback!";
}

// Abrir serviço externo
function abrirServico() {
    window.open("https://www.gov.br/saude", "_blank");
}

// Mostrar tutorial
function mostrarTutorial() {
    document.getElementById("tutorial-texto").style.display = "block";
}

// Modo escuro/claro
function modoEscuro() {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#FFF";
}

function modoClaro() {
    document.body.style.backgroundColor = "#F8F9FA";
    document.body.style.color = "#212529";
}

// Leitura com voz alternativa
function lerTextoAssistivo() {
    const texto = document.getElementById("texto-assistivo").innerText;
    const sintetizador = new SpeechSynthesisUtterance(texto);
    window.speechSynthesis.speak(sintetizador);
}

// Compatibilidade de navegador
if (typeof Symbol === "undefined") {
    document.getElementById("compatibilidade").innerText = "Seu navegador pode não suportar recursos modernos.";
}

// Alerta de fraude
function alertaFraude() {
    alert("Nunca compartilhe seus dados pessoais com terceiros.");
}

// Compartilhar por WhatsApp
function compartilhar() {
    const url = encodeURIComponent(window.location.href);
    window.open("https://api.whatsapp.com/send?text=" + url, "_blank");
}
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");

if (toggleSidebarBtn && sidebar) {
  if (!sidebar.id) sidebar.id = "menu-principal";
  toggleSidebarBtn.setAttribute("aria-controls", sidebar.id);
  toggleSidebarBtn.setAttribute("aria-expanded", "false");

  toggleSidebarBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    const aberto = sidebar.classList.contains("active");
    toggleSidebarBtn.setAttribute("aria-expanded", String(aberto));
    toggleSidebarBtn.setAttribute("aria-label", aberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
  });

  function handleResize() {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
      toggleSidebarBtn.setAttribute("aria-expanded", "false");
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
      toggleSidebarBtn.setAttribute("aria-expanded", "false");
      toggleSidebarBtn.focus();
    }
  });

  sidebar.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
        toggleSidebarBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  window.addEventListener("resize", handleResize);
  window.addEventListener("DOMContentLoaded", handleResize);
}

function aprimorarMenu() {
  if (!sidebar || sidebar.querySelector(".menu-search")) return;
  const lista = sidebar.querySelector("ul");
  if (!lista) return;
  const busca = document.createElement("label");
  busca.className = "menu-search";
  busca.innerHTML = "<span aria-hidden=\"true\">⌕</span><input type=\"search\" placeholder=\"Buscar um tema\" aria-label=\"Buscar tema no menu\">";
  const campo = busca.querySelector("input");
  const vazio = document.createElement("li");
  vazio.className = "menu-empty";
  vazio.textContent = "Nenhum tema encontrado.";
  vazio.hidden = true;
  lista.after(busca);
  busca.after(lista);
  lista.append(vazio);

  campo.addEventListener("input", () => {
    const termo = campo.value.trim().toLocaleLowerCase("pt-BR");
    let encontrados = 0;
    lista.querySelectorAll("li:not(.menu-empty)").forEach((item) => {
      const mostrar = item.textContent.toLocaleLowerCase("pt-BR").includes(termo);
      item.hidden = !mostrar;
      if (mostrar) encontrados++;
    });
    vazio.hidden = encontrados !== 0;
  });
}

function adicionarProgressoLeitura() {
  if (document.querySelector(".reading-progress")) return;
  const progresso = document.createElement("div");
  progresso.className = "reading-progress";
  progresso.setAttribute("aria-hidden", "true");
  document.body.append(progresso);
  const atualizar = () => {
    const altura = document.documentElement.scrollHeight - window.innerHeight;
    const porcentagem = altura > 0 ? Math.min(100, (window.scrollY / altura) * 100) : 0;
    progresso.style.width = porcentagem + "%";
  };
  window.addEventListener("scroll", atualizar, { passive: true });
  window.addEventListener("resize", atualizar);
  atualizar();
}

aprimorarMenu();
adicionarProgressoLeitura();

function criarInteracoesInicio() {
  const filtros = document.querySelectorAll("[data-news-filter]");
  const noticias = document.querySelectorAll("[data-news]");
  filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
      const categoria = filtro.dataset.newsFilter;
      filtros.forEach((item) => item.setAttribute("aria-pressed", String(item === filtro)));
      noticias.forEach((noticia) => {
        noticia.hidden = categoria !== "todos" && noticia.dataset.news !== categoria;
      });
    });
  });

  const buscaGuia = document.getElementById("busca-guia");
  const linksGuia = document.querySelectorAll(".guide-grid a");
  const guiaVazio = document.querySelector(".guide-empty");
  if (buscaGuia && linksGuia.length) {
    buscaGuia.addEventListener("input", () => {
      const termo = buscaGuia.value.trim().toLocaleLowerCase("pt-BR");
      let encontrados = 0;
      linksGuia.forEach((link) => {
        const mostrar = link.textContent.toLocaleLowerCase("pt-BR").includes(termo);
        link.hidden = !mostrar;
        if (mostrar) encontrados++;
      });
      if (guiaVazio) guiaVazio.hidden = encontrados !== 0;
    });
  }
}

criarInteracoesInicio();

function aplicarImagensDaBiblioteca() {
  const fotos = {
    tipografia: ["pexels-ugurlu-photographer-108972-336407.jpg", "Livro aberto com óculos sobre as páginas"],
    tempo: ["pexels-markusspiske-242204.jpg", "Computador exibindo um relógio digital"],
    estresse: ["pexels-ann-h-45017-38514396.jpg", "Peça vermelha afastada de um grupo de peças de madeira"],
    erros: ["pexels-markus-winkler-1430818-19825314.jpg", "Letras de madeira formando a palavra inovação"],
    seguranca: ["pexels-alex-dos-santos-305643819-20242976.jpg", "Cadeado preso a elos de uma corrente"],
    responsivo: ["pexels-click-jeth-703137695-18530501.jpg", "Celular exibindo uma página de pesquisa"],
    personalizacao: ["pexels-ds-stories-6990339.jpg", "Peças coloridas representando pessoas diversas"],
    inteligencia: ["pexels-bertellifotografia-16094045.jpg", "Pessoa utilizando uma ferramenta de inteligência artificial no computador"],
    leitura: ["pexels-yankrukov-7694382.jpg", "Pessoa lendo um livro em braille com as mãos"],
    gestos: ["pexels-anastasia-shuraeva-9501978.jpg", "Mãos de várias pessoas reunidas"],
    notificacoes: ["pexels-esmerald-34445331.jpg", "Sino dourado suspenso"],
    teclado: ["pexels-bertellifotografia-30530419.jpg", "Interface digital exibida acima de um teclado"],
    pagamento: ["pexels-pixabay-256517.jpg", "Livros sobre internet organizados em uma biblioteca"],
    usabilidade: ["pexels-shvets-production-6980223.jpg", "Mulher em cadeira de rodas utilizando um celular"],
    servicos: ["pexels-timur-weber-9532000.jpg", "Pessoa solicitando trabalho e alimentação"],
    experiencia: ["pexels-ai25studio-8790887.jpg", "Casal idoso utilizando um celular junto"],
    movimentos: ["pexels-daniel-gomez-2158503858-35693313.jpg", "Pessoas em cadeiras de rodas atravessando uma via urbana"],
    controle: ["pexels-burst-374103.jpg", "Parede com várias câmeras de monitoramento"],
    auditivo: ["pexels-gustavo-fring-7446747.jpg", "Pessoa percorrendo com as mãos uma página em braille"],
    tecnologia: ["pexels-eren-li-7188725.jpg", "Pessoa com bengala sobre piso tátil"],
    dispositivos: ["pexels-pedro-lucca-557027795-35833399.jpg", "Pessoas idosas viajando em transporte coletivo"],
    fraudes: ["pexels-alex-dos-santos-305643819-20242976.jpg", "Cadeado e corrente representando proteção"],
    social: ["pexels-guilman-2204305-5939399.jpg", "Pessoas ocupando uma avenida urbana"],
    frameworks: ["pexels-pavel-danilyuk-7521282.jpg", "Pessoa organizando um diagrama em uma lousa"]
  };
  const cartoes = [...document.querySelectorAll(".function-card[data-href]")];
  cartoes.forEach((cartao, indice) => {
    const imagem = cartao.querySelector("img");
    if (!imagem) return;
    const nomeArquivo = cartao.dataset.href.replace(/\.html(?:#.*)?$/, "");
    const foto = fotos[nomeArquivo];
    if (foto) { imagem.src = `imagem/pexels/${foto[0]}`; imagem.alt = foto[1]; }
    imagem.loading = indice === 0 ? "eager" : "lazy";
    imagem.decoding = "async";
  });

  const imagensGerais = [
    [".mini img", "pexels-kleison-leopoldino-219870943-36760144.jpg", "Mãos lendo uma página em braille"],
    [".stage > img", "pexels-ai25studio-8790887.jpg", "Casal idoso utilizando um celular com autonomia"],
    [".resource[href='leitura.html'] img", "pexels-gustavo-fring-7446747.jpg", "Pessoa lendo um livro em braille"],
    [".resource[href='movimentos.html'] img", "pexels-shvets-production-6980223.jpg", "Mulher em cadeira de rodas utilizando tecnologia"],
  ];
  imagensGerais.forEach(([seletor, arquivo, descricao]) => {
    const imagem = document.querySelector(seletor);
    if (imagem) { imagem.src = `imagem/pexels/${arquivo}`; imagem.alt = descricao; }
  });
}

aplicarImagensDaBiblioteca();

function lerDados(chave, padrao) {
  try { return JSON.parse(localStorage.getItem(chave) || JSON.stringify(padrao)); } catch { return padrao; }
}

function salvarVisitaAtual() {
  const pagina = document.querySelector(".sidebar a.active");
  if (!pagina || pagina.getAttribute("href") === "index.html") return;
  const recentes = lerDados("acessaweb-recentes", []);
  const item = { titulo: pagina.textContent.trim(), href: pagina.getAttribute("href") };
  const atualizados = [item, ...recentes.filter((registro) => registro.href !== item.href)].slice(0, 3);
  localStorage.setItem("acessaweb-recentes", JSON.stringify(atualizados));
}

const conteudoPrincipal = document.querySelector("main.content");

function criarContextoDoTopico() {
  if (!conteudoPrincipal || document.body.classList.contains("home-page") || document.querySelector(".home") || document.querySelector(".page-context")) return;
  const links = [...document.querySelectorAll(".sidebar a")];
  const atual = document.querySelector(".sidebar a.active");
  const indice = links.indexOf(atual);
  const proximo = links[indice + 1] || links[1];
  const contexto = document.createElement("div");
  contexto.className = "page-context";
  contexto.innerHTML = `<span class="page-context__meta">Biblioteca de diretrizes · ${Math.max(1, indice)} de ${Math.max(1, links.length - 1)}</span>`;
  const favorito = document.createElement("button");
  favorito.type = "button";
  favorito.className = "favorite-topic";
  favorito.textContent = "Adicionar aos favoritos";
  const hrefAtual = atual?.getAttribute("href");
  const favoritos = lerDados("acessaweb-favoritos", []);
  favorito.setAttribute("aria-pressed", String(favoritos.includes(hrefAtual)));
  if (favoritos.includes(hrefAtual)) favorito.textContent = "Nos favoritos";
  favorito.addEventListener("click", () => {
    const lista = lerDados("acessaweb-favoritos", []);
    const existe = lista.includes(hrefAtual);
    const atualizada = existe ? lista.filter((item) => item !== hrefAtual) : [...lista, hrefAtual];
    localStorage.setItem("acessaweb-favoritos", JSON.stringify(atualizada));
    favorito.setAttribute("aria-pressed", String(!existe));
    favorito.textContent = existe ? "Adicionar aos favoritos" : "Nos favoritos";
  });
  contexto.append(favorito);
  conteudoPrincipal.prepend(contexto);
  if (proximo) {
    const proximaEtapa = document.createElement("section");
    proximaEtapa.className = "page-next";
    proximaEtapa.innerHTML = `<div><small>PRÓXIMO TÓPICO</small><strong>${proximo.textContent.trim()}</strong></div><a href="${proximo.getAttribute("href")}">Continuar →</a>`;
    conteudoPrincipal.append(proximaEtapa);
  }
}

function preencherPainelPessoal() {
  const recentes = lerDados("acessaweb-recentes", []);
  const favoritos = lerDados("acessaweb-favoritos", []);
  const listaRecente = document.getElementById("recentes-lista");
  const listaFavoritos = document.getElementById("favoritos-lista");
  const links = [...document.querySelectorAll(".guide-grid a")];
  const porHref = new Map(links.map((link) => [link.getAttribute("href"), link.textContent.trim()]));
  if (listaRecente) {
    listaRecente.innerHTML = recentes.length ? recentes.map((item) => `<a href="${item.href}">${item.titulo}<span>Continuar →</span></a>`).join("") : "<p>Ao abrir um tema, ele aparecerá aqui para facilitar sua continuidade.</p>";
  }
  if (listaFavoritos) {
    listaFavoritos.innerHTML = favoritos.length ? favoritos.map((href) => `<a href="${href}">${porHref.get(href) || "Tema salvo"}<span>Abrir →</span></a>`).join("") : "<p>Use o botão de favoritos dentro de qualquer tópico para criar seus atalhos.</p>";
  }
}

lerDados("acessaweb-preferencias", []);
lerDados("acessaweb-recentes", []);
salvarVisitaAtual();
criarContextoDoTopico();
preencherPainelPessoal();

if (conteudoPrincipal && !document.querySelector(".skip-link")) {
  if (!conteudoPrincipal.id) conteudoPrincipal.id = "conteudo-principal";
  const atalho = document.createElement("a");
  atalho.className = "skip-link";
  atalho.href = "#" + conteudoPrincipal.id;
  atalho.textContent = "Pular para o conteúdo";
  document.body.prepend(atalho);
}

if (conteudoPrincipal && !document.body.classList.contains("home-page") && !document.querySelector(".home") && !document.querySelector(".return-to-guide")) {
  const voltarAoGuia = document.createElement("a");
  voltarAoGuia.className = "return-to-guide";
  voltarAoGuia.href = "index.html";
  voltarAoGuia.innerHTML = "<span aria-hidden=\"true\">←</span> Voltar ao guia";
  conteudoPrincipal.prepend(voltarAoGuia);
}

function criarPainelAcessibilidade() {
  if (document.querySelector(".accessibility-toggle")) return;

  const opcoes = [
    ["fonte-grande", "Texto maior", "Aumentar o tamanho do texto"],
    ["fonte-extra-grande", "Texto extra grande", "Usar texto extra grande"],
    ["espacamento-ampliado", "Mais espaçamento", "Aumentar o espaçamento entre linhas e letras"],
    ["alto-contraste", "Alto contraste", "Ativar alto contraste"],
    ["modo-leitura", "Modo leitura", "Usar fundo e texto pensados para leitura prolongada"],
    ["movimento-reduzido", "Reduzir movimento", "Desativar animações e transições"],
  ];
  let preferenciasSalvas = [];
  try {
    preferenciasSalvas = JSON.parse(localStorage.getItem("acessaweb-preferencias") || "[]");
  } catch {
    localStorage.removeItem("acessaweb-preferencias");
  }
  preferenciasSalvas.forEach((classe) => document.body.classList.add(classe));

  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "accessibility-toggle";
  botao.setAttribute("aria-expanded", "false");
  botao.setAttribute("aria-controls", "painel-acessibilidade");
  botao.textContent = "Acessibilidade";

  const painel = document.createElement("section");
  painel.id = "painel-acessibilidade";
  painel.className = "accessibility-panel";
  painel.hidden = true;
  painel.setAttribute("aria-label", "Opções de acessibilidade");
  painel.innerHTML = "<h2>Personalize sua navegação</h2><p>Escolha as opções que deixam a leitura mais confortável.</p><div class=\"accessibility-actions\"></div>";
  const acoes = painel.querySelector(".accessibility-actions");

  function salvarPreferencias() {
    const ativas = opcoes.map(([classe]) => classe).filter((classe) => document.body.classList.contains(classe));
    localStorage.setItem("acessaweb-preferencias", JSON.stringify(ativas));
  }

  opcoes.forEach(([classe, rotulo, descricao]) => {
    const controle = document.createElement("button");
    controle.type = "button";
    controle.textContent = rotulo;
    controle.title = descricao;
    controle.setAttribute("aria-pressed", String(document.body.classList.contains(classe)));
    controle.addEventListener("click", () => {
      if (classe === "fonte-grande" && document.body.classList.contains("fonte-extra-grande")) document.body.classList.remove("fonte-extra-grande");
      if (classe === "fonte-extra-grande" && document.body.classList.contains("fonte-grande")) document.body.classList.remove("fonte-grande");
      document.body.classList.toggle(classe);
      painel.querySelectorAll("button[data-classe]").forEach((item) => item.setAttribute("aria-pressed", String(document.body.classList.contains(item.dataset.classe))));
      salvarPreferencias();
    });
    controle.dataset.classe = classe;
    acoes.append(controle);
  });

  const ouvir = document.createElement("button");
  ouvir.type = "button";
  ouvir.textContent = "Ouvir esta página";
  ouvir.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const mensagem = new SpeechSynthesisUtterance((document.querySelector("main.content") || document.body).innerText);
    mensagem.lang = "pt-BR";
    window.speechSynthesis.speak(mensagem);
  });
  acoes.append(ouvir);

  const resetar = document.createElement("button");
  resetar.type = "button";
  resetar.className = "accessibility-reset";
  resetar.textContent = "Restaurar preferências";
  resetar.addEventListener("click", () => {
    opcoes.forEach(([classe]) => document.body.classList.remove(classe));
    localStorage.removeItem("acessaweb-preferencias");
    painel.querySelectorAll("button[data-classe]").forEach((item) => item.setAttribute("aria-pressed", "false"));
  });
  acoes.append(resetar);

  botao.addEventListener("click", () => {
    painel.hidden = !painel.hidden;
    botao.setAttribute("aria-expanded", String(!painel.hidden));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !painel.hidden) {
      painel.hidden = true;
      botao.setAttribute("aria-expanded", "false");
      botao.focus();
    }
  });
  document.body.append(botao, painel);
}
