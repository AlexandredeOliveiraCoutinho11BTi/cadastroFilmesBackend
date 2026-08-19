import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

export default app;