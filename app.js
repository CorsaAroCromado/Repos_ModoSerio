const express = require('express');
const app = express();
const path = require('path');
const db = require("./connection_test");
const clientes = require("./clientes");


app.use(express.json());


app.use(express.static(path.join(__dirname, 'html')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/index.html'));
});

//app post para cadastrar
app.post('/clientes', async (req, res) => {
    const { nome, email, telefone } = req.body;
    try {
        const cliente = await clientes.criarCliente(nome, email, telefone);
        res.json({ mensagem: `Cliente ${cliente.nome} cadastrado com sucesso!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao cadastrar cliente. Email já existe?' });
    }
});

//app get para listar
app.get("/clientes", async function(req, res) {
    try {
        const lista = await clientes.listarClientes();
        res.json(lista);
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        res.status(500).json({ erro: 'Erro ao buscar clientes.' });
    }
});


app.get("/listar-clientes", (req, res) => {
    res.sendFile(path.join(__dirname, 'html/clientes.html'));
});

app.listen(8081, function() {
    console.log('Servidor rodando em http://localhost:8081');
});
