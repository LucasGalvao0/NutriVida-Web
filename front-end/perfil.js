document.addEventListener("DOMContentLoaded", async () => {
  const labelNome = document.getElementById("labelNome");
  const inputNome = document.getElementById("inputNome");

  const labelEmail = document.getElementById("labelEmail");
  const inputEmail = document.getElementById("inputEmail");
  const emailErro = document.getElementById("emailErroPerfil");

  const labelSenha = document.getElementById("labelSenha");
  const senhaAviso = document.getElementById("senhaAviso");

  const btnEditar = document.getElementById("btnEditar");
  const btnSalvar = document.getElementById("btnSalvar");
  const btnVoltar = document.getElementById("btnVoltar");
  const btnSair = document.getElementById("btnSair");

  const mensagemPerfil = document.getElementById("mensagemPerfil");

  const containerPerfil = document.getElementById("containerPerfil");
  const avisoNaoLogado = document.getElementById("avisoNaoLogado");

  const toast = document.getElementById("toast");

  // Função para decodificar payload JWT sem validação
  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  // Pega dados do usuário do localStorage
  const usuarioLocal = JSON.parse(localStorage.getItem("dadosUsuario"));

  // Verifica se dados e token existem
  if (!usuarioLocal || !usuarioLocal.token) {
    avisoNaoLogado.style.display = "block";
    containerPerfil.style.display = "none";
    return;
  }

  // Extrai id do token
  const payload = parseJwt(usuarioLocal.token);
  const userId = payload?.id;

  if (!userId) {
    avisoNaoLogado.style.display = "block";
    containerPerfil.style.display = "none";
    return;
  }

  try {
    // Define endpoint conforme tipo
    const endpoint = usuarioLocal.tipo === "nutricionista"
      ? `http://localhost:3000/nutricionistas/${userId}`
      : `http://localhost:3000/usuarios/${userId}`;

    const res = await fetch(endpoint);

    if (!res.ok) throw new Error("Erro na requisição");

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      avisoNaoLogado.style.display = "block";
      containerPerfil.style.display = "none";
      return;
    }

    const usuarioDB = data[0];

    // Preenche campos considerando diferenças entre tipos
    labelNome.textContent = usuarioDB.nome_usuario || usuarioDB.nome_nutricionista || "Nome não disponível";
    inputNome.value = usuarioDB.nome_usuario || usuarioDB.nome_nutricionista || "";

    labelEmail.textContent = usuarioDB.email;
    inputEmail.value = usuarioDB.email;

    // Se usuário logou via Google, bloqueia edição
    if (usuarioLocal.viaGoogle) {
      inputEmail.disabled = true;

      const avisoGoogleEmail = document.createElement("p");
      avisoGoogleEmail.textContent = "Este e-mail é vinculado ao Google e não pode ser alterado.";
      avisoGoogleEmail.style.color = "gray";
      avisoGoogleEmail.style.fontSize = "14px";
      avisoGoogleEmail.style.marginTop = "4px";
      inputEmail.parentNode.appendChild(avisoGoogleEmail);

      senhaAviso.textContent = "Este usuário é vinculado ao Google. A senha não pode ser alterada.";
      senhaAviso.style.display = "block";
      senhaAviso.style.color = "gray";
      senhaAviso.style.fontSize = "14px";
      senhaAviso.style.marginTop = "4px";
    }

    containerPerfil.style.display = "block";
    avisoNaoLogado.style.display = "none";

  } catch (err) {
    console.error("Erro ao buscar dados do perfil:", err);
    avisoNaoLogado.style.display = "block";
    containerPerfil.style.display = "none";
    return;
  }

  // Função para mostrar toast
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }

  // Botão editar habilita edição dos campos
  btnEditar.addEventListener("click", () => {
    toggleEdicao(true);
  });

  // Botão salvar envia PUT para atualizar dados no backend
  btnSalvar.addEventListener("click", async () => {
    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();

    const emailParaEnviar = usuarioLocal.viaGoogle ? usuarioLocal.email : email;

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailParaEnviar);
    if (!emailValido) {
      emailErro.textContent = "O formato do e-mail está incorreto.";
      emailErro.style.display = "block";
      return;
    } else {
      emailErro.textContent = "";
      emailErro.style.display = "none";
    }

    const novosDados = {
      nome_usuario: nome,
      email: emailParaEnviar,
      senha: usuarioLocal.senha || ""
    };

    try {
      // Ajusta endpoint para PUT conforme tipo
      const endpointPut = usuarioLocal.tipo === "nutricionista"
        ? `http://localhost:3000/nutricionistas/${userId}`
        : `http://localhost:3000/usuarios/${userId}`;

      const resposta = await fetch(endpointPut, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novosDados)
      });

      if (resposta.ok) {
        labelNome.textContent = nome;
        labelEmail.textContent = emailParaEnviar;

        // Atualiza localStorage com novos dados
        localStorage.setItem("dadosUsuario", JSON.stringify({
          ...usuarioLocal,
          ...novosDados
        }));

        mensagemPerfil.textContent = "Perfil atualizado com sucesso!";
        mensagemPerfil.style.color = "green";
        toggleEdicao(false);
        showToast("Seus dados foram editados com sucesso.");
      } else {
        mensagemPerfil.textContent = "Erro ao atualizar perfil.";
        mensagemPerfil.style.color = "red";
      }
    } catch (err) {
      mensagemPerfil.textContent = "Erro de conexão.";
      mensagemPerfil.style.color = "red";
    }
  });

  // Aviso de senha só se não for login via Google
  if (!usuarioLocal.viaGoogle) {
    labelSenha.addEventListener("click", () => {
      senhaAviso.classList.remove("hidden");
    });
  }

  // Função para alternar modo edição
  function toggleEdicao(editar) {
    labelNome.classList.toggle("hidden", editar);
    inputNome.classList.toggle("hidden", !editar);

    labelEmail.classList.toggle("hidden", editar);
    inputEmail.classList.toggle("hidden", !editar);

    btnEditar.classList.toggle("hidden", editar);
    btnSalvar.classList.toggle("hidden", !editar);
  }

  // Botão voltar para página inicial
  btnVoltar.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Botão sair remove dados e redireciona
  btnSair.addEventListener("click", () => {
    localStorage.removeItem("dadosUsuario");
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
  });
});
