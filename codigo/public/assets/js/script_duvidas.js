function toggleSearch() {
    var searchInput = document.querySelector('.search-input');
    if (searchInput.classList.contains('active')) {
        searchInput.classList.remove('active');
        searchInput.style.width = '0';
        searchInput.style.display = 'none'; // Adicione isso para esconder
    } else {
        searchInput.classList.add('active');
        searchInput.style.display = 'inline-block'; // Adicione isso para exibir
        searchInput.style.width = '200px';
    }
}

function toggleAnswer(element) {
    var faqItem = element.parentElement;
    var answer = faqItem.querySelector('.answer');
    var toggle = faqItem.querySelector('.toggle');
    if (faqItem.classList.contains('expanded')) {
        faqItem.classList.remove('expanded');
        answer.style.display = 'none';
        toggle.innerHTML = "+";
    } else {
        faqItem.classList.add('expanded');
        answer.style.display = 'block';
        toggle.innerHTML = "-";
    }
}

function applyFilter() {
    const filterValue = document.getElementById("filterSelect").value;
    const faqItems = document.querySelectorAll(".faq-item");
    const titles = document.querySelectorAll("h3");

    faqItems.forEach(item => {
        const category = item.closest(".col-md-8").previousElementSibling.querySelector("h3").textContent;

        if (
            (filterValue === "doacao procedimentos" && category.includes("Doação de Sangue e Procedimentos")) ||
            (filterValue === "doacao derivados" && category.includes("Doação de Sangue e Derivados e Medula Óssea")) ||
            (filterValue === "cuidados" && category.includes("Cuidados Pós-Doação")) ||
            filterValue === "all"
        ) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

    titles.forEach(title => {
        const categoryItems = title.parentElement.nextElementSibling.querySelectorAll(".faq-item");
        const hasVisibleItems = Array.from(categoryItems).some(item => item.style.display === "block");

        title.style.display = hasVisibleItems ? "block" : "none";
    });
}

function searchFAQ() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const questions = document.querySelectorAll('.faq-item');

    questions.forEach(question => {
        const questionText = question.querySelector('.question span').innerText.toLowerCase();
        if (questionText.includes(input)) {
            question.style.display = 'block';
        } else {
            question.style.display = 'none';
        }
    });
}


function openForm() {
    document.getElementById('formModal').style.display = 'block';
}

function closeForm() {
    document.getElementById('formModal').style.display = 'none';
}

function submitDoubt() {
    const userDoubt = document.getElementById('userDoubt').value;
    if (userDoubt.trim() === "") {
        alert("Por favor, digite sua dúvida.");
        return;
    }
    
    alert("Dúvida enviada com sucesso!");

    document.getElementById('userDoubt').value = '';
    closeForm();
}

window.onclick = function(event) {
    const modal = document.getElementById('formModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
