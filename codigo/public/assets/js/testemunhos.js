const testemunhosApp = {
    testemunhos_inicial: [
        { 
            id: 1,
            nome: "Ana Souza", 
            data: "20/07/2024", 
            experiencia: "Foi uma experiência incrível. Senti que estava ajudando alguém em necessidade e a equipe foi muito acolhedora.", 
            reacoes: { tipo1: 0, tipo2: 0, tipo3: 0, tipo4: 0 } 
        },
        { 
            id: 2,
            nome: "Lucas Oliveira", 
            data: "16/08/2024", 
            experiencia: "Doar sangue é um ato simples, mas que faz uma grande diferença. Recomendo a todos que façam!", 
            reacoes: { tipo1: 0, tipo2: 0, tipo3: 0, tipo4: 0 } 
        },
        { 
            id: 3,
            nome: "Mariana Lima", 
            data: "23/08/2024", 
            experiencia: "Eu estava nervosa no início, mas a equipe me tranquilizou e foi tudo muito rápido e fácil.", 
            reacoes: { tipo1: 0, tipo2: 0, tipo3: 0, tipo4: 0 } 
        },
        { 
            id: 4,
            nome: "Rafael Santos", 
            data: "25/09/2024", 
            experiencia: "A doação é rápida e segura. Fico feliz em saber que posso ajudar a salvar vidas.", 
            reacoes: { tipo1: 0, tipo2: 0, tipo3: 0, tipo4: 0 }  
        },
        { 
            id: 5,
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
        const searchForm = document.querySelector(".search-section form");
        const ordenarTestemunhos = document.querySelectorAll(".dropdown-item");

        this.carregarTestemunhos();

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

        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const searchInput = searchForm.querySelector("input[type='search']").value.toLowerCase();
            this.carregarTestemunhos(searchInput);
        });

        ordenarTestemunhos.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
        
                ordenarTestemunhos.forEach(item => item.classList.remove("active"));
                e.target.classList.add("active");
        
                const filtro = e.target.textContent.toLowerCase();
                this.carregarTestemunhos(null, filtro);
            });
        });
        
    },

    salvarTestemunho: function (testemunho) {
        const testemunhos = JSON.parse(localStorage.getItem("testemunhos")) || this.testemunhos_inicial;
        testemunho.id = testemunhos.length ? Math.max(...testemunhos.map(t => t.id)) + 1 : 1;
        testemunhos.push(testemunho);
        localStorage.setItem("testemunhos", JSON.stringify(testemunhos));
    },
    

    carregarTestemunhos: function (busca = null, filtro = null) {
        const secaoTestemunhos = document.querySelector(".testimony-section .container");
        secaoTestemunhos.innerHTML = "";

        let testemunhos = JSON.parse(localStorage.getItem("testemunhos")) || this.testemunhos_inicial;
    
        if (busca) {
            testemunhos = testemunhos.filter(testemunho => {
                return testemunho.nome.toLowerCase().includes(busca) || testemunho.experiencia.toLowerCase().includes(busca);
            });
        }

        if (filtro) {
            switch (filtro) {
                case "mais recentes":
                    testemunhos.sort((a, b) => new Date(b.data.split('/').reverse()) - new Date(a.data.split('/').reverse())).reverse();
                    break;
                case "mais antigos":
                    testemunhos.sort((a, b) => new Date(a.data.split('/').reverse()) - new Date(b.data.split('/').reverse())).reverse();
                    break;
                default:
                    break;
            }
        }

        testemunhos.forEach(testemunho => this.exibirTestemunho(testemunho));

    },

    adicionarReacao: function (id, tipo) {
        const testemunhos = JSON.parse(localStorage.getItem("testemunhos")) || this.testemunhos_inicial;
        const testemunho = testemunhos.find(test => test.id === id);
        if (testemunho) {
            testemunho.reacoes[tipo] += 1;
            localStorage.setItem("testemunhos", JSON.stringify(testemunhos));
            
            const searchInput = document.querySelector("input[type='search']").value.toLowerCase();
            const filtro = document.querySelector(".dropdown-item.active")?.textContent?.toLowerCase() || null;

            this.carregarTestemunhos(searchInput, filtro);
        }
    },

    exibirTestemunho: function ({ id, nome, data, experiencia, reacoes }) {
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
                <button class="btn btn-outline-primary me-2" onclick="testemunhosApp.adicionarReacao(${id}, 'tipo1')">👍 ${reacoes.tipo1}</button>
                <button class="btn btn-outline-success me-2" onclick="testemunhosApp.adicionarReacao(${id}, 'tipo2')">❤️ ${reacoes.tipo2}</button>
                <button class="btn btn-outline-warning me-2" onclick="testemunhosApp.adicionarReacao(${id}, 'tipo3')">👏 ${reacoes.tipo3}</button>
                <button class="btn btn-outline-danger me-2" onclick="testemunhosApp.adicionarReacao(${id}, 'tipo4')">😢 ${reacoes.tipo4}</button>
            </div>
            <hr>
        `;
        secaoTestemunhos.insertBefore(itemTestemunho, secaoTestemunhos.firstChild);
    }
    
};

document.addEventListener("DOMContentLoaded", function () {
    testemunhosApp.init();
});
