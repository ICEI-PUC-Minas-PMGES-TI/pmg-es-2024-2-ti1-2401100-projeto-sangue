const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');
let currentLink = ''; 

const campaigns = {
    modal1: {
        title: "Detalhes da Campanha 1",
        content: "Aqui estão os detalhes sobre a Campanha 1. Você pode incluir informações específicas sobre a campanha, objetivos, locais, etc.",
        link: "campanha1.html"
    },
    modal2: {
        title: "Detalhes da Campanha 2",
        content: "Aqui estão os detalhes sobre a Campanha 2. Você pode incluir informações específicas sobre a campanha, objetivos, locais, etc.",
        link: "campanha2.html"
    },
    modal3: {
        title: "Detalhes da Campanha 3",
        content: "Aqui estão os detalhes sobre a Campanha 3. Você pode incluir informações específicas sobre a campanha, objetivos, locais, etc.",
        link: "campanha3.html"
    },
    modal4: {
        title: "Detalhes da Campanha 4",
        content: "Aqui estão os detalhes sobre a Campanha 4. Você pode incluir informações específicas sobre a campanha, objetivos, locais, etc.",
        link: "campanha4.html"
    }
};

document.querySelectorAll('[data-modal]').forEach(item => {
    item.addEventListener('click', (e) => {
        const modalId = e.currentTarget.getAttribute('data-modal');
        showPopup(modalId);
    });
});

closeModal.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.classList.add('hidden');
});

modal.addEventListener('click', () => {
    if (currentLink) {
        window.location.href = currentLink;
    }
});

function showPopup(modalId) {
    const campaign = campaigns[modalId];
    modalTitle.textContent = campaign.title;
    modalContent.textContent = campaign.content;
    currentLink = campaign.link; 
    modal.classList.remove('hidden');
}


