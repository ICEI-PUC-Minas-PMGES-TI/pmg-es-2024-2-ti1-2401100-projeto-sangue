const testemunhos_inicial = [
    { nome: "Ana Souza", data: "20/07/2024", experiencia: "Foi uma experiência incrível. Senti que estava ajudando alguém em necessidade e a equipe foi muito acolhedora." },
    { nome: "Lucas Oliveira", data: "16/08/2024", experiencia: "Doar sangue é um ato simples, mas que faz uma grande diferença. Recomendo a todos que façam!" },
    { nome: "Mariana Lima", data: "23/08/2024", experiencia: "Eu estava nervosa no início, mas a equipe me tranquilizou e foi tudo muito rápido e fácil." },
    { nome: "Rafael Santos", data: "25/09/2024", experiencia: "A doação é rápida e segura. Fico feliz em saber que posso ajudar a salvar vidas." },
    { nome: "Juliana Costa", data: "13/10/2024", experiencia: "Eu nunca tinha doado antes, mas agora que fiz, pretendo voltar sempre. É um gesto de amor ao próximo." }
  ];
  

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("experienceForm");
    const nomeInput = document.getElementById("name");
    const experienciaInput = document.getElementById("experience");
    const secaoTestemunhos = document.querySelector(".testimony-section .container");

    carregarTestemunhos();

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = nomeInput.value.trim();
        const experiencia = experienciaInput.value.trim();
        const data = new Date().toLocaleDateString();

        if (nome && experiencia) {
            const testemunho = { nome, data, experiencia };
            salvarTestemunho(testemunho);
            exibirTestemunho(testemunho);
            formulario.reset();
            document.querySelector(".btn-close").click();
        }
    });

    function salvarTestemunho(testemunho) {
        const testemunhos = JSON.parse(localStorage.getItem("testemunhos")) || testemunhos_inicial;
        testemunhos.push(testemunho);
        localStorage.setItem("testemunhos", JSON.stringify(testemunhos));
    }

    function carregarTestemunhos() {
        const testemunhos = JSON.parse(localStorage.getItem("testemunhos")) || testemunhos_inicial;
        testemunhos.forEach(exibirTestemunho);
    }

    function exibirTestemunho({ nome, data, experiencia }) {
        const itemTestemunho = document.createElement("div");
        itemTestemunho.classList.add("testimony-item", "mb-4");
        itemTestemunho.innerHTML = `
            <h4>Testemunho de: ${nome}</h4>
            <p class="text-muted">Data: ${data}</p>
            <p>${experiencia}</p>
            <hr>
        `;
        secaoTestemunhos.insertBefore(itemTestemunho, secaoTestemunhos.firstChild);

    }
});
