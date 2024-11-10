$(document).ready(function () {
    $('#telefone').mask('(00) 00000-0000');

    $('#form-receptor').on('submit', function (event) {
        event.preventDefault();

        const nome = $('#nome').val();
        const sobrenome = $('#sobrenome').val();
        const email = $('#email').val();
        const confirmarEmail = $('#confirmar-email').val();
        const telefone = $('#telefone').val();
        const idade = $('#idade').val();
        const tipoSanguineo = $('input[name="blood"]:checked').val();

        console.log("Dados do Formulário: ", nome, sobrenome, email, telefone, idade, tipoSanguineo);

        // Validação de campos obrigatórios
        if (email !== confirmarEmail) {
            alert('Os emails não coincidem. Por favor, verifique.');
            return;
        }
        if (!tipoSanguineo) {
            alert('Por favor, selecione um tipo sanguíneo.');
            return;
        }
        if (!idade || isNaN(idade) || idade <= 0) {
            alert('Por favor, insira uma idade válida.');
            return;
        }

        // Dados
        const receptorData = {
            nome,
            sobrenome,
            email,
            telefone,
            idade,
            tipoSanguineo
        };

        console.log("Enviando dados para o servidor:", receptorData);

        //AJAX
        $.ajax({
            url: 'http://localhost:3001/receptores',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(receptorData),
            success: function (response) {
                console.log("Resposta do servidor: ", response);
                alert('Dados salvos com sucesso!');

                // Limpar os campos do formulário
                $('#form-receptor').find('input, select, textarea').val('');
                $('#form-receptor').find('input[type=radio], input[type=checkbox]').prop('checked', false);

                // Redireciona para a Home(quando tiver uma)
                setTimeout(function () {
                    window.location.href = 'index.html';
                }, 2000);
            },
            error: function (xhr, status, error) {
                console.error("Erro ao enviar dados:", status, error);
                alert('Erro ao salvar dados! Tente novamente mais tarde.');
            }
        });
    });
});











