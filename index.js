import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

const sql = mysql2.createPool({
     host: "benserverplex.ddns.net",
      user: "alunos",
       password: "senhaAlunos",
        database: "alunos_filmes03MB" });

        
app.post("/add-movie", (req, res) => {
    const {
        title,
        genre,
        duration,
        classificacao_etaria
    } = req.body;

    const insertCommand = `
        INSERT INTO filmes_AlexandreCoutinhoLucasNunes
        (title, genre, duration, classificacao_etaria)
        VALUES (?, ?, ?, ?)
    `;

    sql.query(
        insertCommand,
        [title, genre, duration, classificacao_etaria],
        (error) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    error: "Erro ao adicionar filme"
                });
            }

            res.status(201).json({
                message: "Filme adicionado com sucesso"
            });
        }
    );
});

app.delete("/delete-movie/:id", (req, res) => {
    const { id } = req.params;

    const deleteCommand = `
        DELETE FROM filmes_AlexandreCoutinhoLucasNunes
        WHERE id = ?
    `;

    sql.query(
        deleteCommand,
        [id],
        (error) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    error: "Erro ao deletar filme"
                });
            }

            res.status(200).json({
                message: "Filme deletado com sucesso"
            });
        }
    );
});

app.get("/all-movies", (req, res) => {
    const selectCommand = `
        SELECT * FROM filmes_AlexandreCoutinhoLucasNunes
    `;

    sql.query(
        selectCommand,
        (error, data) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    error: "Erro ao buscar filmes"
                });
            }

            res.status(200).json(data);
        }
    );
});

app.put("/update-movie", (req, res) => {
    const {
        id,
        title,
        genre,
        duration,
        classificacao_etaria
    } = req.body;

    const updateCommand = `
        UPDATE filmes_AlexandreCoutinhoLucasNunes
        SET title = ?,
            genre = ?,
            duration = ?,
            classificacao_etaria = ?
        WHERE id = ?
    `;

    sql.query(
        updateCommand,
        [
            title,
            genre,
            duration,
            classificacao_etaria,
            id
        ],
        (error) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    message: "Erro ao alterar filme"
                });
            }

            res.status(200).json({
                message: "Filme alterado com sucesso!"
            });
        }
    );
});

export default app;