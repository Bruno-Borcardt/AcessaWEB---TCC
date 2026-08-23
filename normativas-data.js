/*
 * Base informacional da futura Linha do Tempo Normativa.
 * Este arquivo não renderiza interface: conteúdo e design permanecem desacoplados.
 */
window.ACESSAWEB_NORMATIVAS = Object.freeze({
  schemaVersion: 1,
  reviewedAt: "2026-08-23",
  disclaimer: "Este conteúdo oferece orientação educativa e não substitui a leitura integral das normas, legislação ou aconselhamento jurídico.",
  items: [
    {
      slug: "emag-31",
      year: 2014,
      date: "2014-04",
      kind: "modelo-governamental",
      title: "eMAG 3.1",
      subtitle: "Modelo de Acessibilidade em Governo Eletrônico",
      status: "Referência oficial",
      scope: "Sítios, portais e serviços digitais do governo brasileiro",
      summary: "Organiza recomendações de acessibilidade adaptadas ao contexto brasileiro e orienta desenvolvimento, avaliação e manutenção de páginas governamentais.",
      whyItMatters: "Transforma princípios internacionais em recomendações de implementação e padronização voltadas à prestação de informações e serviços públicos.",
      tags: ["governo", "serviços públicos", "desenvolvimento", "conteúdo", "multimídia", "formulários"],
      sources: [
        { label: "eMAG 3.1 em HTML", url: "https://emag.governoeletronico.gov.br/", official: true },
        { label: "Modelo de Acessibilidade - Governo Digital", url: "https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/modelo-de-acessibilidade", official: true }
      ],
      practical: [
        { id: "emag-marcacao", title: "Marcação semântica", technical: "Organizar a página com padrões Web, títulos coerentes, regiões e código válido.", practical: "Use HTML pelo significado dos elementos: cabeçalho, navegação, conteúdo principal, seções, listas e botões reais.", test: "Desative o CSS e confirme se a ordem continua lógica; percorra títulos e regiões com tecnologia assistiva.", people: ["leitor de tela", "teclado", "dispositivos antigos"], related: ["WCAG 1.3.1", "WCAG 4.1.2"] },
        { id: "emag-comportamento", title: "Comportamento previsível", technical: "Garantir controle pelo usuário e independência de dispositivo.", practical: "Não abra janelas, altere contexto ou execute ações importantes sem aviso e confirmação.", test: "Conclua as tarefas usando apenas teclado e confirme que foco, menus e diálogos seguem uma ordem previsível.", people: ["mobilidade reduzida", "deficiência visual", "dificuldades cognitivas"], related: ["WCAG 2.1.1", "WCAG 3.2.2"] },
        { id: "emag-conteudo", title: "Conteúdo compreensível", technical: "Fornecer textos claros, títulos descritivos e alternativas para informações visuais.", practical: "Explique siglas, prefira frases diretas e descreva imagens conforme sua função no contexto.", test: "Peça a uma pessoa que não conhece o serviço para explicar a tarefa após ler a página.", people: ["baixa alfabetização digital", "dislexia", "deficiência visual"], related: ["WCAG 1.1.1", "WCAG 3.1.5"] },
        { id: "emag-design", title: "Apresentação adaptável", technical: "Manter contraste, legibilidade, redimensionamento e separação entre conteúdo e apresentação.", practical: "Permita zoom, texto ampliado e reorganização em telas estreitas sem perder funções ou informações.", test: "Teste em 320 CSS pixels e com zoom de 200%; verifique contraste de todos os estados interativos.", people: ["baixa visão", "idosos", "usuários móveis"], related: ["WCAG 1.4.3", "WCAG 1.4.10"] },
        { id: "emag-multimidia", title: "Multimídia equivalente", technical: "Oferecer alternativas sincronizadas para conteúdo sonoro e visual.", practical: "Inclua legendas revisadas, transcrição, audiodescrição quando necessária e controles de reprodução.", test: "Consuma o vídeo sem som e depois sem imagem; confirme que a informação essencial permanece disponível.", people: ["pessoas surdas", "pessoas cegas", "dificuldades de atenção"], related: ["WCAG 1.2.2", "WCAG 1.2.5"] },
        { id: "emag-formularios", title: "Formulários orientados", technical: "Associar rótulos, instruções, agrupamentos e mensagens de erro aos controles.", practical: "Informe o formato esperado antes do erro e mostre como corrigir sem apagar os dados preenchidos.", test: "Preencha com leitor de tela e teclado; provoque erros e confirme anúncio, foco e instrução de correção.", people: ["leitor de tela", "dificuldades cognitivas", "mobilidade reduzida"], related: ["WCAG 3.3.1", "WCAG 3.3.2"] }
      ]
    },
    {
      slug: "lbi",
      year: 2015,
      date: "2015-07-06",
      kind: "legislacao",
      title: "Lei Brasileira de Inclusão",
      subtitle: "Lei nº 13.146/2015",
      status: "Lei federal vigente",
      scope: "Direitos da pessoa com deficiência, incluindo informação, comunicação e internet",
      summary: "Estabelece direitos e obrigações para assegurar inclusão e participação em igualdade de condições. O artigo 63 torna obrigatória a acessibilidade em sites de empresas com sede ou representação no Brasil e órgãos de governo.",
      whyItMatters: "A acessibilidade digital deixa de ser tratada como recurso opcional e passa a integrar a garantia legal de acesso à informação.",
      tags: ["direitos", "cidadania", "internet", "empresas", "governo", "comunicação"],
      sources: [{ label: "Texto integral da Lei nº 13.146/2015", url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm", official: true }],
      practical: [
        { id: "lbi-sites", title: "Acessibilidade obrigatória na internet", technical: "O artigo 63 exige acesso às informações conforme melhores práticas e diretrizes internacionais.", practical: "Inclua acessibilidade no planejamento, contratação, desenvolvimento, publicação e manutenção do site.", test: "Registre quais padrões foram adotados, quando a página foi testada e quais barreiras ainda estão em correção.", people: ["todas as pessoas com deficiência", "idosos", "usuários de tecnologia assistiva"], related: ["LBI art. 63", "WCAG 2.2"] },
        { id: "lbi-planejamento", title: "Planejamento contínuo", technical: "O artigo 61 prevê prioridades, cronograma, recursos e articulação entre setores.", practical: "Crie responsáveis, orçamento, metas e calendário de revisão, evitando correções isoladas apenas após denúncias.", test: "Confirme se existe política documentada, responsáveis nomeados e acompanhamento periódico.", people: ["equipes públicas", "usuários de serviços essenciais"], related: ["LBI art. 61"] },
        { id: "lbi-formatos", title: "Documentos e cobranças acessíveis", technical: "O artigo 62 assegura, mediante solicitação, contas, boletos, recibos, extratos e cobranças em formato acessível.", practical: "Não publique informações essenciais somente em PDFs escaneados; ofereça HTML e documentos estruturados.", test: "Navegue no documento por títulos, leia tabelas e campos e confira ampliação sem perda de conteúdo.", people: ["pessoas cegas", "baixa visão", "dificuldades de leitura"], related: ["LBI art. 62", "WCAG 1.3.1"] },
        { id: "lbi-simbolo", title: "Identificação de acessibilidade", technical: "O artigo 63 prevê símbolo de acessibilidade em destaque nos sites abrangidos.", practical: "Além do símbolo, mantenha uma página que explique recursos disponíveis, limitações conhecidas e canal de contato.", test: "Verifique se a informação é encontrada pelo teclado, leitor de tela e busca interna.", people: ["pessoas com deficiência", "rede de apoio"], related: ["LBI art. 63 §1º"] }
      ]
    },
    {
      slug: "wcag-22",
      year: 2023,
      date: "2023-10-05",
      kind: "padrao-internacional",
      title: "WCAG 2.2",
      subtitle: "Web Content Accessibility Guidelines",
      status: "Recomendação W3C",
      scope: "Conteúdo Web em diferentes dispositivos e tecnologias",
      summary: "Padrão internacional organizado pelos princípios Perceptível, Operável, Compreensível e Robusto, com critérios testáveis nos níveis A, AA e AAA.",
      whyItMatters: "Oferece uma linguagem técnica comum para equipes, governos, fornecedores, pesquisadores e ferramentas de avaliação.",
      tags: ["W3C", "internacional", "perceptível", "operável", "compreensível", "robusto"],
      sources: [
        { label: "WCAG 2.2 - recomendação normativa", url: "https://www.w3.org/TR/WCAG22/", official: true },
        { label: "Novidades da WCAG 2.2", url: "https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/", official: true }
      ],
      practical: [
        { id: "wcag-perceptivel", title: "Perceptível", technical: "Informação e componentes devem ser apresentados de formas que as pessoas possam perceber.", practical: "Ofereça alternativas para imagens e mídia, estrutura adaptável e contraste suficiente.", test: "Consuma o conteúdo sem imagens, sem áudio, com zoom e em alto contraste.", people: ["deficiência visual", "deficiência auditiva", "baixa visão"], related: ["WCAG princípio 1"] },
        { id: "wcag-operavel", title: "Operável", technical: "A interface não pode exigir uma interação que parte dos usuários não consegue realizar.", practical: "Garanta teclado, foco visível, tempo ajustável, alvos confortáveis e alternativas ao arraste.", test: "Conclua todas as tarefas sem mouse e sem gestos complexos.", people: ["mobilidade reduzida", "pessoas cegas", "tremores"], related: ["WCAG princípio 2"] },
        { id: "wcag-compreensivel", title: "Compreensível", technical: "Conteúdo e operação devem ser entendidos e se comportar de modo previsível.", practical: "Use linguagem clara, navegação consistente, instruções e mensagens que expliquem como corrigir erros.", test: "Observe pessoas novas no serviço e registre dúvidas, erros e pedidos de ajuda.", people: ["dificuldades cognitivas", "idosos", "baixa alfabetização digital"], related: ["WCAG princípio 3"] },
        { id: "wcag-robusto", title: "Robusto", technical: "O conteúdo deve ser interpretado por diferentes agentes, incluindo tecnologias assistivas.", practical: "Use elementos HTML nativos, nomes acessíveis e estados programaticamente determinados.", test: "Verifique a árvore de acessibilidade e teste combinações de navegador e tecnologia assistiva.", people: ["usuários de leitores de tela", "controle por voz", "tecnologias futuras"], related: ["WCAG princípio 4"] },
        { id: "wcag-foco", title: "Foco não obscurecido", technical: "Na WCAG 2.2, o componente focado não deve ficar totalmente escondido por conteúdo criado pelo autor.", practical: "Evite que cabeçalhos fixos, banners e diálogos cubram o elemento alcançado por Tab.", test: "Percorra a página com Tab observando o foco em todas as posições de rolagem.", people: ["navegação por teclado", "baixa visão"], related: ["WCAG 2.4.11 AA"] },
        { id: "wcag-arraste", title: "Alternativa ao arraste", technical: "Funções que usam arraste devem ter alternativa por ponteiro sem movimento de arrastar, salvo exceções.", practical: "Além do carrossel arrastável, forneça setas ou seleção direta.", test: "Realize a mesma tarefa com um clique ou toque simples.", people: ["mobilidade reduzida", "tremores", "controle por voz"], related: ["WCAG 2.5.7 AA"] },
        { id: "wcag-alvo", title: "Tamanho mínimo do alvo", technical: "Alvos de ponteiro devem ter pelo menos 24 por 24 CSS pixels ou espaçamento equivalente, salvo exceções.", practical: "Aumente botões pequenos e dê espaço entre ações que causam consequências diferentes.", test: "Meça a área clicável, não apenas o desenho visível do ícone.", people: ["mobilidade reduzida", "idosos", "usuários móveis"], related: ["WCAG 2.5.8 AA"] },
        { id: "wcag-autenticacao", title: "Autenticação acessível", technical: "A autenticação não deve exigir teste cognitivo sem alternativa ou assistência adequada.", practical: "Permita colar senhas, usar gerenciadores, links mágicos ou autenticação biométrica.", test: "Confirme que o fluxo funciona sem memorizar, transcrever ou resolver enigmas.", people: ["dificuldades cognitivas", "dislexia", "idosos"], related: ["WCAG 3.3.8 AA"] }
      ]
    },
    {
      slug: "pned",
      year: 2023,
      date: "2023-01-11",
      kind: "politica-publica",
      title: "Política Nacional de Educação Digital",
      subtitle: "Lei nº 14.533/2023",
      status: "Política nacional vigente",
      scope: "Inclusão, educação, capacitação e pesquisa digital",
      summary: "Articula programas e ações para ampliar acesso a recursos, ferramentas e práticas digitais, priorizando populações vulneráveis.",
      whyItMatters: "Mostra que inclusão digital envolve infraestrutura, competências, autonomia e uso crítico, e não apenas disponibilizar um site.",
      tags: ["inclusão digital", "educação", "competências", "conectividade", "populações vulneráveis"],
      sources: [{ label: "Lei nº 14.533/2023", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14533.htm", official: true }],
      practical: [
        { id: "pned-competencias", title: "Competências digitais e informacionais", technical: "A política prevê sensibilização e formação para uso das tecnologias.", practical: "Acompanhe serviços digitais com tutoriais simples, exemplos, apoio e alternativas de atendimento.", test: "Convide pessoas com pouca experiência digital e observe se conseguem iniciar sem ajuda externa.", people: ["idosos", "baixa alfabetização digital", "populações vulneráveis"], related: ["PNED art. 2º I e III"] },
        { id: "pned-autodiagnostico", title: "Autodiagnóstico", technical: "A PNED inclui ferramentas on-line de autodiagnóstico de competências.", practical: "Permita que o usuário identifique dificuldades e receba um percurso formativo, sem julgamento ou exposição.", test: "Verifique clareza, privacidade, possibilidade de pular perguntas e utilidade das recomendações.", people: ["estudantes", "trabalhadores", "comunidades"], related: ["PNED art. 2º II"] },
        { id: "pned-repositorios", title: "Recursos digitais abertos", technical: "A política prevê facilitar acesso a plataformas e repositórios de recursos digitais.", practical: "Publique componentes, exemplos e materiais acessíveis com licença e formato reutilizável.", test: "Confirme download, leitura por tecnologia assistiva e funcionamento em dispositivos modestos.", people: ["escolas públicas", "ONGs", "pequenos municípios"], related: ["PNED art. 2º IV"] },
        { id: "pned-conectividade", title: "Conectividade com equidade", technical: "A inclusão considera infraestrutura, acesso móvel e equipamentos adequados.", practical: "Desenvolva páginas leves, resilientes a conexão lenta e utilizáveis em aparelhos antigos.", test: "Teste rede limitada, cache, imagens desativadas e aparelhos com menor desempenho.", people: ["zonas rurais", "periferias", "escolas públicas"], related: ["PNED art. 2º VI"] }
      ]
    },
    {
      slug: "abnt-nbr-17225",
      year: 2025,
      date: "2025-03",
      kind: "norma-brasileira",
      title: "ABNT NBR 17225:2025",
      subtitle: "Acessibilidade em conteúdo e aplicações Web - Requisitos",
      status: "Norma técnica brasileira",
      scope: "Conteúdo e aplicações Web no contexto brasileiro",
      summary: "Consolida requisitos brasileiros de acessibilidade digital e dialoga com os critérios de sucesso da WCAG 2.2.",
      whyItMatters: "Cria uma referência técnica nacional mais atual para especificação, contratação, desenvolvimento, avaliação e manutenção de soluções Web.",
      tags: ["ABNT", "requisitos", "contratação", "avaliação", "WCAG 2.2", "Brasil"],
      sources: [{ label: "Catálogo e documentos oficiais da ABNT", url: "https://www.abntcatalogo.com.br/", official: true }],
      practical: [
        { id: "abnt-requisitos", title: "Requisitos verificáveis", technical: "A norma oferece referência para avaliar requisitos de acessibilidade em conteúdo e aplicações Web.", practical: "Transforme requisitos em critérios de aceite desde o contrato e registre evidências de cada teste.", test: "Mantenha matriz ligando requisito, componente, método de teste, resultado e responsável.", people: ["equipes de produto", "setor público", "fornecedores"], related: ["ABNT NBR 17225:2025", "WCAG 2.2"] },
        { id: "abnt-ciclo", title: "Acessibilidade no ciclo de desenvolvimento", technical: "A conformidade deve ser tratada como atributo do produto, não como correção decorativa ao final.", practical: "Inclua acessibilidade em pesquisa, protótipo, código, conteúdo, homologação e monitoramento.", test: "Confira se cada etapa possui responsáveis e critérios documentados.", people: ["usuários finais", "desenvolvedores", "gestores"], related: ["ABNT NBR 17225:2025"] },
        { id: "abnt-humano", title: "Automação e avaliação humana", technical: "Ferramentas automáticas cobrem apenas parte das barreiras possíveis.", practical: "Combine validadores com inspeção manual e testes participativos com pessoas com deficiência.", test: "Separe no relatório resultados automáticos, revisões humanas e evidências de uso real.", people: ["pessoas com deficiência", "equipes de qualidade"], related: ["ABNT NBR 17225:2025", "WCAG-EM"] },
        { id: "abnt-manutencao", title: "Evidência e manutenção", technical: "Acessibilidade precisa permanecer após mudanças de conteúdo, tecnologia e fornecedores.", practical: "Repita testes em versões, monitore regressões e publique limitações conhecidas.", test: "Compare relatórios por data e confirme correção sem introduzir novas barreiras.", people: ["organizações", "usuários recorrentes"], related: ["ABNT NBR 17225:2025"] }
      ]
    },
    {
      slug: "tcu-2025",
      year: 2025,
      date: "2025-09-10",
      kind: "auditoria-publica",
      title: "Diagnóstico de Acessibilidade Digital do TCU",
      subtitle: "Fiscalização no setor público federal",
      status: "Auditoria e recomendações públicas",
      scope: "Organizações, portais, aplicativos e serviços digitais federais",
      summary: "A fiscalização realizada entre 2024 e 2025 avaliou 288 organizações e encontrou baixa maturidade em governança, cultura, capacitação, atendimento e critérios técnicos de acessibilidade.",
      whyItMatters: "Demonstra que conformidade não depende apenas do código: exige liderança, orçamento, processos, capacitação, participação e monitoramento contínuo.",
      tags: ["TCU", "auditoria", "governança", "monitoramento", "setor público", "transparência"],
      sources: [
        { label: "Diagnóstico de Acessibilidade Digital", url: "https://portal.tcu.gov.br/tecnologia-da-informacao/diagnostico-de-acessibilidade-digital", official: true },
        { label: "Resultados da fiscalização de 2025", url: "https://portal.tcu.gov.br/imprensa/noticias/servicos-digitais-do-setor-publico-apresentam-limitacoes-severas-de-acessibilidade", official: true }
      ],
      practical: [
        { id: "tcu-governanca", title: "Governança e responsabilidade", technical: "Acessibilidade deve integrar políticas, papéis, planejamento e tomada de decisão.", practical: "Nomeie responsáveis, estabeleça metas e inclua acessibilidade em riscos, aquisições e contratos.", test: "Verifique documentos, responsáveis, orçamento, indicadores e prestação de contas.", people: ["gestores públicos", "cidadãos com deficiência"], related: ["Diagnóstico TCU 2024-2025"] },
        { id: "tcu-capacitacao", title: "Capacitação permanente", technical: "Equipes precisam dominar requisitos técnicos e compreender experiências reais de uso.", practical: "Forme conteúdo, design, desenvolvimento, compras, atendimento e liderança, não apenas especialistas isolados.", test: "Avalie competências antes e depois da formação e observe sua aplicação em projetos reais.", people: ["servidores", "fornecedores", "usuários de serviços públicos"], related: ["Diagnóstico TCU 2024-2025"] },
        { id: "tcu-testes", title: "Testes antes da publicação", technical: "A auditoria identificou baixa adoção de avaliações antes do lançamento.", practical: "Inclua testes automáticos, inspeção manual, teclado e tecnologia assistiva nos critérios de homologação.", test: "Impeça publicação quando existirem barreiras críticas sem justificativa e plano de correção.", people: ["pessoas com deficiência", "cidadãos"], related: ["Acórdão TCU 2099/2025"] },
        { id: "tcu-monitoramento", title: "Monitoramento contínuo", technical: "Mudanças de conteúdo e sistemas podem reintroduzir barreiras após uma auditoria pontual.", practical: "Monitore páginas prioritárias, acompanhe regressões e publique evolução das correções.", test: "Compare indicadores entre versões e mantenha histórico auditável.", people: ["controle social", "gestores", "usuários recorrentes"], related: ["Diagnóstico TCU 2024-2025"] },
        { id: "tcu-atendimento", title: "Canal acessível de atendimento", technical: "Governança inclui receber, tratar e responder relatos de barreiras.", practical: "Ofereça canal acessível, protocolo, prazo e retorno compreensível, além de alternativas não digitais.", test: "Envie um relato real e acompanhe todo o percurso até a devolutiva.", people: ["cidadãos", "rede de apoio", "controle social"], related: ["Diagnóstico TCU 2024-2025"] }
      ]
    }
  ]
});
