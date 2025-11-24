import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import cliente from "./cliente.js";
import livro from "./livro.js";
import autor from "./autor.js";
import multa from "./multa.js";
import emprestimo from "./emprestimo.js";

// Swagger
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// --- Configurar caminho para swagger.json ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerPath = path.join(__dirname, "swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

// --- Rota Swagger UI ---
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- Conexão MongoDB ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.log("Deu erro ao conectar com o MongoDB", error);
  }
};

connectDB();

// Healthcheck raiz
app.get("/", (req, res) => {
  res.send("API Biblioteca - OK");
});

// --------------------- CLIENTE --------------------- //
app.post("/cliente", async (req, res) => {
  try {
    const novoCliente = await cliente.create(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/cliente", async (req, res) => {
  try {
    const clientes = await cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/cliente/:id", async (req, res) => {
  try {
    const novoCliente = await cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(novoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/cliente/:id", async (req, res) => {
  try {
    const clienteExcluido = await cliente.findByIdAndDelete(req.params.id);
    res.status(200).json(clienteExcluido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --------------------- AUTOR --------------------- //
app.post("/autor", async (req, res) => {
  try {
    const novoAutor = await autor.create(req.body);
    res.status(201).json(novoAutor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/autor", async (req, res) => {
  try {
    const autores = await autor.find();
    res.status(200).json(autores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/autor/:id", async (req, res) => {
  try {
    const autorAtualizado = await autor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(autorAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/autor/:id", async (req, res) => {
  try {
    const autorExcluido = await autor.findByIdAndDelete(req.params.id);
    res.status(200).json(autorExcluido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --------------------- LIVRO --------------------- //
app.post("/livro", async (req, res) => {
  try {
    const novoLivro = await livro.create(req.body);
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/livro", async (req, res) => {
  try {
    const livros = await livro.find();
    res.status(200).json(livros);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/livro/:id", async (req, res) => {
  try {
    const livroAtualizado = await livro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(livroAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/livro/:id", async (req, res) => {
  try {
    const livroExcluido = await livro.findByIdAndDelete(req.params.id);
    res.status(200).json(livroExcluido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --------------------- EMPRÉSTIMO --------------------- //
app.post("/emprestimo", async (req, res) => {
  try {
    const novoEmprestimo = await emprestimo.create(req.body);
    res.status(201).json(novoEmprestimo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/emprestimo", async (req, res) => {
  try {
    const emprestimos = await emprestimo.find();
    res.status(200).json(emprestimos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/emprestimo/:id", async (req, res) => {
  try {
    const emprestimoAtualizado = await emprestimo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(emprestimoAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/emprestimo/:id", async (req, res) => {
  try {
    const emprestimoExcluido = await emprestimo.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(emprestimoExcluido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --------------------- MULTA --------------------- //
app.post("/multa", async (req, res) => {
  try {
    const novaMulta = await multa.create(req.body);
    res.status(201).json(novaMulta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/multa", async (req, res) => {
  try {
    const multas = await multa.find();
    res.status(200).json(multas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/multa/:id", async (req, res) => {
  try {
    const multaAtualizada = await multa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(multaAtualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/multa/:id", async (req, res) => {
  try {
    const multaExcluida = await multa.findByIdAndDelete(req.params.id);
    res.status(200).json(multaExcluida);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- Start servidor ---
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Swagger em http://localhost:${port}/api-docs`);
});
