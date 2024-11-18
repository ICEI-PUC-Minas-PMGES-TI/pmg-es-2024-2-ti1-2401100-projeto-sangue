// Para o formulário de cadastro
document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("formCadastro");

  if (formCadastro) {
    formCadastro.addEventListener("submit", async (event) => {
      event.preventDefault(); // Impede o comportamento padrão do formulário

      // Coleta os dados do formulário
      const formData = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        tipoSanguineo: document.getElementById("tipoSanguineo").value,
        estado: document.getElementById("estado").value,
        cidade: document.getElementById("cidade").value,
        ondeConheceu: document.getElementById("ondeConheceu").value,
        sexo: document.getElementById("sexo").value,
        newsletter: document.querySelector("input[name=newsletter]").checked,
      };

      try {
        // Envia os dados para o JSON Server
        const response = await fetch("http://localhost:3000/doadores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Converte os dados para JSON
        });

        if (response.ok) {
          const usuarioCriado = await response.json();
          localStorage.setItem("usuarioId", usuarioCriado.id); // Salva o ID do usuário no localStorage
          window.location.href = "pagina_perfil.html"; // Redireciona para a página de perfil
        } else {
          alert("Erro ao cadastrar. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro de conexão com o servidor.");
      }
    });
  }

  // Para a página de perfil
  const usuarioId = localStorage.getItem("usuarioId");

  if (usuarioId && window.location.pathname.includes("pagina_perfil.html")) {
    // Carrega os dados do usuário na página de perfil
    fetch(`http://localhost:3000/doadores/${usuarioId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Usuário não encontrado.");
        }
        return response.json();
      })
      .then((usuario) => {
        // Preenche os dados do usuário na página de perfil
        document.getElementById("nome-usuario").textContent = usuario.nome;
        document.getElementById("idade-usuario").textContent = `Data de Nascimento: ${usuario.dataNascimento}`;
        document.getElementById("tipo-sanguineo").textContent = `Tipo Sanguíneo: ${usuario.tipoSanguineo}`;
        document.getElementById("email-usuario").textContent = `Email: ${usuario.email}`;
        document.getElementById("telefone-usuario").textContent = `Telefone: ${usuario.telefone}`;
        document.getElementById("estado-usuario").textContent = `Estado: ${usuario.estado}`;
        document.getElementById("cidade-usuario").textContent = `Cidade: ${usuario.cidade}`;
        document.getElementById("onde-conheceu").textContent = `Onde Conheceu: ${usuario.ondeConheceu}`;
        document.getElementById("sexo-usuario").textContent = `Sexo: ${usuario.sexo}`;
      })
      .catch((error) => {
        console.error("Erro ao carregar perfil:", error);
        alert("Erro ao carregar o perfil. Tente novamente.");
        window.location.href = "index.html"; // Redireciona para o cadastro se houver erro
      });
  }
});
