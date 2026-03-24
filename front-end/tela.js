document.addEventListener("DOMContentLoaded", function() {
    function inserirHeader() {
    const path = window.location.pathname;

    let paginaAtual = "";

    if (path.includes("index.html")) {
        paginaAtual = "index";
    } else if (path.includes("imc.html")) {
        paginaAtual = "imc";
    } else if (path.includes("resumoConsulta.html")) {
        paginaAtual = "resumo";
    } else if (path.includes("metas.html")) {
        paginaAtual = "metas";
    } else if (path.includes("Cardapio.html")) {
        paginaAtual = "cardapio";
    } else if (path.includes("agendamento.html")) {
        paginaAtual = "agendamento";
    } else if (path.includes("sobre.html")) {
        paginaAtual = "sobre";
    } else if (path.includes("contatos.html")) {
        paginaAtual = "contatos";
    }

    const usuario = JSON.parse(localStorage.getItem('dadosUsuario'));
    const nomeUsuario = usuario ? (usuario.nome_usuario || usuario.nome || 'Usuário') : null;
    const inicialUsuario = nomeUsuario ? nomeUsuario.charAt(0).toUpperCase() : null;

    const dropdownUsuario = usuario ? `
        <li>
            <div class="avatar-usuario-header" id="avatar-usuario" onclick="window.location.href='perfil.html'">${inicialUsuario}</div>
        </li>
    ` : `
        <li class="dropdown">
            <p class="setaNav" data-translate="6" id="usuarioLogado">Usuário</p>
            <div class="drop-menu drop-m2">
                <a href="cadastro.html" id="link-cadastro" class="item">Cadastro</a>    
                <a href="entrar.html" id="link-login" class="item">Entrar</a>
                <a href="perfil.html" id="linkPerfil" class="item">Perfil</a>
            </div>
        </li>
    `;

    const headerHTML = `
        <a href="index.html"  style="height: 100%;">
        <img src="img/logos/Logo texto branco.png" alt="logo-nutrivida">
</a>
        <section class="direito">
            <nav class="menu">
                <ul id="menu">
                    <a href="index.html">
        <img src="img/logos/Logo texto branco.png" alt="logo-nutrivida"  style="height: 4rem;">
</a>
                    <li><a class="item ${paginaAtual === 'index' ? 'paginaAtual' : ''}" href="index.html" data-translate="1">Início</a></li>    
                    <li class="dropdown">
                        <p class="setaNav" data-translate="2">Serviços</p>
                        <div class="drop-menu">
                            <a class="item ${paginaAtual === 'imc' ? 'paginaAtual' : ''}" id="dropdown__link" href="imc.html" data-translate="8">Imc</a>
                            <a class="item ${paginaAtual === 'dica' ? 'paginaAtual' : ''}" id="dropdown__link" href="dica.html" data-translate="8">Dicas</a>
                            <a class="item ${paginaAtual === 'resumo' ? 'paginaAtual' : ''}" id="dropdown__link" href="resumoConsulta.html" data-translate="8">Resumo da consulta</a>
                            <a class="item ${paginaAtual === 'metas' ? 'paginaAtual' : ''}" id="dropdown__link" href="metas.html" data-translate="8">Metas</a>
                            <a class="item ${paginaAtual === 'cardapio' ? 'paginaAtual' : ''}" id="dropdown__link" href="opcoescardapio.html" data-translate="9">Cardápio Personalizado</a>
                            <a class="item ${paginaAtual === 'agendamento' ? 'paginaAtual' : ''}" id="dropdown__link" href="agendamento.html" data-translate="9">Agendamento</a>
                        </div>
                    </li>
                    <li><a class="item ${paginaAtual === 'sobre' ? 'paginaAtual' : ''}" href="sobre.html" data-translate="4">Sobre nós</a></li>
                    <li><a class="item ${paginaAtual === 'contatos' ? 'paginaAtual' : ''}" href="contatos.html" data-translate="5">Contatos</a></li>
                    ${dropdownUsuario}
                </ul>
            </nav>
            <div class="hamburgue" id="hamburgue"></div>
        </section>
    `;

    const headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    } else {
        console.error("Elemento header não encontrado!");
    }
}

    inserirHeader();

    


 
   function inserirBarraAcessibilidade() {
    const barraAcessibilidadeHTML = `
          <section class="barra-acessibilidade" id="idn-menu">
                <div class="header-barra">
                    <img class="img-acessibilidade1" src="img/icons/forma acessibilidade10.svg" alt="Imagem da forma do cabeçalho de acessibilidade">
                    <img class="img-acessibilidade2" src="img/icons/forma acessibilidade 3.png" alt="Imagem da forma do cabeçalho de acessibilidade">
                    <div class="organizar">
                        <select id="languageSelector" onchange="changeLanguage()">
                            <option value="pt-br">Português</option>
                            <option value="en">Inglês</option>
                        </select>
                        <button id="fechar-barra"><img src="img/icons/fechar.svg" alt="Ícone do botão de fechar a barra de acessibilidade"></button>
                    </div>
                    <h2 class="h2-acessibilidade" data-translate="34">Acessibilidade</h2>
                </div>
                <div class="corpo-barra">
                    <div class="card-barra">
                        <button id="alteraCorDark">
                            <img src="img/icons/icone-lua.svg" alt="simbolo-dark">
                            <img src="img/icons/icone-sol.svg" alt="simbolo-light">
                        </button>
                        <button id="ativarVlibras">
                            <img src="img/icons/libras.png" alt="ícone do botão do VLibras">
                        </button>
                        <button id="zoom" class="AumentarDiminuir-zoom">
                            <img src="img/icons/aumentar-zoom.svg" alt="lupa para aumentar o zoom do site">
                            <img src="img/icons/diminuir-zoom.svg" alt="lupa para diminuir o zoom do site">
                        </button>
                        <button id="imagem-alt" class="ler-imagemAlt">
                            <img src="img/icons/imagem-alt.png" alt="Simbolo de imagem ativada">
                            <img src="img/icons/imagemAlt desativada.svg" alt="Simbolo de imagem desativada">
                        </button>
                        <button id="destacar-links">
                            <img src="img/icons/marca-texto.svg" alt="Ícone do símbolo do marca texto">
                            <img src="img/icons/marca-texto desativado.svg" alt="Ícone do símbolo do marca texto desativado">
                        </button>
                    </div>
                </div>
                <div class="footer-barra">
                    <div class="btnDesligar-barra">
                        <button id="DesligarFuncao" data-translate="35">
                            Desligar
                        </button>
                    </div>
                    <div class="footer-barra2">
                        <span data-translate="36">Desenvolvido por Nutrivida</span>
                    </div>
                </div>
            </section>
        `;
    document.body.insertAdjacentHTML('afterbegin', barraAcessibilidadeHTML);
}

function inicializarEventosAcessibilidade() {
    // Modo Dark
    // Modo Dark com persistência
// Sempre aplica a preferência do modo escuro ao carregar a página
if (localStorage.getItem('modo-escuro') === 'true') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}

// Lógica do botão só se ele existir
const mudaCordDark = document.getElementById('alteraCorDark');
if (mudaCordDark) {
    const lightIcon = mudaCordDark.querySelector('img:first-child');
    const darkIcon = mudaCordDark.querySelector('img:last-child');

    // Atualiza os ícones com base na preferência salva
    if (document.body.classList.contains('dark-mode')) {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
    } else {
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
    }

    mudaCordDark.addEventListener('click', function() {
        const modoEscuroAtivo = document.body.classList.toggle('dark-mode');
        localStorage.setItem('modo-escuro', modoEscuroAtivo);

        if (modoEscuroAtivo) {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
        } else {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
        }
    });
}



    // VLibras
    const button = document.getElementById('ativarVlibras');
    const vlibrasBarra = document.querySelector('.vLibras-barra');
    if (button && vlibrasBarra) {
        button.addEventListener('click', () => {
            const computedStyle = window.getComputedStyle(vlibrasBarra);
            vlibrasBarra.style.display = (computedStyle.display === 'none') ? 'block' : 'none';
        });
    }

    // Zoom
    let zoomedIn = false;
    const zoomButton = document.getElementById("zoom");
    const cardBarra = document.querySelector(".card-barra");
    if (zoomButton && cardBarra) {
        zoomButton.addEventListener("click", function () {
            const body = document.body;
            const aumentarZoom = zoomButton.querySelector('img:first-child');
            const diminuirZoom = zoomButton.querySelector('img:last-child');
            if (!zoomedIn) {
                body.style.zoom = "1.5";
                aumentarZoom.style.display = "none";
                diminuirZoom.style.display = "block";
                cardBarra.style.overflowY = "auto";
                cardBarra.style.maxHeight = "300px";
            } else {
                body.style.zoom = "1";
                aumentarZoom.style.display = "block";
                diminuirZoom.style.display = "none";
                cardBarra.style.overflowY = "hidden";
                cardBarra.style.maxHeight = "none";
            }
            zoomedIn = !zoomedIn;
        });
    }

    // Ler ALT das imagens
    const altButton = document.getElementById("imagem-alt");
    if (altButton) {
        let isAltVisible = false;
        const imagens = altButton.querySelectorAll("img");
        const imagemAltativada = imagens[0];
        const imagemAltdesativada = imagens[1];
        function showTooltip(event) {
            const altText = this.getAttribute("alt");
            if (altText) {
                let tooltip = document.createElement("div");
                tooltip.className = "tooltip";
                tooltip.innerText = altText;
                document.body.appendChild(tooltip);
                tooltip.style.position = "absolute";
                tooltip.style.left = `${event.pageX}px`;
                tooltip.style.top = `${event.pageY - 30}px`;
                const mouseMoveHandler = (moveEvent) => {
                    tooltip.style.left = `${moveEvent.pageX}px`;
                    tooltip.style.top = `${moveEvent.pageY - 30}px`;
                };
                const mouseOutHandler = () => {
                    tooltip.remove();
                    document.removeEventListener("mousemove", mouseMoveHandler);
                    this.removeEventListener("mouseout", mouseOutHandler);
                };
                document.addEventListener("mousemove", mouseMoveHandler);
                this.addEventListener("mouseout", mouseOutHandler, { once: true });
            }
        }
        altButton.addEventListener("click", function () {
            const allImages = document.querySelectorAll("img");
            if (isAltVisible) {
                allImages.forEach(img => img.removeEventListener("mouseover", showTooltip));
                imagemAltativada.style.display = "block";
                imagemAltdesativada.style.display = "none";
            } else {
                allImages.forEach(img => img.addEventListener("mouseover", showTooltip));
                imagemAltativada.style.display = "none";
                imagemAltdesativada.style.display = "block";
            }
            isAltVisible = !isAltVisible;
        });
    }

    // Destacar Links
    const destacarBotao = document.getElementById("destacar-links");
    if (destacarBotao) {
        let isHighlighted = false;
        const primeiraImagem = destacarBotao.querySelector("img:first-child");
        const ultimaImagem = destacarBotao.querySelector("img:last-child");
        destacarBotao.addEventListener("click", function() {
            const links = document.querySelectorAll("a");
            if (isHighlighted) {
                links.forEach(link => link.style.color = "");
                primeiraImagem.style.display = "inline";
                ultimaImagem.style.display = "none";
            } else {
                links.forEach(link => link.style.color = "red");
                primeiraImagem.style.display = "none";
                ultimaImagem.style.display = "inline";
            }
            isHighlighted = !isHighlighted;
        });
    }

    // Abrir/Fechar barra acessibilidade
    const botaoAcessibilidade = document.getElementById("botao-acessibilidade");
    const fecharBarra = document.getElementById("fechar-barra");
    const idnMenu = document.getElementById("idn-menu");
    if (botaoAcessibilidade && idnMenu) {
        botaoAcessibilidade.addEventListener("click", function() {
            idnMenu.style.left = "0";
        });
    }
    if (fecharBarra && idnMenu) {
        fecharBarra.addEventListener("click", function() {
            idnMenu.style.left = "-36rem";
        });
    }
    document.addEventListener("click", function(event) {
        if (idnMenu && !idnMenu.contains(event.target) && botaoAcessibilidade && !botaoAcessibilidade.contains(event.target)) {
            idnMenu.style.left = "-36rem";
        }
    });

    // Desligar todas as funções
    const desligarFuncao = document.getElementById("DesligarFuncao");
if (desligarFuncao) {
    desligarFuncao.addEventListener("click", function() {
        // Remove o modo dark da página atual
        document.body.classList.remove('dark-mode');

        // Esconde a barra do VLibras (se existir)
        if (vlibrasBarra) vlibrasBarra.style.display = 'none';

        // Reseta zoom e overflow do body
        document.body.style.zoom = "1";
        document.body.style.overflow = "";

        // Reseta overflow do cardBarra (se existir)
        if (cardBarra) cardBarra.style.overflow = "";

        // Ajusta ícones do botão de mudar cor (se existir)
        if (mudaCordDark) {
            const lightIcon = mudaCordDark.querySelector('img:first-child');
            const darkIcon = mudaCordDark.querySelector('img:last-child');
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
        }

        // Remove ou redefine no localStorage a preferência do modo escuro
        // Opção 1: Remover a chave para que o modo claro seja padrão
        // localStorage.removeItem('modo-escuro');

        // Opção 2: Definir explicitamente como false
        localStorage.setItem('modo-escuro', 'false');
    });
}

}

 function inserirFooter() {
  const footerHTML = `
    <section class="footer-content">
        <!-- Brand -->
        <div class="footer-brand">
            <div class="footer-logo">
                <span class="footer-logo-icon">
                    <img src="img/logos/logo.png" alt="logo nutrivida">
                </span>
                <span class="footer-logo-text">NutriVida</span>
            </div>
            <p class="footer-description">
                Transformando vidas através da nutrição inteligente. 
                Planos personalizados e acompanhamento profissional para sua melhor versão.
            </p>
            <div class="footer-social">
                <a href="#" class="social-link" aria-label="Instagram"></a>
            </div>
        </div>

        <!-- Mapa do site -->
        <div class="footer-section">
            <h3>Mapa do site</h3>
            <ul class="footer-links">
                <li><a href="index.html">Início</a></li>
                <li><a href="imc.html">imc</a></li>
                <li><a href="dicas.html">dica</a></li>
                <li><a href="Cardapio.html">Cardápio</a></li>
                <li><a href="agendamento.html">Agendamentos</a></li>
                <li><a href="sobre.html">Sobre nós</a></li>
                <li><a href="contatos.html">Contatos</a></li>
            </ul>
        </div>

        <!-- Planos -->
        <div class="footer-section">
            <h3>Planos</h3>
            <ul class="footer-links">
                <li><a href="#para-baixo">Básicos</a></li>
                <li><a href="#para-baixo">Intermediários</a></li>
                <li><a href="#para-baixo">Premium</a></li>
            </ul>
        </div>

        <!-- Fale Conosco -->
        <div class="footer-section">
            <h3>Fale Conosco</h3>
            <div class="contact-item">
                <span class="contact-icon"></span>
                <span>@site.nutrivida</span>
            </div>
            <div class="contact-item">
                <span class="contact-icon"></span>
                <span>(11) 99999-9999</span>
            </div>
            <div class="contact-item">
                <span class="contact-icon"></span>
                <span>São Paulo, SP</span>
            </div>
        </div>
    </section>

    <div class="footer-bottom">
        <div class="footer-copyright">
            <span>© 2025 NutriVida</span>
            <span>•</span>
            <span>Todos os direitos reservados</span>
        </div>
    </div>
  `;

        const footerElement = document.querySelector('footer');
        if (footerElement) {
            footerElement.innerHTML = footerHTML;
        } else {
            console.error("Elemento footer não encontrado!");
        }
    }

   async function verificarAcesso() {
    const path = window.location.pathname;
    const usuario = JSON.parse(localStorage.getItem("dadosUsuario"));
    
    console.log("PATH:", path);
    console.log("USUARIO:", usuario);

    const paginasConsulta = ["resumoConsulta.html", "metas.html"];
    const paginasPlano = ["opcoescardapio.html", "Cardapio.html"];

    const paginaAtual = paginasConsulta.find(p => path.includes(p));
    const paginaPlano = paginasPlano.find(p => path.includes(p));

    console.log("PAGINA CONSULTA:", paginaAtual);
    console.log("PAGINA PLANO:", paginaPlano);

    // Verifica login
    if ((paginaAtual || paginaPlano) && !usuario) {
        window.location.href = "entrar.html";
        return;
    }

    // Verifica consulta com nutricionista
    if (paginaAtual && usuario) {
        try {
            const res = await fetch(`http://localhost:3000/agendamentos/usuario/${usuario.id}/tem-consulta`);
            const dados = await res.json();
            if (!dados.temConsulta) {
                window.location.href = "entrar.html";
                return;
            }
        } catch (err) {
            console.error("Erro ao verificar consulta:", err);
        }
    }

    // Verifica plano ativo
    if (paginaPlano && usuario) {
        try {
            const res = await fetch(`http://localhost:3000/planos/${usuario.id}`);
            if (!res.ok) {
                window.location.href = "sobre.html#planos";
                return;
            }
            const dados = await res.json();
            if (dados.status !== 'ativo') {
                window.location.href = "sobre.html#planos";
                return;
            }
        } catch (err) {
            console.error("Erro ao verificar plano:", err);
            window.location.href = "sobre.html#planos";
        }
    }
}

// Chama ao carregar qualquer página
document.addEventListener("DOMContentLoaded", verificarAcesso); 

// Depois do inserirHeader e inserirBarraAcessibilidade
inserirHeader();
inserirBarraAcessibilidade();
inicializarEventosAcessibilidade();
inserirFooter();

});

