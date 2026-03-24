window.addEventListener("load", paginacarregada);



function paginacarregada() {

  

    
//funão de compra do mercadopago
window.criarPreferencia = function(title, price) {
  const modal = document.getElementById("confirmacaoCompra");
  const mensagem = document.getElementById("mensagemConfirmacao");
  mensagem.textContent = `Deseja realmente comprar o ${title} por R$${price}?`;

  modal.style.display = "flex";

  const btnSim = document.getElementById("btnSim");
  const btnCancelar = document.getElementById("btnCancelar");
  btnSim.onclick = null;
  btnCancelar.onclick = null;

  btnSim.onclick = async function() {
    modal.style.display = "none";

    const usuario = JSON.parse(localStorage.getItem("dadosUsuario"));
    const usuario_id = usuario?.id || null;

    // 1. Salva o plano como PENDENTE no banco
    if (usuario_id) {
      try {
        await fetch("http://localhost:3000/planos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario_id, plano: title, preco: price, status: 'pendente' })
        });
      } catch (err) {
        console.error("Erro ao salvar plano:", err);
      }
    }

    // 2. Salva flag no localStorage
    localStorage.setItem("pagamento_pendente", JSON.stringify({
      plano: title,
      preco: price,
      usuario_id
    }));

    // 3. Vai pro Mercado Pago
    fetch("http://localhost:3000/criar-preferencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, usuario_id })
    })
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?preference_id=${data.id}`;
      } else {
        alert("Erro ao criar preferência.");
      }
    })
    .catch(err => {
      console.error("Erro ao chamar a API:", err);
      alert("Falha na criação da preferência.");
    });
  };

  btnCancelar.onclick = function() {
    modal.style.display = "none";
  };
};

// 4. Ao voltar pro site verifica pagamento pendente
(function verificarPagamentoPendente() {
  const pagamentoPendente = localStorage.getItem("pagamento_pendente");
  if (pagamentoPendente) {
    const dados = JSON.parse(pagamentoPendente);
    localStorage.removeItem("pagamento_pendente");
    window.location.href = `sucesso.html?plano=${encodeURIComponent(dados.plano)}&preco=${dados.preco}&usuario_id=${dados.usuario_id}`;
  }
})();









    // Verifica se o formulário existe
// const formCadastro = document.getElementById("formCadastro");

// if (formCadastro) {
//     const username = document.getElementById("nomes");
//     const email = document.getElementById("email");
//     const password = document.getElementById("senha");

//     const usernameError = document.getElementById("usernameError");
//     const emailError = document.getElementById("emailError");
//     const passwordError = document.getElementById("passwordError");

//     // Função principal que une validação e envio ao banco
//     formCadastro.addEventListener("submit", async function (e) {
//         e.preventDefault(); // Impede envio automático

//         // Valida os campos
//         const isUsernameValid = checkInputnomes();
//         const isEmailValid = checkInputemail();
//         const isPasswordValid = checkInputsenha();

//         // Se os campos forem válidos, envia para o banco
//         if (isUsernameValid && isEmailValid && isPasswordValid) {
//             const dados = {
//                 nome_usuario: username.value.trim(),
//                 email: email.value.trim(),
//                 senha: password.value.trim()
//             };

//             try {
//                 const resposta = await fetch("http://localhost:3000/usuarios", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify(dados)
//                 });

//                 if (resposta.ok) {
//                     alert("Usuário cadastrado com sucesso!");
//                     localStorage.setItem("usuarioLogado", "true");
//                     location.href = "index.html"; // Redireciona
//                 } else {
//                     const erro = await resposta.text();
//                     alert("Erro ao cadastrar: " + erro);
//                 }
//             } catch (erro) {
//                 alert("Erro de conexão: " + erro.message);
//             }
//         } else {
//             alert("Preencha todos os campos corretamente.");
//         }
//     });

//     // Valida o nome
//     function checkInputnomes() {
//         const usernameValue = username.value.trim();
//         if (usernameValue === "") {
//             showError(username, usernameError, "O nome é obrigatório.");
//             return false;
//         } else {
//             clearError(username, usernameError);
//             return true;
//         }
//     }

//     // Valida o e-mail
//     function checkInputemail() {
//         const emailValue = email.value.trim();
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (emailValue === "") {
//             showError(email, emailError, "O e-mail é obrigatório.");
//             return false;
//         } else if (!emailPattern.test(emailValue)) {
//             showError(email, emailError, "Digite um e-mail válido.");
//             return false;
//         } else {
//             clearError(email, emailError);
//             return true;
//         }
//     }

//     // Valida a senha
//     function checkInputsenha() {
//         const passwordValue = password.value.trim();
//         if (passwordValue === "") {
//             showError(password, passwordError, "A senha é obrigatória.");
//             return false;
//         } else if (passwordValue.length < 8) {
//             showError(password, passwordError, "A senha precisa ter no mínimo 8 caracteres.");
//             return false;
//         } else {
//             clearError(password, passwordError);
//             return true;
//         }
//     }

//     // Mostra erro visual
//     function showError(input, errorElement, errorMessage) {
//         input.classList.add("error");
//         errorElement.textContent = errorMessage;
//     }

//     // Limpa o erro visual
//     function clearError(input, errorElement) {
//         input.classList.remove("error");
//         errorElement.textContent = "";
//     }
// } else {
//     console.log("Formulário não encontrado.");
// }

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
    const username = document.getElementById("nomes");
    const email = document.getElementById("email");
    const password = document.getElementById("senha");

    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const btnCadastro = document.getElementById("btnCadastro");

    btnCadastro.addEventListener("click", async function (e) {
        e.preventDefault();

        const isUsernameValid = checkInputnomes();
        const isEmailValid = checkInputemail();
        const isPasswordValid = checkInputsenha();

        if (isUsernameValid && isEmailValid && isPasswordValid) {
            const dados = {
                nome_usuario: username.value.trim(),
                email: email.value.trim(),
                senha: password.value.trim()
            };

            try {
                const resposta = await fetch("http://localhost:3000/usuarios", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dados)
                });

                if (resposta.ok) {
                    const novoUsuario = await resposta.json();

                    localStorage.setItem("dadosUsuario", JSON.stringify({
                        id: novoUsuario.id,
                        nome_usuario: novoUsuario.nome_usuario,
                        email: novoUsuario.email,
                        senha: novoUsuario.senha
                    }));

                    localStorage.setItem("usuarioLogado", "true");

                    mostrarMensagem("Usuário cadastrado com sucesso!", "sucesso");
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 2000);
                } else if (resposta.status === 409) {
                    const erro = await resposta.json();
                    showError(email, emailError, erro.message || "Este e-mail já está cadastrado.");
                    mostrarMensagem("Este e-mail já está cadastrado.", "erro");
                } else {
                    const erro = await resposta.text();
                    mostrarMensagem("Erro ao cadastrar: " + erro, "erro");
                }
            } catch (erro) {
                mostrarMensagem("Erro de conexão: " + erro.message, "erro");
            }
        } else {
            mostrarMensagem("Preencha todos os campos corretamente.", "erro");
        }
    });

    function checkInputnomes() {
        const usernameValue = username.value.trim();
        if (usernameValue === "") {
            showError(username, usernameError, "O nome é obrigatório.");
            return false;
        } else {
            clearError(username, usernameError);
            return true;
        }
    }

    function checkInputemail() {
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === "") {
            showError(email, emailError, "O e-mail é obrigatório.");
            return false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, emailError, "Digite um e-mail válido.");
            return false;
        } else {
            clearError(email, emailError);
            return true;
        }
    }

    function checkInputsenha() {
        const passwordValue = password.value.trim();
        if (passwordValue === "") {
            showError(password, passwordError, "A senha é obrigatória.");
            return false;
        } else if (passwordValue.length < 8) {
            showError(password, passwordError, "A senha precisa ter no mínimo 8 caracteres.");
            return false;
        } else {
            clearError(password, passwordError);
            return true;
        }
    }

    function showError(input, errorElement, errorMessage) {
        input.classList.add("error");
        errorElement.textContent = errorMessage;
    }

    function clearError(input, errorElement) {
        input.classList.remove("error");
        errorElement.textContent = "";
    }

    //  Nova função para mostrar mensagens no topo da tela
    function mostrarMensagem(texto, tipo = "sucesso") {
        const div = document.getElementById("mensagem-flutuante");
        if (!div) return;

        div.textContent = texto;
        div.className = `mensagem visivel ${tipo}`;

        setTimeout(() => {
            div.classList.add("ocultar");
        }, 2500);

        setTimeout(() => {
            div.className = "mensagem";
        }, 3000);
    }
} else {
    console.log("Formulário não encontrado.");
}


//----------Função de recuperar senha----------------




 // Elementos do modal de recuperação
const modal = document.getElementById("modal-recuperacao");
const btn = document.getElementById("esqueceusenha");
const fo = document.getElementById("form-recuperacao");
const msg = document.getElementById("msg-resultado");

// Verifica se o botão e o modal existem
if (btn && modal) {
  btn.addEventListener("click", () => {
    modal.style.display = "block";
  });
} else {
  console.warn("Formulário de recuperação de senha não encontrado.");
}

// Envio do formulário de recuperação
if (fo && msg) {
  fo.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("email");
    if (!emailInput) return;

    const email = emailInput.value.trim();

    if (!email) {
      msg.style.color = "red";
      msg.textContent = "Por favor, informe um e-mail válido.";
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/usuarios/solicitar-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        // Mostra erro em vermelho e não abre modal
        msg.style.color = "red";
        msg.textContent = data.message || "Erro ao solicitar redefinição.";
        return;
      }

      // Se ok, mensagem verde e abre modal depois de 3 segundos
      msg.style.color = "green";
      msg.textContent = data.message || "Se o e-mail estiver cadastrado, o token foi enviado.";

      setTimeout(() => {
        fecharModalRecuperacao();
        abrirModalRedefinir();
      }, 3000);

    } catch (err) {
      msg.style.color = "red";
      msg.textContent = "Erro ao conectar com o servidor.";
    }
  });
} else {
  console.warn("Formulário de recuperação não encontrado na página.");
}

// Envio do formulário de redefinição
const formRedefinir = document.getElementById("form-redefinir");
const msgRedefinir = document.getElementById("msg-redefinir");

if (formRedefinir && msgRedefinir) {
  formRedefinir.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = document.getElementById("token")?.value;
    const novaSenha = document.getElementById("novaSenha")?.value;

    try {
      const res = await fetch("http://localhost:3000/usuarios/redefinir-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, novaSenha })
      });

      const result = await res.json();

      msgRedefinir.innerText = result.message || "Senha redefinida com sucesso!";

      setTimeout(() => {
        fecharModalRecuperacao();
        fecharModalRedefinir();
      }, 3000);

    } catch (error) {
      msgRedefinir.innerText = "Erro ao redefinir senha.";
    }
  });
} else {
  console.warn("Formulário de redefinição de senha não encontrado na página.");
}

// Funções auxiliares
function abrirModalRedefinir() {
  const modal = document.getElementById("modal-redefinir");
  if (modal) modal.style.display = "block";
}

function fecharModalRecuperacao() {
  const modal = document.getElementById("modal-recuperacao");
  if (modal) {
    modal.style.display = "none";
    modal.querySelector("form")?.reset();
    const msg = document.getElementById("msg-resultado");
    if (msg) msg.textContent = "";
  }
}

function fecharModalRedefinir() {
  const modal = document.getElementById("modal-redefinir");
  if (modal) {
    modal.style.display = "none";
    modal.querySelector("form")?.reset();
    const msg = document.getElementById("msg-redefinir");
    if (msg) msg.textContent = "";
  }
}

  
  






let botao = document.getElementById('btnLogar');

if (botao) {
    botao.addEventListener('click', async function logar(event) {
        event.preventDefault();

        let pegaUsuario = document.getElementById('usuario');
        let pegaSenha = document.getElementById('senha');

        if (pegaUsuario && pegaSenha) {
            const login = pegaUsuario.value.trim();
            const senha = pegaSenha.value.trim();

            if (login === "" || senha === "") {
                mostrarMensagem("Preencha todos os campos.", "erro");
                return;
            }

            try {
                // Faz a requisição POST para /login
                const resposta = await fetch("http://localhost:3000/auth/Login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: login, senha })
              });

                if (!resposta.ok) {
                    // Se deu erro, lê a mensagem e mostra
                    const erro = await resposta.json();
                    mostrarMensagem(erro.message || "Erro no login", "erro");
                    return;
                }

                const dados = await resposta.json();

// Salva dados do usuário e token no localStorage
localStorage.setItem("dadosUsuario", JSON.stringify({
    id: dados.id,
    nome_usuario: dados.nome,
    email: login,
    tipo: dados.tipo,
    token: dados.token
}));


if (dados.tipo === "nutricionista") {
    sessionStorage.setItem("nutricionistaId", dados.id);
}

mostrarMensagem(dados.message, "sucesso");


                // Redireciona conforme o tipo de usuário
                setTimeout(() => {
                    if (dados.tipo === "nutricionista") {
                        window.location.href = "informacoesNutricionista.html"; // página do nutricionista
                    } else {
                        window.location.href = "index.html"; // página do usuário comum
                    }
                }, 2000);

            } catch (erro) {
                mostrarMensagem("Erro de conexão: " + erro.message, "erro");
            }

        } else {
            mostrarMensagem("Campos de usuário ou senha não encontrados", "erro");
        }
    });


    // Função para mostrar mensagens flutuantes com animação
    function mostrarMensagem(texto, tipo = "sucesso") {
        const div = document.getElementById("mensagem-flutuante");
        if (!div) return;

        div.textContent = texto;
        div.className = `mensagem visivel ${tipo}`;

        setTimeout(() => {
            div.classList.add("ocultar");
        }, 2500);

        setTimeout(() => {
            div.className = "mensagem";
        }, 3000);
    }
} else {
    console.log("Botão de login não encontrado.");
}






//Contatos no banco de dados
 const form = document.getElementById("formcontato");

  if (form) {
    const campos = document.querySelectorAll(".required");
    const spans = document.querySelectorAll(".span-required");
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const selectConversar = document.getElementById("Conversarcontato");
    const mensagemInput = document.getElementById("mensagemcontato");

    let spanSelect = null;

    // Validação do select
    if (selectConversar) {
      spanSelect = document.createElement("span");
      spanSelect.className = "span-required";
      spanSelect.textContent = "Por favor, selecione uma opção válida.";
      selectConversar.parentNode.appendChild(spanSelect);
      spanSelect.style.display = "none";
    }

    // Validadores
    function setError(index) {
      campos[index].style.border = "2px solid #fa4753";
      campos[index].style.caretColor = "#fa4753";
      campos[index].style.color = "#fa4753";
      spans[index].style.display = "block";
    }

    function removeError(index) {
      campos[index].style.border = "";
      campos[index].style.caretColor = "";
      campos[index].style.color = "";
      spans[index].style.display = "none";
    }

    function setSelectError() {
      if (spanSelect) {
        selectConversar.style.border = "2px solid #fa4753";
        spanSelect.style.display = "block";
      }
    }

    function removeSelectError() {
      if (spanSelect) {
        selectConversar.style.border = "";
        spanSelect.style.display = "none";
      }
    }

    function nameValidate() {
      if (campos[0].value.length < 3) {
        setError(0);
        return false;
      } else {
        removeError(0);
        return true;
      }
    }

    function emailValidate() {
      if (!emailRegex.test(campos[1].value)) {
        setError(1);
        return false;
      } else {
        removeError(1);
        return true;
      }
    }

    function telefoneValidate() {
      const telefone = campos[2].value.replace(/\D/g, "");
      if (telefone.length !== 11) {
        setError(2);
        return false;
      } else {
        removeError(2);
        return true;
      }
    }

    function selectValidate() {
      if (selectConversar && selectConversar.value === "0") {
        setSelectError();
        return false;
      } else {
        removeSelectError();
        return true;
      }
    }

    function mensagemValidate() {
      const valor = mensagemInput.value.trim();
      const palavrasValidas = valor.split(/\s+/).filter(p => p.length >= 2);

      let span = document.getElementById("erro-mensagem");

      if (palavrasValidas.length < 3) {
        mensagemInput.style.border = "2px solid #fa4753";
        mensagemInput.style.caretColor = "#fa4753";

        if (!span) {
          span = document.createElement("span");
          span.id = "erro-mensagem";
          span.className = "span-required";
          span.style.color = "#fa4753";
          span.textContent = "Escreva uma mensagem mais completa (mínimo 3 palavras).";
          mensagemInput.parentNode.appendChild(span);
        } else {
          span.style.display = "block";
        }

        return false;
      } else {
        mensagemInput.style.border = "";
        mensagemInput.style.caretColor = "";
        if (span) span.style.display = "none";
        return true;
      }
    }

    // Máscara de telefone
    const telefoneInput = document.getElementById("telefonecontato");
    if (telefoneInput) {
      telefoneInput.addEventListener("input", () => {
        let input = telefoneInput.value.replace(/\D/g, "").slice(0, 11);
        telefoneInput.value = input.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      });
    }

    // Eventos de validação ao digitar
    if (campos[0]) campos[0].addEventListener("input", nameValidate);
    if (campos[1]) campos[1].addEventListener("input", emailValidate);
    if (campos[2]) campos[2].addEventListener("input", telefoneValidate);
    if (selectConversar) selectConversar.addEventListener("change", selectValidate);
    if (mensagemInput) mensagemInput.addEventListener("input", mensagemValidate);

    // Envio do formulário
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const isNameValid = nameValidate();
      const isEmailValid = emailValidate();
      const isTelefoneValid = telefoneValidate();
      const isSelectValid = selectValidate();
      const isMensagemValid = mensagemValidate();

      if (isNameValid && isEmailValid && isTelefoneValid && isSelectValid && isMensagemValid) {
        const payload = {
          nome: document.getElementById("nomecontato").value,
          email: document.getElementById("emailcontato").value,
          telefone: document.getElementById("telefonecontato").value,
          remetente: selectConversar.value,
          mensagem: document.getElementById("mensagemcontato").value
        };

        try {
  const response = await fetch("http://localhost:3000/contatos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    mostrarMensagem("Mensagem enviada com sucesso!", "sucesso");
    form.reset();
  } else {
    mostrarMensagem("Erro ao enviar a mensagem.", "erro");
  }
} catch (error) {
  console.error("Erro na requisição:", error);
  mostrarMensagem("Erro de conexão com o servidor.", "erro");
}
} else {
  mostrarMensagem("Por favor, corrija os campos destacados.", "erro");
}})
}

 


//login

// const usuarios = [
//     {
//         login: 'Lucas Galvão',
//         pass: '123456789'
//     },
//     {
//         login: 'eu',
//         pass: 'eu'
//     },
//     {
//         login: 'admin',
//         pass: 'admin'
//     }
// ];

// // Verifique se o botão de login existe
// let botao = document.getElementById('btnLogar');

// if (botao) {
//     // Se o botão de login for encontrado, adiciona o evento
//     botao.addEventListener('click', function logar(event) {
//         event.preventDefault(); // Previne o envio do formulário

//         // Verifique se os campos de login e senha existem antes de tentar acessar seus valores
//         let pegaUsuario = document.getElementById('usuario');
//         let pegasenha = document.getElementById('senha');

//         if (pegaUsuario && pegasenha) {
//             let validaLogin = false;

//             // Valida o login
//             for (let i in usuarios) {
//                 if (pegaUsuario.value === usuarios[i].login && pegasenha.value === usuarios[i].pass) {
//                     validaLogin = true;
//                     alert("Usuário encontrado");

//                     // Verifica se é o admin para redirecionar
//                     if (pegaUsuario.value === 'admin') {
//                         location.href = 'imc.html';
//                     } else {
//                         location.href = 'index.html';
//                     }
//                     return;
//                 }
//             }

//             // Se o usuário ou senha forem incorretos
//             alert('Usuário e/ou senha incorretos');
//         } else {
//             // Se os campos de usuário ou senha não existirem
//             alert('Campos de usuário ou senha não encontrados');
//         }
//     });
// } else {
//     // Se o botão de login não for encontrado
//     console.log("Botão de login não encontrado, a funcionalidade não será ativada.");
// }






    // Verifique se o botão de menu existe antes de adicionar o evento
    let botaomenu = document.getElementById("hamburgue");
    if (botaomenu) {
        botaomenu.addEventListener("click", interagirmenu);
    } 

    // Verifique se o menu existe
    let menu = document.getElementById("menu");
    if (!menu) {
        return;  // Não prossegue se o menu não existir
    }

    function interagirmenu() {
        // Verifica o estado do menu e aplica o comportamento
        if (menu.style.right === "-100%" || menu.style.right === "") {
            menu.style.right = "0";
            document.body.style.overflow = "hidden"; // Impede rolagem quando o menu estiver aberto
        } else if (menu.style.right === "0px") {
            menu.style.right = "-100%";
            document.body.style.overflow = "auto"; // Permite rolagem quando o menu estiver fechado
        }

        // Alterna a classe do botão de hamburguer
        botaomenu.classList.toggle("active-hamburgue");
    }

    


   //-----------livro------------

   let livroTotal = document.querySelector(".livroTotal");
    
        if(livroTotal != null){
    
            let paginasLivro = document.querySelectorAll(".livroTotal .pagina"); 
            
            function resetIndex(){
    
                let reset = paginasLivro.length;
    
                for(g=0;g<paginasLivro.length;g++){  
                    paginasLivro[g].style.zIndex = reset;
                    reset--;
                }
            }
    
            function buscarIndex(){
    
                let grandeIndex = 0;
    
                for(g=0;g<paginasLivro.length;g++){
                    let valorIndex = Number(paginasLivro[g].style.zIndex); 
                    if(valorIndex > grandeIndex){
                        grandeIndex = valorIndex;
                    }
                }
    
                return grandeIndex;
            }
    
            resetIndex();
    
            paginasLivro[0].style.transform = "rotateY(-180deg)";
    
            for(g=0;g<paginasLivro.length;g++){
                paginasLivro[g].addEventListener("click", virarPagina);
            }
    
            function virarPagina(){
                if(this.style.transform == "" || this.style.transform == "rotateY(0deg)"){
                    let maiorIndex = buscarIndex();
                    if(Number(this.style.zIndex) < maiorIndex){
                        this.style.zIndex = maiorIndex+1;
                    }
                    this.style.transform = "rotateY(-180deg)";
                    if(this.id == paginasLivro[0].id){
                        resetIndex();
                    }
                }
                else{
                    let maiorIndex = buscarIndex();
                    if(Number(this.style.zIndex) < maiorIndex){
                        this.style.zIndex = maiorIndex+1;
                    }
                    this.style.transform = "rotateY(0deg)";                
                }
            }        
        } 

        //banner rotativo----------------------------------

     
   // Selecione o carrossel e os slides
// Verifica se o carrossel existe na página
const carousel = document.querySelector('.carousel');
if (carousel) {
    // Se o carrossel existir, continua a execução do código
    const slides = document.querySelectorAll('.slide');

    // Verifica se os slides foram encontrados
    if (slides.length > 0) {
        // Se houver slides, faz a navegação funcionar

        // Selecione as setas de navegação
        const leftArrow = document.querySelector('.left-arrow');
        const rightArrow = document.querySelector('.right-arrow');

        let currentSlide = 0;
        const totalSlides = slides.length;

        // Função para mostrar o slide atual
        function showSlide(index) {
            // Garante que o índice está dentro do intervalo
            if (index < 0) {
                currentSlide = totalSlides - 1; // Vai para o último slide
            } else if (index >= totalSlides) {
                currentSlide = 0; // Volta para o primeiro slide
            } else {
                currentSlide = index;
            }
            // Move o carrossel para o slide atual
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        // Função para avançar para o próximo slide
        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        // Função para retroceder para o slide anterior
        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Navegação automática a cada 10 segundos
        let slideInterval = setInterval(nextSlide, 10000);

        // Verifica se o botão de avanço manual existe
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                clearInterval(slideInterval); // Limpa o intervalo para não interferir com o clique manual
                nextSlide();
                slideInterval = setInterval(nextSlide, 10000); // Reinicia o intervalo
            });
        }

        // Verifica se o botão de retroceder manual existe
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 10000); // Reinicia o intervalo
            });
        }
    } else {
        console.warn('Nenhum slide encontrado. Verifique a marcação HTML.');
    }
} else {
    console.warn('Carrossel não encontrado na página. Verifique a estrutura HTML.');
}

console.log("test1e");

  

   


        // IMC Data

       
//login-------------------------




    
    //Esse código trocar a imagem do grafico para a linguagem selecionada

    // Seleciona os elementos HTML
    const languageSelector = document.getElementById('languageSelector');
    const imageDisplay = document.getElementById('imageDisplay');

    // Função para trocar a imagem com base na seleção
    languageSelector.addEventListener('change', () => {
        const selectedIndex = languageSelector.selectedIndex;

        // Troca a imagem de acordo com o índice da opção selecionada
        if (selectedIndex === 0) {
            imageDisplay.src = 'img/imgGraficosTranslate/1.png'; // Caminho da Imagem 1
        } else if (selectedIndex === 1) {
            imageDisplay.src = 'img/imgGraficosTranslate/2.png'; // Caminho da Imagem 2
        }
    });




function mostrarMensagem(texto, tipo = "sucesso") {
        const div = document.getElementById("mensagem-flutuante");
        if (!div) return;

        div.textContent = texto;
        div.className = `mensagem visivel ${tipo}`;

        setTimeout(() => {
            div.classList.add("ocultar");
        }, 2500);

        setTimeout(() => {
            div.className = "mensagem";
        }, 3000);
    }
}




//Esse código é para a trocar de linguagem

// Função para carregar as traduções de um arquivo JSON
async function loadTranslations(language) {
    try {
        // Tentando carregar o arquivo de tradução
        const response = await fetch(`./translates/${language}.json`);
        
        // Se a resposta não for ok (erro ao carregar o arquivo), lança um erro
        if (!response.ok) {
            throw new Error(`Erro ao carregar arquivo de tradução para ${language}`);
        }

        // Converte o conteúdo do arquivo JSON para um objeto JavaScript
        const translations = await response.json();
        return translations;
    } catch (error) {
        console.error('Erro ao carregar as traduções:', error);
        return null; // Retorna null em caso de erro
    }
}

// Função para alterar o idioma da página
async function changeLanguage() {
    // Pega o idioma selecionado pelo usuário
    const selectedLanguage = document.getElementById('languageSelector').value;

    // Carrega as traduções do idioma selecionado
    const translations = await loadTranslations(selectedLanguage);

    // Se as traduções foram carregadas com sucesso
    if (translations) {
        // Seleciona todos os elementos que possuem o atributo 'data-translate'
        const elementsToTranslate = document.querySelectorAll('[data-translate]');

        // Para cada elemento que precisa ser traduzido
        elementsToTranslate.forEach(element => {
            const translationKey = element.getAttribute('data-translate');
            
            // Se houver uma tradução para a chave encontrada
            if (translations[translationKey]) {
                // Atualiza o conteúdo do texto do elemento com a tradução
                element.textContent = translations[translationKey];
            }
        });
    }
}

// Event listener para quando o idioma for alterado (seleção de idioma)



    


        


        
   

  


