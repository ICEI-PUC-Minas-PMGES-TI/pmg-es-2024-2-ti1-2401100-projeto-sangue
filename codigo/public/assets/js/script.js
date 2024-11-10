const form = document.getElementById("formCadastro");
const btnCadastrar = document.getElementById("btnCadastrar");

if (btnCadastrar) {
  btnCadastrar.addEventListener("click", async (event) => {
    event.preventDefault();

    const dados = {
      nome: form.nome.value,
      email: form.email.value,
      telefone: form.telefone.value,
      dataNascimento: form["data-nascimento"].value,
      tipoSanguineo: form["tipo-sanguineo"].value,
      estado: form.estado.value,
      cidade: form.cidade.value,
      ondeConheceu: form["onde-conheceu"].value,
      sexo: form.sexo.value,
      newsletter: form.newsletter.checked
    };

    try {
      const response = await fetch("http://localhost:3000/doadores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('usuarioId', data.id);
        alert("Doador cadastrado com sucesso!");
        window.location.href = 'pagina_perfil.html';
      } else {
        alert("Erro ao cadastrar o doador.");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro de conexão. Verifique o servidor.");
    }
  });
}

// Carrega os dados do usuário na página de perfil
document.addEventListener('DOMContentLoaded', function() {
  const usuarioId = localStorage.getItem('usuarioId');

  if (usuarioId) {
      fetch(`http://localhost:3000/doadores/${usuarioId}`)
          .then(response => response.json())
          .then(usuario => {
              document.getElementById('nome-usuario').textContent = usuario.nome;
              document.getElementById('idade-usuario').textContent = `Data de Nascimento: ${usuario.dataNascimento}`;
              document.getElementById('tipo-sanguineo').textContent = `Tipo Sanguíneo: ${usuario.tipoSanguineo}`;
              document.getElementById('email-usuario').textContent = `Email: ${usuario.email}`;
              document.getElementById('telefone-usuario').textContent = `Telefone: ${usuario.telefone}`;
              document.getElementById('estado-usuario').textContent = `Estado: ${usuario.estado}`;
              document.getElementById('cidade-usuario').textContent = `Cidade: ${usuario.cidade}`;
              document.getElementById('onde-conheceu').textContent = `Onde Conheceu: ${usuario.ondeConheceu}`;
              document.getElementById('sexo-usuario').textContent = `Sexo: ${usuario.sexo}`;
          })
          .catch(error => console.error('Erro ao carregar perfil:', error));
  }
});

// Seleciona os botões de editar e excluir
const btnEditar = document.getElementById("btnEditar");
const btnExcluir = document.getElementById("btnExcluir");

if (btnEditar) {
  btnEditar.addEventListener("click", () => {
    document.getElementById("nome-usuario").contentEditable = true;
    document.getElementById("idade-usuario").contentEditable = true;
    document.getElementById("tipo-sanguineo").contentEditable = true;
    document.getElementById("email-usuario").contentEditable = true;

    btnEditar.textContent = "Salvar";
    btnEditar.onclick = salvarEdicao;
  });
}

async function salvarEdicao() {
  const usuarioId = localStorage.getItem("usuarioId");

  const dadosEditados = {
    nome: document.getElementById("nome-usuario").textContent,
    dataNascimento: document.getElementById("idade-usuario").textContent,
    tipoSanguineo: document.getElementById("tipo-sanguineo").textContent,
    email: document.getElementById("email-usuario").textContent,
  };

  try {
    const response = await fetch(`http://localhost:3000/doadores/${usuarioId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosEditados),
    });

    if (response.ok) {
      alert("Perfil atualizado com sucesso!");
      btnEditar.textContent = "Editar Perfil";
      btnEditar.onclick = () => location.reload();
    } else {
      alert("Erro ao atualizar o perfil.");
    }
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    alert("Erro de conexão ao atualizar o perfil.");
  }
}

if (btnExcluir) {
  btnExcluir.addEventListener("click", async () => {
    const usuarioId = localStorage.getItem("usuarioId");

    if (confirm("Tem certeza que deseja excluir seu perfil?")) {
      try {
        const response = await fetch(`http://localhost:3000/doadores/${usuarioId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Perfil excluído com sucesso!");
          localStorage.removeItem("usuarioId");
          window.location.href = "index.html";
        } else {
          alert("Erro ao excluir o perfil.");
        }
      } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro de conexão ao excluir o perfil.");
      }
    }
  });
}

const btnAlterarFoto = document.getElementById("btnAlterarFoto");
const seletorFotos = document.getElementById("seletorFotos");
const fotoUsuario = document.getElementById("foto-usuario");

if (btnAlterarFoto) {
  btnAlterarFoto.addEventListener("click", () => {
      seletorFotos.style.display = "block";
  });
}

function alterarFoto(caminhoFoto) {
    fotoUsuario.src = caminhoFoto;
    seletorFotos.style.display = "none";
}
