// Navbar móvel

class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);  // O ícone de hambúrguer
        this.navList = document.querySelector(navList);  // A lista de navegação
        this.navLinks = document.querySelectorAll(navLinks);  // Todos os links de navegação
        this.activeClass = "active";  // Classe que será adicionada para ativar o menu

        // Vincula a função handleClick ao contexto da classe
        this.handleClick = this.handleClick.bind(this);
    }

    // Função para animar os links de navegação
    animateLinks() {
        this.navLinks.forEach((link, index) => {
            // Se o link já tiver animação, remove, senão adiciona a animação
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
        });
    }

    // Função para controlar o clique no ícone do menu
    handleClick() {
        this.navList.classList.toggle(this.activeClass);  // Mostra ou esconde o menu
        this.mobileMenu.classList.toggle(this.activeClass);  // Anima o ícone de hambúrguer
        this.animateLinks();  // Anima os links
    }

    // Função para ativar o menu móvel
    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }
}

// Inicializa a navegação móvel
const mobileNavbar = new MobileNavbar(
    ".mobile-menu",  // Seleciona o ícone do menu
    ".nav-links",  // Seleciona a lista de links de navegação
    ".nav-links li"  // Seleciona os itens de cada link
);

// Adiciona o evento de clique para ativar o menu
mobileNavbar.addClickEvent();

