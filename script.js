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
        ? "Conta excluída com sucesso!"
        : "Ação cancelada.";
}

// Verificar senha
function verificarSenha() {
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem-seguranca");
  
    if (senha.length >= 6) {
      mensagem.innerText = "Senha válida!";
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
    document.getElementById("mensagem-pagamento").innerText = "Compra realizada com sucesso!";
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

const conteudoPrincipal = document.querySelector("main.content");
if (conteudoPrincipal && !document.querySelector(".skip-link")) {
  if (!conteudoPrincipal.id) conteudoPrincipal.id = "conteudo-principal";
  const atalho = document.createElement("a");
  atalho.className = "skip-link";
  atalho.href = "#" + conteudoPrincipal.id;
  atalho.textContent = "Pular para o conteúdo";
  document.body.prepend(atalho);
}




  
