const express = require('express');
const app = express();
const path = require('path');
const clientes = require('./clientes'); // Func Crud
const PORT = 8081;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'html')));

// Cadastro
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/index.html'));
});

// Listar cliente
app.get('/listar-clientes', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/clientes.html'));
});

// Cadastrar cliente
app.post('/clientes', async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    const cliente = await clientes.criarCliente(nome, email, telefone);
    res.json({ mensagem: `Cliente ${cliente.nome} cadastrado com sucesso!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar cliente.' });
  }
});

// Lista os clientes em .json
app.get('/clientes', async (req, res) => {
  try {
    const lista = await clientes.listarClientes();
    res.json(lista);
  } catch (err) {
    console.error("Erro ao buscar clientes:", err);
    res.status(500).json({ erro: 'Erro ao buscar clientes.' });
  }
});

// Excluir cliente
app.get('/apagar-clientes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await clientes.deletarCliente(id);
    res.redirect('/listar-clientes');
  } catch (err) {
    console.error("Erro ao apagar cliente:", err);
    res.status(500).json({ erro: 'Erro ao apagar cliente.' });
  }
});
app.get('/clientes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const cliente = await clientes.buscarCliente(id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ erro: 'Cliente não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar cliente.' });
  }
});

app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;

  try {
    await clientes.atualizarCliente(id, nome, email, telefone);
    res.json({ mensagem: `Cliente ${nome} atualizado com sucesso!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao atualizar cliente.' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
