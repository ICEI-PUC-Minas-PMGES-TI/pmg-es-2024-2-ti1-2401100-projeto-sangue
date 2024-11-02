$(document).ready(function() {
    $('#telefone').mask('(00) 00000-0000');
});

$(document).ready(function() {
    $('form').on('submit', function(event) {
        event.preventDefault(); 
        
        // Dados do formulário
        const nome = $('#nome').val();
        const sobrenome = $('#sobrenome').val();
        const email = $('#email').val();
        const confirmarEmail = $('input[name="confirmar-email"]').val();
        const telefone = $('#telefone').val();
        const idade = $('#idade').val();
        const tipoSanguineo = $('input[name="blood"]:checked').val();

        // Valida se os emails são iguais
        if (email !== confirmarEmail) {
            alert('Os emails não coincidem. Por favor, verifique.');
            return;
        }

        const receptorData = {
            nome,
            sobrenome,
            email,
            telefone,
            idade,
            tipoSanguineo
        };

        // Obtém os dados existentes do localStorage
        let receptores = JSON.parse(localStorage.getItem('receptores')) || [];

        // Adiciona o novo receptor ao array
        receptores.push(receptorData);

        // Salva os dados atualizados no localStorage
        localStorage.setItem('receptores', JSON.stringify(receptores));

        alert('Dados salvos com sucesso!');

        // Opcional: Limpa o formulário após o envio
        $('form')[0].reset();
    });
});

    

