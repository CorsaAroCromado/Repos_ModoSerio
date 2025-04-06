const pool = require('./db');


// CREATE
async function criarCliente(nome, email, telefone) {
  try {
    const res = await pool.query(
      'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, telefone]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

// READ (todos)
async function listarClientes() {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    //console.table(result.rows);
    return result.rows;
  } catch (error) {
    console.error("❌ Erro ao listar clientes:", error);
    throw error;
  }
}

// READ (um cliente pelo ID)
async function buscarCliente(id) {
  try {
    const res = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    //console.log('🔍 Cliente encontrado:', res.rows[0]);
    return res.rows[0];
  } catch (err) {
    return err;
  }
}

// UPDATE
async function atualizarCliente(id, nome, email, telefone) {
  try {
    const res = await pool.query(
      'UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *',
      [nome, email, telefone, id]
    );
    console.log('✏️ Cliente atualizado:', res.rows[0]);
  } catch (err) {
    console.error('❌ Erro ao atualizar cliente:', err);
  }
}

// DELETE
async function deletarCliente(id) {
  try {
    const res = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
    console.log('🗑️ Cliente deletado:', res.rows[0]);
  } catch (err) {
    console.error('❌ Erro ao deletar cliente:', err);
  }
}

module.exports = {
    criarCliente,
    listarClientes,
    buscarCliente,
    atualizarCliente,
    deletarCliente
}



//Testes (descomente conforme quiser testar)   
    //async function testarCrud() {
  //await criarCliente('João Silva', 'joao@email.com', '11999999999');
  //await listarClientes();
  /*await buscarCliente(1);
  await atualizarCliente(1, 'João S. Alterado', 'joao.novo@email.com', '11888888888');
  await deletarCliente(1);*/

    //await pool.end(); // encerra conexão
//}

//testarCrud();
