const testemunhosApp = {
    testemunhos_inicial: [
        { 
            nome: "Ana Souza", 
            data: "20/07/2024", 
            experiencia: "Foi uma experiência incrível. Senti que estava ajudando alguém em necessidade e a equipe foi muito acolhedora.", 
            reacoes: { tipo1: 0, tipo2: 0, tipo3: 0, tipo4: 0 } 
        },
        { 
            nome: "Lucas Oliveira", 
            data: "16/08/2024", 
            experiencia: "Doar sangue é um ato simples, mas que faz uma grande diferença. Recomendo a todos que façam!", 
            reacoes: { tipo1: 0, tipo2: 0, tipo3: 0, tipo4: 0 } 
        },
        { 
            nome: "Mariana Lima", 
            data: "23/08/2024", 
            experiencia: "Eu estava nervosa no início, mas a equipe me tranquilizou e foi tudo muito rápido e fácil.", 
            reacoes: { tipo1: 0, tipo2: 0, tipo3: 0, tipo4: 0 } 
        },
        { 
            nome: "Rafael Santos", 
            data: "25/09/2024", 
            experiencia: "A doação é rápida e segura. Fico feliz em saber que posso ajudar a salvar vidas.", 
            reacoes: { tipo1: 0, tipo2: 0, tipo3: 0, tipo4: 0 }  
        },
        { 
            nome: "Juliana Costa", 
            data: "13/10/2024", 
            experiencia: "Eu nunca tinha doado antes, mas agora que fiz, pretendo voltar sempre. É um gesto de amor ao próximo.", 
            reacoes: { tipo1: 0, tipo2: 0, tipo3: 0, tipo4: 0 } 
        }
    ],

    init: function () {

        const formulario = document.getElementById("experienceForm");
        const nomeInput = document.getElementById("name");
        const experienciaInput = document.getElementById("experience");

        this.carregarTestemunhos();

        const testemunhos = JSON.parse(localStorage.getItem("testemunhos")) || this.testemunhos_inicial;
        testemunhos.forEach(testemunho => {
            if (!testemunho.reacoes) {
                testemunho.reacoes = { tipo1: 0, tipo2: 0, tipo3: 0, tipo4: 0 };
            }
        });

        formulario.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = nomeInput.value.trim();
            const experiencia = experienciaInput.value.trim();
            const data = new Date().toLocaleDateString();

            if (nome && experiencia) {
                const testemunho = { nome, data, experiencia, reacoes: { tipo1: 0, tipo2: 0, tipo3: 0, tipo4: 0 } };
                this.salvarTestemunho(testemunho);
                this.exibirTestemunho(testemunho, 0);
                formulario.reset();
                document.querySelector(".btn-close").click();
            }
        });
    },

    salvarTestemunho: function (testemunho) {
        const testemunhos = JSON.parse(localStorage.getItem("testemunhos")) || this.testemunhos_inicial;
        testemunhos.push(testemunho);
        localStorage.setItem("testemunhos", JSON.stringify(testemunhos));
    },

    carregarTestemunhos: function () {
        const secaoTestemunhos = document.querySelector(".testimony-section .container");
        secaoTestemunhos.innerHTML = "";
        const testemunhos = JSON.parse(localStorage.getItem("testemunhos")) || this.testemunhos_inicial;
        testemunhos.forEach((testemunho, index) => this.exibirTestemunho(testemunho, index));
    },

    adicionarReacao: function (index, tipo) {
        const testemunhos = JSON.parse(localStorage.getItem("testemunhos")) || this.testemunhos_inicial;
        testemunhos[index].reacoes[tipo] += 1;
        localStorage.setItem("testemunhos", JSON.stringify(testemunhos));
        this.carregarTestemunhos();
    },

    exibirTestemunho: function ({ nome, data, experiencia, reacoes }, index) {

        if (!nome || !data || !experiencia || !reacoes) {
            return;
        }

        const secaoTestemunhos = document.querySelector(".testimony-section .container");
        const itemTestemunho = document.createElement("div");
        itemTestemunho.classList.add("testimony-item", "mb-4");

        itemTestemunho.innerHTML = `
            <h4>Testemunho de: ${nome}</h4>
            <p class="text-muted">Data: ${data}</p>
            <p>${experiencia}</p>
            <div class="reaction-buttons">
                <button class="btn btn-outline-primary me-2" onclick="testemunhosApp.adicionarReacao(${index}, 'tipo1')">👍 ${reacoes.tipo1}</button>
                <button class="btn btn-outline-success me-2" onclick="testemunhosApp.adicionarReacao(${index}, 'tipo2')">❤️ ${reacoes.tipo2}</button>
                <button class="btn btn-outline-warning me-2" onclick="testemunhosApp.adicionarReacao(${index}, 'tipo3')">👏 ${reacoes.tipo3}</button>
                <button class="btn btn-outline-danger me-2" onclick="testemunhosApp.adicionarReacao(${index}, 'tipo4')">😢 ${reacoes.tipo4}</button>
            </div>
            <hr>
        `;
        secaoTestemunhos.insertBefore(itemTestemunho, secaoTestemunhos.firstChild);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    testemunhosApp.init();
});
