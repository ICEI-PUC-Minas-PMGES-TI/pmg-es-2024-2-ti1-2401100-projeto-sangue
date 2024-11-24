document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("formCadastroIndex");

  // Cadastro de usuário
  if (formCadastro) {
    formCadastro.addEventListener("submit", async (event) => {
      event.preventDefault();

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
        const response = await fetch("http://localhost:3000/doadores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const usuarioCriado = await response.json();
          localStorage.setItem("usuarioId", usuarioCriado.id);
          window.location.href = "pagina_perfil.html";
        } else {
          alert("Erro ao cadastrar. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro de conexão com o servidor.");
      }
    });
  }

  const usuarioId = localStorage.getItem("usuarioId");

  // Exibição de perfil
  if (usuarioId && window.location.pathname.includes("pagina_perfil.html")) {
    fetch(`http://localhost:3000/doadores/${usuarioId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Usuário não encontrado.");
        return response.json();
      })
      .then((usuario) => {
        document.getElementById("nome-usuario").textContent = usuario.nome;
        document.getElementById(
          "idade-usuario"
        ).textContent = `Data de Nascimento: ${usuario.dataNascimento}`;
        document.getElementById(
          "tipo-sanguineo"
        ).textContent = `Tipo Sanguíneo: ${usuario.tipoSanguineo}`;
        document.getElementById(
          "email-usuario"
        ).textContent = `Email: ${usuario.email}`;
        document.getElementById(
          "telefone-usuario"
        ).textContent = `Telefone: ${usuario.telefone}`;
        document.getElementById(
          "estado-usuario"
        ).textContent = `Estado: ${usuario.estado}`;
        document.getElementById(
          "cidade-usuario"
        ).textContent = `Cidade: ${usuario.cidade}`;
        document.getElementById(
          "onde-conheceu"
        ).textContent = `Onde Conheceu: ${usuario.ondeConheceu}`;
        document.getElementById(
          "sexo-usuario"
        ).textContent = `Sexo: ${usuario.sexo}`;
      })
      .catch((error) => {
        console.error("Erro ao carregar perfil:", error);
        alert("Erro ao carregar o perfil. Tente novamente.");
        window.location.href = "index.html";
      });
  }

  // Edição de perfil
  if (usuarioId && window.location.pathname.includes("pagina_perfil.html")) {
    const btnEditar = document.getElementById("btnEditar");

    btnEditar.addEventListener("click", async () => {
      try {
        const response = await fetch(`http://localhost:3000/doadores/${usuarioId}`);
        if (!response.ok) throw new Error("Erro ao buscar usuário.");
        const usuario = await response.json();
    
        const formHTML = `
          <form id="formEdicao" class="form-cadastro">
            <label for="nome">Nome Completo</label>
            <input type="text" id="nome" name="nome" value="${usuario.nome}" required>
    
            <label for="email">Email</label>
            <input type="email" id="email" name="email" value="${usuario.email}" required>
    
            <label for="telefone">Telefone</label>
            <input type="tel" id="telefone" name="telefone" value="${usuario.telefone}" required>
    
            <label for="dataNascimento">Data de Nascimento</label>
            <input type="date" id="dataNascimento" name="dataNascimento" value="${usuario.dataNascimento}" required>
    
            <label for="tipoSanguineo">Tipo Sanguíneo</label>
            <select id="tipoSanguineo" name="tipoSanguineo" required>
              <option value="A+" ${usuario.tipoSanguineo === "A+" ? "selected" : ""}>A+</option>
              <option value="A-" ${usuario.tipoSanguineo === "A-" ? "selected" : ""}>A-</option>
              <option value="B+" ${usuario.tipoSanguineo === "B+" ? "selected" : ""}>B+</option>
              <option value="B-" ${usuario.tipoSanguineo === "B-" ? "selected" : ""}>B-</option>
              <option value="AB+" ${usuario.tipoSanguineo === "AB+" ? "selected" : ""}>AB+</option>
              <option value="AB-" ${usuario.tipoSanguineo === "AB-" ? "selected" : ""}>AB-</option>
              <option value="O+" ${usuario.tipoSanguineo === "O+" ? "selected" : ""}>O+</option>
              <option value="O-" ${usuario.tipoSanguineo === "O-" ? "selected" : ""}>O-</option>
            </select>
    
            <label for="estado">Estado</label>
            <input type="text" id="estado" name="estado" value="${usuario.estado}" required>
    
            <label for="cidade">Cidade</label>
            <input type="text" id="cidade" name="cidade" value="${usuario.cidade}" required>
    
            <label for="ondeConheceu">Onde nos conheceu?</label>
            <select id="ondeConheceu" name="ondeConheceu" required>
              <option value="Internet" ${usuario.ondeConheceu === "Internet" ? "selected" : ""}>Internet</option>
              <option value="TV" ${usuario.ondeConheceu === "TV" ? "selected" : ""}>TV</option>
              <option value="Amigos" ${usuario.ondeConheceu === "Amigos" ? "selected" : ""}>Amigos</option>
              <option value="Outros" ${usuario.ondeConheceu === "Outros" ? "selected" : ""}>Outros</option>
            </select>
    
            <label for="sexo">Sexo</label>
            <select id="sexo" name="sexo" required>
              <option value="Masculino" ${usuario.sexo === "Masculino" ? "selected" : ""}>Masculino</option>
              <option value="Feminino" ${usuario.sexo === "Feminino" ? "selected" : ""}>Feminino</option>
            </select>
    
            <button type="submit" class="btn-cadastrar">Salvar Alterações</button>
          </form>
        `;
    
        document.querySelector(".detalhes-perfil").innerHTML = formHTML;
    
        const formEdicao = document.getElementById("formEdicao");
        formEdicao.addEventListener("submit", async (event) => {
          event.preventDefault();
    
          const dadosAtualizados = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            dataNascimento: document.getElementById("dataNascimento").value,
            tipoSanguineo: document.getElementById("tipoSanguineo").value,
            estado: document.getElementById("estado").value,
            cidade: document.getElementById("cidade").value,
            ondeConheceu: document.getElementById("ondeConheceu").value,
            sexo: document.getElementById("sexo").value,
          };
    
          const response = await fetch(`http://localhost:3000/doadores/${usuarioId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosAtualizados),
          });
    
          if (response.ok) {
            alert("Perfil atualizado com sucesso!");
            location.reload();
          } else {
            alert("Erro ao atualizar o perfil. Tente novamente.");
          }
        });
      } catch (error) {
        console.error("Erro ao carregar dados para edição:", error);
        alert("Não foi possível carregar os dados para edição.");
      }
    });        
  }

  if (usuarioId && window.location.pathname.includes("pagina_perfil.html")) {
    const btnExcluir = document.getElementById("btnExcluir");

    btnExcluir.addEventListener("click", async () => {
        console.log("Botão de excluir clicado.");
        console.log("usuarioId recuperado:", usuarioId);

        const confirmacao = confirm("Tem certeza de que deseja excluir seu perfil?");

        if (confirmacao) {
            try {
                const response = await fetch(`http://localhost:3000/doadores/${usuarioId}`, {
                    method: "DELETE",
                });

                console.log("Resposta do servidor:", response);

                if (response.ok) {
                    alert("Perfil excluído com sucesso.");
                    localStorage.removeItem("usuarioId");
                    window.location.href = "index.html";
                } else {
                    alert("Erro ao excluir o perfil. Tente novamente.");
                }
            } catch (error) {
                console.error("Erro ao excluir o perfil:", error);
                alert("Erro de conexão com o servidor.");
            }
        }
    });
}

  // Alteração de foto de perfil
  if (usuarioId && window.location.pathname.includes("pagina_perfil.html")) {
    const btnAlterarFoto = document.getElementById("btnAlterarFoto");
    const seletorFotos = document.getElementById("seletorFotos");
    const fotoAtual = document.getElementById("fotoAtual").src = usuario.foto.startsWith("http") 
    ? usuario.foto 
    : `http://localhost:5500/${usuario.foto}`;
  
  
    // Exibe ou esconde o seletor de fotos
    btnAlterarFoto.addEventListener("click", () => {
      seletorFotos.style.display =
        seletorFotos.style.display === "block" ? "none" : "block";
    });
  
    // Adiciona evento de clique para cada opção de foto
    document.querySelectorAll(".foto-opcao").forEach((foto) => {
      foto.addEventListener("click", async () => {
        const novaFoto = foto.src;
  
        try {
          // Envia a nova foto para o backend
          const response = await fetch(`http://localhost:3000/doadores/${usuarioId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ foto: novaFoto }),
          });
  
          if (response.ok) {
            const usuarioAtualizado = await response.json(); // Confirma alteração no servidor
            fotoAtual.src = usuarioAtualizado.foto; // Atualiza a imagem central
            seletorFotos.style.display = "none"; // Esconde o seletor de fotos
            alert("Foto de perfil alterada com sucesso!");
          } else {
            alert("Erro ao alterar a foto. Tente novamente.");
          }
        } catch (error) {
          console.error("Erro ao alterar a foto:", error);
          alert("Erro ao conectar com o servidor.");
        }
      });
    });
  }  
});
