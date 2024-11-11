const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.post('/submit-doubt', cors(), (req, res) => {
    const newDoubt = req.body.doubt;

    fs.readFile('doubts.json', 'utf8', (err, data) => {
        let doubts = [];
        if (!err && data) {
            doubts = JSON.parse(data);
        }

        doubts.push({ id: doubts.length + 1, doubt: newDoubt, timestamp: new Date() });

        fs.writeFile('doubts.json', JSON.stringify(doubts, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar a dúvida:', err);
                res.status(500).send('Erro ao salvar a dúvida');
            } else {
                res.status(200).send('Dúvida salva com sucesso');
            }
        });
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
