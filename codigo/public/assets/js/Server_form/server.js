const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;
const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));  
app.use(bodyParser.json());

app.use(bodyParser.json());

app.post('/receptores', (req, res) => {
    const receptorData = req.body;
    console.log("Dados recebidos do formulário:", receptorData);

    res.status(200).json({ message: 'Dados recebidos com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
