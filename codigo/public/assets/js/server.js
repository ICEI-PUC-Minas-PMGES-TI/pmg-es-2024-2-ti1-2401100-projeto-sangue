const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json()); // Permite que o servidor entenda JSON

app.post("/salvar_doador", (req, res) => {
    const novoDoador = req.body;

    // Lê o arquivo doadores.json, ou cria um array vazio se não existir
    fs.readFile("doadores.json", "utf8", (err, data) => {
        const doadores = data ? JSON.parse(data) : [];

        // Adiciona o novo doador ao array
        doadores.push(novoDoador);

        // Salva o array atualizado no arquivo JSON
        fs.writeFile("doadores.json", JSON.stringify(doadores, null, 2), (err) => {
            if (err) {
                console.error("Erro ao salvar o arquivo:", err);
                res.status(500).json({ success: false });
            } else {
                res.json({ success: true });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
