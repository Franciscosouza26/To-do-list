require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "..")));
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get("/tasks", async (req, res) => {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id");
    res.json(result.rows);
});

app.post("/tasks", async (req,res) => {
    const { title } = req.body;
    const task =  await pool.query(
        "INSERT INTO tasks (title, is_done) VALUES ($1, false) RETURNING *",
        [title]
    );
    res.json(task.rows[0]);
});

app.patch("/tasks/:id", async (req, res) => {
    const { title, is_done, done_hour } = req.body;
    await pool.query(
      `UPDATE tasks SET
        title = COALESCE($1, title),
        is_done = COALESCE($2, is_done),
        done_hour = COALESCE($3, done_hour)
       WHERE id = $4`,
      [title, is_done, done_hour, req.params.id]
    );
    res.sendStatus(204);
});

app.delete("/tasks/:id", async (req,res) => {
    await pool.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
    res.sendStatus(204);

});

app.listen( 3000, () => console.log("API rodando porta 3000"))