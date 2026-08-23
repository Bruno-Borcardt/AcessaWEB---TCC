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

const catalogoTemas = [
  ["tipografia.html", "Tipografia e textos", "Legibilidade", "pexels-ugurlu-photographer-108972-336407.jpg"],
  ["tempo.html", "Tempo e interação", "Ritmo", "pexels-markusspiske-242204.jpg"],
  ["estresse.html", "Redução de estresse", "Conforto", "pexels-ann-h-45017-38514396.jpg"],
  ["erros.html", "Prevenção de erros", "Clareza", "pexels-markus-winkler-1430818-19825314.jpg"],
  ["seguranca.html", "Segurança", "Proteção", "pexels-alex-dos-santos-305643819-20242976.jpg"],
  ["responsivo.html", "Design responsivo", "Adaptação", "pexels-click-jeth-703137695-18530501.jpg"],
  ["personalizacao.html", "Personalização", "Escolha", "pexels-ds-stories-6990339.jpg"],
  ["inteligencia.html", "Acessibilidade com IA", "Apoio", "pexels-bertellifotografia-16094045.jpg"],
  ["leitura.html", "Facilitação de leitura", "Compreensão", "pexels-yankrukov-7694382.jpg"],
  ["gestos.html", "Suporte a gestos", "Alternativas", "pexels-anastasia-shuraeva-9501978.jpg"],
  ["notificacoes.html", "Notificações", "Avisos", "pexels-esmerald-34445331.jpg"],
  ["teclado.html", "Navegação por teclado", "Operação", "pexels-bertellifotografia-30530419.jpg"],
  ["pagamento.html", "Pagamentos", "Confiança", "pexels-pixabay-256517.jpg"],
  ["usabilidade.html", "Testes de usabilidade", "Pesquisa", "pexels-shvets-production-6980223.jpg"],
  ["servicos.html", "Serviços essenciais", "Acesso", "pexels-timur-weber-9532000.jpg"],
  ["experiencia.html", "Níveis de experiência", "Aprendizado", "pexels-ai25studio-8790887.jpg"],
  ["movimentos.html", "Suporte a movimentos", "Mobilidade", "pexels-daniel-gomez-2158503858-35693313.jpg"],
  ["controle.html", "Controle da interface", "Autonomia", "pexels-burst-374103.jpg"],
  ["auditivo.html", "Recursos auditivos", "Percepção", "pexels-gustavo-fring-7446747.jpg"],
  ["tecnologia.html", "Tecnologia assistiva", "Compatibilidade", "pexels-eren-li-7188725.jpg"],
  ["dispositivos.html", "Dispositivos antigos", "Alcance", "pexels-pedro-lucca-557027795-35833399.jpg"],
  ["fraudes.html", "Proteção contra fraudes", "Prevenção", "pexels-alex-dos-santos-305643819-20242976.jpg"],
  ["social.html", "Engajamento social", "Participação", "pexels-guilman-2204305-5939399.jpg"],
  ["frameworks.html", "Frameworks", "Implementação", "pexels-pavel-danilyuk-7521282.jpg"]
];

const conteudoEditorial = [
  ["tipografia.html","AW-01","Pessoas idosas, com baixa visão e dislexia","Ler não pode ser um teste de resistência. Quando letras pequenas, linhas apertadas e baixo contraste impedem a compreensão, o projeto escolhe quem pode participar.","Permitir ampliação sem perda de conteúdo, usar hierarquia clara, largura de linha confortável e contraste suficiente.",["WCAG 2.2 — 1.4.3, 1.4.4 e 1.4.12","eMAG 3.1 — Apresentação e design","ABNT NBR 17225:2025 — conteúdo textual"]],
  ["tempo.html","AW-02","Pessoas idosas, neurodivergentes e com limitações motoras","Pressa imposta pela interface é uma barreira fabricada. Ninguém deve perder um direito, uma compra ou um atendimento porque precisou de mais tempo.","Avisar sobre limites, permitir extensão, pausar sessões e preservar dados já preenchidos.",["WCAG 2.2 — 2.2.1 a 2.2.6","eMAG 3.1 — Comportamento","LBI — acesso à informação e aos serviços"]],
  ["estresse.html","AW-03","Pessoas autistas, ansiosas, com TDAH ou comprometimento cognitivo","Interfaces agressivas, imprevisíveis e saturadas não são apenas incômodas: afastam pessoas. Clareza e calma também são condições de cidadania digital.","Reduzir interrupções, eliminar urgência artificial, antecipar etapas e oferecer saídas claras.",["WCAG 2.2 — 2.2.2, 2.3.3 e 3.2","eMAG 3.1 — Comportamento","WCAG 2.2 — orientação consistente"]],
  ["erros.html","AW-04","Pessoas com dislexia, deficiência cognitiva, baixa escolaridade e idosos","Punir o erro do usuário é esconder o erro do projeto. Serviços inclusivos explicam, preservam o trabalho realizado e devolvem caminhos de correção.","Identificar o campo, explicar a solução em linguagem simples, validar antes do envio e permitir revisão.",["WCAG 2.2 — 3.3.1 a 3.3.8","eMAG 3.1 — Conteúdo e formulários","LBI — atendimento acessível"]],
  ["seguranca.html","AW-05","Idosos, pessoas com deficiência cognitiva e novos usuários digitais","Segurança que ninguém compreende transfere o risco para quem já está vulnerável. Proteger é informar sem medo, jargão ou armadilhas.","Explicar permissões, confirmar ações críticas, mostrar destino de dados e oferecer recuperação acessível.",["WCAG 2.2 — 3.3.7 e 3.3.8","eMAG 3.1 — Formulários","LBI — proteção e autonomia"]],
  ["responsivo.html","AW-06","Pessoas com baixa visão, mobilidade reduzida e acesso apenas por celular","Acesso não pode depender do tamanho da tela nem do preço do aparelho. Um conteúdo que some no zoom também exclui.","Reorganizar conteúdo sem rolagem em duas direções, preservar foco e garantir alvos de toque adequados.",["WCAG 2.2 — 1.4.10 e 2.5.8","eMAG 3.1 — Apresentação e design","ABNT NBR 17225:2025 — responsividade"]],
  ["personalizacao.html","AW-07","Pessoas com baixa visão, dislexia, fotossensibilidade e neurodivergência","Não existe uma única forma correta de perceber e interagir. Dar escolha é reconhecer que autonomia não é privilégio.","Oferecer ajustes de fonte, contraste, espaçamento e movimento, mantendo preferências salvas.",["WCAG 2.2 — 1.4 e 2.3.3","eMAG 3.1 — Apresentação","LBI — desenho universal"]],
  ["inteligencia.html","AW-08","Pessoas com deficiência que utilizam automação e tecnologia assistiva","IA não pode decidir quem merece ser compreendido. Automação inclusiva amplia capacidades, explica limites e mantém pessoas no controle.","Informar uso de IA, permitir revisão humana, evitar inferências discriminatórias e fornecer alternativa manual.",["WCAG 2.2 — 3.3.8 e 4.1.2","LBI — não discriminação","Princípios de transparência e supervisão humana"]],
  ["leitura.html","AW-09","Pessoas com dislexia, deficiência intelectual, baixa escolaridade e idosos","Informação pública incompreensível é informação negada. Linguagem simples não empobrece ideias; amplia quem pode agir sobre elas.","Usar frases diretas, resumos, títulos descritivos, listas e explicação de termos técnicos.",["WCAG 2.2 — 3.1.3 a 3.1.5","eMAG 3.1 — Informação e conteúdo","LBI — comunicação acessível"]],
  ["gestos.html","AW-10","Pessoas com tremores, paralisia, amputações ou baixa precisão motora","Nenhum gesto complexo deve funcionar como catraca digital. Toda ação precisa de uma alternativa simples e equivalente.","Substituir arrastar, pinçar e trajetórias por toque único, botões e controles de teclado.",["WCAG 2.2 — 2.5.1, 2.5.2 e 2.5.7","eMAG 3.1 — Comportamento","ABNT NBR 17225:2025 — entrada acessível"]],
  ["notificacoes.html","AW-11","Pessoas surdas, cegas, com TDAH ou deficiência cognitiva","Um aviso percebido por apenas um sentido deixa parte do público para trás. Comunicação importante precisa chegar sem assustar nem desaparecer.","Combinar texto, ícone, som e anúncio por leitor de tela; permitir pausa e histórico.",["WCAG 2.2 — 1.3.1, 1.4.1 e 4.1.3","eMAG 3.1 — Comportamento","WCAG 2.2 — mensagens de status"]],
  ["teclado.html","AW-12","Pessoas cegas e pessoas com limitações motoras","Se uma tarefa exige mouse, ela já fechou a porta para muita gente. Teclado não é atalho: é acesso integral.","Garantir ordem lógica, foco visível, ausência de armadilhas e acesso a todos os controles.",["WCAG 2.2 — 2.1.1, 2.1.2 e 2.4.7","eMAG 3.1 — Marcação e comportamento","ABNT NBR 17225:2025 — navegação"]],
  ["pagamento.html","AW-13","Idosos, pessoas com deficiência cognitiva, visual ou motora","Comprar, pagar e movimentar recursos com autonomia é participação econômica. Barreiras nessa etapa transformam dependência em regra.","Resumir valores, identificar taxas, permitir revisão, salvar progresso e oferecer autenticação acessível.",["WCAG 2.2 — 3.3.4, 3.3.7 e 3.3.8","eMAG 3.1 — Formulários","LBI — igualdade de oportunidades"]],
  ["usabilidade.html","AW-14","Pessoas com deficiência historicamente ausentes dos testes","Nada sobre acessibilidade deve ser validado sem pessoas com deficiência. Inclusão não se presume em laboratório: constrói-se com participação.","Recrutar perfis diversos, testar com tecnologias assistivas e registrar barreiras por impacto.",["WCAG 2.2 — critérios de conformidade","eMAG 3.1 — processo de avaliação","LBI — participação social"]],
  ["servicos.html","AW-15","Pessoas com deficiência, idosos e cidadãos em vulnerabilidade social","Saúde, educação e cidadania não podem depender de habilidade tecnológica. Quando um serviço essencial exclui, o direito existe apenas no papel.","Priorizar tarefas essenciais, oferecer ajuda humana, linguagem simples e canais equivalentes.",["LBI — acesso a serviços e informação","eMAG 3.1 — governo eletrônico","WCAG 2.2 — nível AA"]],
  ["experiencia.html","AW-16","Novos usuários, idosos e pessoas com baixa alfabetização digital","Experiência prévia não pode ser senha de entrada para a vida digital. Todo sistema deve ensinar sem humilhar e avançar sem abandonar.","Criar orientação inicial, exemplos, ajuda contextual e caminhos simples ou avançados.",["WCAG 2.2 — 3.2 e 3.3","eMAG 3.1 — Conteúdo","LBI — inclusão digital"]],
  ["movimentos.html","AW-17","Pessoas com paralisia, artrite, tremores ou baixa coordenação","Corpos diferentes não são falhas de interação. Controles rígidos é que falham quando exigem uma precisão que milhões de pessoas não têm.","Aumentar áreas clicáveis, espaçar controles e evitar ações dependentes de força, tempo ou precisão.",["WCAG 2.2 — 2.5.5 e 2.5.8","eMAG 3.1 — Comportamento","ABNT NBR 17225:2025 — operação"]],
  ["controle.html","AW-18","Pessoas neurodivergentes, com deficiência cognitiva ou sensorial","A interface deve obedecer à pessoa, não capturá-la. Reprodução automática, mudanças inesperadas e escolhas irreversíveis retiram autonomia.","Permitir pausar, desfazer, fechar, revisar e controlar qualquer conteúdo em movimento.",["WCAG 2.2 — 2.2.2, 3.2.1 e 3.2.2","eMAG 3.1 — Comportamento","LBI — autonomia"]],
  ["auditivo.html","AW-19","Pessoas surdas, ensurdecidas e com deficiência auditiva","Conteúdo apenas em áudio silencia quem não pode ouvi-lo. Legenda, transcrição e Libras são meios de participação, não acessórios.","Fornecer legenda sincronizada, transcrição, identificação de falantes e controle de volume.",["WCAG 2.2 — 1.2.1 a 1.2.6","eMAG 3.1 — Multimídia","LBI — recursos de comunicação"]],
  ["tecnologia.html","AW-20","Pessoas cegas, com baixa visão, surdas ou limitações motoras","Tecnologia assistiva é ponte para autonomia. Código incompatível transforma essa ponte em muro e força dependência onde deveria haver liberdade.","Usar HTML semântico, nomes acessíveis, estados programáticos e testes com leitores de tela.",["WCAG 2.2 — 1.3.1 e 4.1.2","eMAG 3.1 — Marcação","ABNT NBR 17225:2025 — interoperabilidade"]],
  ["dispositivos.html","AW-21","Pessoas de baixa renda e moradores de regiões com conexão limitada","Inclusão digital não existe quando o serviço exige aparelho novo e internet rápida. Desempenho também é justiça social.","Reduzir peso, funcionar em conexões instáveis, evitar dependências excessivas e oferecer modo leve.",["LBI — inclusão digital","eMAG 3.1 — acesso universal","WCAG 2.2 — reflow e compatibilidade"]],
  ["fraudes.html","AW-22","Idosos, pessoas com deficiência cognitiva e usuários pouco experientes","Fraudes exploram desigualdades de informação. Uma plataforma responsável previne manipulação e não culpa a vítima por ter confiado.","Sinalizar risco, confirmar destinatário, limitar urgência artificial e facilitar bloqueio e denúncia.",["WCAG 2.2 — 3.3.7 e 3.3.8","LBI — proteção da pessoa com deficiência","Boas práticas de segurança acessível"]],
  ["social.html","AW-23","Pessoas com deficiência, idosos e grupos socialmente isolados","Participar da cultura e da vida pública é um direito. Plataformas que tornam pessoas invisíveis reproduzem exclusão fora da tela.","Criar perfis acessíveis, moderação inclusiva, descrição de mídia e ferramentas de comunidade seguras.",["LBI — participação na vida pública e cultural","WCAG 2.2 — 1.1.1 e 1.2","eMAG 3.1 — Conteúdo"]],
  ["frameworks.html","AW-24","Equipes que precisam incorporar inclusão desde o primeiro componente","Acessibilidade não pode depender de heroísmo individual no fim do projeto. Ela precisa estar na infraestrutura, nos padrões e nas decisões de equipe.","Criar componentes semânticos, testes automatizados e manuais, documentação e critérios de aceite.",["WCAG 2.2 — conformidade AA","eMAG 3.1 — recomendações de implementação","ABNT NBR 17225:2025 — requisitos técnicos"]]
];

function alternarFavorito(href) {
  const favoritos = lerDados("acessaweb-favoritos", []);
  const existe = favoritos.includes(href);
  const atualizados = existe ? favoritos.filter((item) => item !== href) : [...favoritos, href];
  localStorage.setItem("acessaweb-favoritos", JSON.stringify(atualizados));
  document.dispatchEvent(new CustomEvent("acessaweb:favoritos", { detail: atualizados }));
  return !existe;
}

function criarNavegacaoSalvos() {
  const menu = document.querySelector(".sidebar ul");
  if (menu && !menu.querySelector('a[href="salvos.html"]')) {
    const item = document.createElement("li");
    item.innerHTML = '<a href="salvos.html" class="saved-menu-link"><span aria-hidden="true">♡</span> Salvos <b class="saved-menu-count">0</b></a>';
    const inicio = menu.querySelector("li");
    inicio?.after(item);
  }
  const hub = document.querySelector(".hub-nav");
  if (hub && !hub.querySelector('a[href="salvos.html"]')) {
    const link = document.createElement("a"); link.href = "salvos.html"; link.className = "saved-hub-link"; link.innerHTML = '♡ Salvos <span>0</span>'; hub.append(link);
  }
  atualizarContadoresSalvos();
}

function atualizarContadoresSalvos() {
  const total = lerDados("acessaweb-favoritos", []).length;
  document.querySelectorAll(".saved-menu-count,.saved-hub-link span").forEach((item) => item.textContent = total);
}

function criarFavoritosBiblioteca() {
  document.querySelectorAll(".function-card[data-href]").forEach((cartao) => {
    if (cartao.parentElement?.classList.contains("function-card-shell")) return;
    const envoltorio = document.createElement("div");
    envoltorio.className = "function-card-shell";
    cartao.before(envoltorio); envoltorio.append(cartao);
    const botao = document.createElement("span");
    botao.className = "favorite-card"; botao.tabIndex = 0; botao.setAttribute("role", "button");
    const atualizar = () => { const salvo = lerDados("acessaweb-favoritos", []).includes(cartao.dataset.href); botao.textContent = salvo ? "♥" : "♡"; botao.setAttribute("aria-pressed", String(salvo)); botao.setAttribute("aria-label", `${salvo ? "Remover" : "Salvar"} ${cartao.querySelector(".function-card__copy b").textContent}`); };
    const alternar = (event) => { event.preventDefault(); event.stopPropagation(); alternarFavorito(cartao.dataset.href); atualizar(); atualizarContadoresSalvos(); };
    botao.addEventListener("pointerdown", (event) => event.stopPropagation());
    botao.addEventListener("click", alternar);
    botao.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") alternar(event); });
    envoltorio.append(botao); atualizar();
  });
}

function salvarVisitaAtual() {
  if (document.body.classList.contains("saved-page")) return;
  const pagina = document.querySelector(".sidebar a.active");
  if (!pagina || pagina.getAttribute("href") === "index.html") return;
  const recentes = lerDados("acessaweb-recentes", []);
  const item = { titulo: pagina.textContent.trim(), href: pagina.getAttribute("href") };
  const atualizados = [item, ...recentes.filter((registro) => registro.href !== item.href)].slice(0, 3);
  localStorage.setItem("acessaweb-recentes", JSON.stringify(atualizados));
}

const conteudoPrincipal = document.querySelector("main.content");

function criarContextoDoTopico() {
  if (!conteudoPrincipal || document.body.classList.contains("home-page") || document.body.classList.contains("saved-page") || document.querySelector(".home") || document.querySelector(".page-context")) return;
  const atual = document.querySelector(".sidebar a.active");
  const hrefAtual = atual?.getAttribute("href");
  const indice = catalogoTemas.findIndex((tema) => tema[0] === hrefAtual);
  const editorial = conteudoEditorial.find((tema) => tema[0] === hrefAtual);
  if (!atual || indice < 0 || !editorial) return;
  const anterior = catalogoTemas[(indice - 1 + catalogoTemas.length) % catalogoTemas.length];
  const proximo = catalogoTemas[(indice + 1) % catalogoTemas.length];
  const contexto = document.createElement("div");
  contexto.className = "page-context";
  contexto.innerHTML = `<nav class="topic-shortcuts" aria-label="Atalhos desta página"><a href="index.html">Início</a><a href="index.html#funcoes">24 funções</a><a href="index.html#normativas">Normativas</a><a href="salvos.html">Salvos</a></nav><span class="page-context__meta">${editorial[1]} · ${indice + 1} de ${catalogoTemas.length}</span>`;
  const favorito = document.createElement("button");
  favorito.type = "button";
  favorito.className = "favorite-topic";
  favorito.textContent = "♡ Salvar função";
  const favoritos = lerDados("acessaweb-favoritos", []);
  favorito.setAttribute("aria-pressed", String(favoritos.includes(hrefAtual)));
  if (favoritos.includes(hrefAtual)) favorito.textContent = "♥ Função salva";
  favorito.addEventListener("click", () => {
    const salvo = alternarFavorito(hrefAtual);
    favorito.setAttribute("aria-pressed", String(salvo));
    favorito.textContent = salvo ? "♥ Função salva" : "♡ Salvar função";
    atualizarContadoresSalvos();
  });
  contexto.append(favorito);
  conteudoPrincipal.prepend(contexto);

  let secaoInicial = conteudoPrincipal.querySelector(":scope > .section");
  if (!secaoInicial) {
    const tituloSolto = conteudoPrincipal.querySelector(":scope > h1");
    if (tituloSolto) {
      secaoInicial = document.createElement("section");
      tituloSolto.before(secaoInicial);
      secaoInicial.append(tituloSolto);
      const introducaoSolta = secaoInicial.nextElementSibling;
      if (introducaoSolta?.tagName === "P") secaoInicial.append(introducaoSolta);
    }
  }
  const titulo = secaoInicial?.querySelector("h1")?.textContent.trim() || atual.textContent.trim();
  const descricaoOriginal = secaoInicial?.querySelector("p")?.textContent.trim() || "";
  const imagem = catalogoTemas[indice][3];
  const citacoes = {
    "leitura.html": ["A leitura do mundo precede a leitura da palavra.", "Paulo Freire"],
    "tipografia.html": ["A leitura do mundo precede a leitura da palavra.", "Paulo Freire"],
    "social.html": ["A sociedade sempre acaba vencendo, mesmo ante a inércia ou o antagonismo do Estado.", "Ulysses Guimarães"],
    "servicos.html": ["A Constituição é caracteristicamente o estatuto do homem, da liberdade e da democracia.", "Ulysses Guimarães"]
  };
  const citacao = citacoes[hrefAtual];
  if (secaoInicial) {
    secaoInicial.className = "topic-hero";
    secaoInicial.innerHTML = `<div class="topic-hero__copy"><span class="topic-code">${editorial[1]} · DIRETRIZ PRÁTICA</span><h1>${titulo}</h1><p class="topic-audience"><strong>Quem precisa estar no centro:</strong> ${editorial[2]}</p><p class="topic-manifesto">${editorial[3]}</p>${citacao ? `<blockquote>“${citacao[0]}”<cite>— ${citacao[1]}</cite></blockquote>` : ""}</div><figure><img src="imagem/pexels/${imagem}" alt="Imagem documental relacionada a ${titulo.toLowerCase()}"><figcaption>Inclusão em foco · ${editorial[2]}</figcaption></figure>`;
  }

  const pratica = document.createElement("section");
  pratica.className = "topic-practice";
  pratica.innerHTML = `<div><small>O AJUSTE NA PRÁTICA</small><h2>O que precisa mudar</h2><p>${editorial[4]}</p><p class="topic-original-note">${descricaoOriginal}</p></div><div class="topic-standards"><small>POR QUE É UMA EXIGÊNCIA</small><h2>Diretrizes relacionadas</h2><ul>${editorial[5].map((item) => `<li>${item}</li>`).join("")}</ul><a href="index.html#normativas">Consultar linha do tempo normativa →</a></div>`;
  secaoInicial?.after(pratica);

  const exemplo = conteudoPrincipal.querySelector(".example,.caixa-responsiva");
  if (exemplo) {
    exemplo.classList.add("topic-live-example");
    const heading = exemplo.querySelector("h2");
    if (heading) heading.insertAdjacentHTML("beforebegin", "<small>DEMONSTRAÇÃO INTERATIVA</small>");
  }
  const codigo = conteudoPrincipal.querySelector(".code-box");
  if (codigo) {
    codigo.classList.add("topic-code-example");
    const heading = codigo.querySelector("h2");
    if (heading) heading.textContent = `Código do item · ${editorial[1]}`;
  }

  const navegacao = document.createElement("nav");
  navegacao.className = "topic-pagination";
  navegacao.setAttribute("aria-label", "Troca entre funções");
  navegacao.innerHTML = `<a href="${anterior[0]}"><small>← VOLTAR</small><strong>${anterior[1]}</strong></a><a href="index.html#funcoes" class="topic-pagination__all">Ver todas</a><a href="${proximo[0]}"><small>SEGUIR →</small><strong>${proximo[1]}</strong></a>`;
  conteudoPrincipal.append(navegacao);
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

function preencherPaginaSalvos() {
  const grade = document.getElementById("salvos-grade");
  if (!grade) return;
  const resumo = document.getElementById("salvos-resumo");
  const vazio = document.getElementById("salvos-vazio");
  const renderizar = () => {
    const favoritos = lerDados("acessaweb-favoritos", []);
    const itens = favoritos.map((href) => catalogoTemas.find((tema) => tema[0] === href)).filter(Boolean);
    resumo.textContent = `${itens.length} ${itens.length === 1 ? "função salva" : "funções salvas"}`;
    vazio.hidden = itens.length > 0;
    grade.innerHTML = itens.map(([href, titulo, foco, imagem]) => `<article class="saved-card"><img src="imagem/pexels/${imagem}" alt=""><div><small>${foco}</small><h2>${titulo}</h2><div class="saved-card__actions"><a href="${href}">Abrir função ↗</a><button type="button" data-remove-saved="${href}" aria-label="Remover ${titulo} dos salvos">Remover</button></div></div></article>`).join("");
    grade.querySelectorAll("[data-remove-saved]").forEach((botao) => botao.addEventListener("click", () => { alternarFavorito(botao.dataset.removeSaved); renderizar(); atualizarContadoresSalvos(); }));
  };
  renderizar();
  document.addEventListener("acessaweb:favoritos", renderizar);
}

lerDados("acessaweb-preferencias", []);
lerDados("acessaweb-recentes", []);
criarNavegacaoSalvos();
criarFavoritosBiblioteca();
salvarVisitaAtual();
criarContextoDoTopico();
preencherPainelPessoal();
preencherPaginaSalvos();

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
