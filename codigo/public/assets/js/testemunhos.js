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
        const testemunhos = JSON.parse(localStorage.getItem("testemunhos")) || [];
        testemunhos.unshift(testemunho);
        localStorage.setItem("testemunhos", JSON.stringify(testemunhos));
    }

    function carregarTestemunhos() {
        const testemunhos = JSON.parse(localStorage.getItem("testemunhos")) || [];
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
