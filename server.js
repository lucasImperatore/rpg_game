const express = require("express"); // Framework para criar servidor e rotas
const mysql = require("mysql2"); // Biblioteca para conectar no MySQL
const path = require("path"); // Módulo nativo do Node para lidar com caminhos

const app = express(); // Cria a aplicação Express

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Middleware para servir arquivos estáticos (HTML, CSS, JS da pasta public/)
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o banco MySQL (via XAMPP)
const db = mysql.createConnection({
  host: "localhost", // Servidor do MySQL
  user: "root", // Usuário padrão do XAMPP
  password: "", // Senha (geralmente vazia no XAMPP)
  database: "rpg_info", // Nome do banco que você criou
});

// ---------- ROTAS ----------

// GET /usuarios → retorna todos os usuários do banco
app.get("/characters", (req, res) => {
  db.query("SELECT * FROM characters", (err, results) => {
    if (err) throw err; // Se der erro na query, interrompe
    res.json(results); // Envia o resultado como JSON para o front
  });
});

// POST /usuarios → insere um novo usuário no banco
app.post("/characters", (req, res) => {
  const { classe, inteligencia, carisma, constituicao, forca, destreza, sabedoria} = req.body; // Extrai os dados enviados pelo front
  db.query(
    "INSERT INTO characters (classe, inteligencia, carisma, constituicao, forca, destreza, sabedoria) VALUES (?, ?, ?, ?, ?, ?, ?)", // Query SQL com placeholders
    [classe, inteligencia, carisma, constituicao, forca, destreza, sabedoria], // Valores que substituem os "?"
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Classe adicionada com sucesso!" }); // Retorno de sucesso
    }
  );
});

app.delete("/characters/:classe", (req, res) => {
  const classe = req.params.classe;

  db.query(
    "DELETE FROM characters WHERE classe = ?",
    [classe],
    (err, result) => {
      if (err) throw err;

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Classe não encontrada" });
      }

      res.json({ message: "Classe deletada com sucesso!" });
    }
  );
});


// Inicia o servidor na porta 3000
app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);