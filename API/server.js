const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2')
const cors = require('cors')
require('dotenv').config()


const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cors());
server.use(bodyParser.json());

const PORT = 7000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

db.connect((err) => {
    if(err) return console.error(err);
    console.log("Conectado com sucesso")
})

server.get('/comment', (req, res) => {
    db.query('SELECT * FROM comment', (err, result) => {
        if(err) {
            res.status(500).json({sucess: false, error: err})
            return
        }
        res.json({success: true, comment: result});
    })
})


server.post('/login', (req, res) => {
    const { username, password} = req.body;
    db.query('SELECT * FROM user WHERE username =? AND password =?', [username, password], (err, result) => {
        if(err) {
            res.status(500).json({sucess: false, error:"Internal Server Error"})
            return;
        }
        if(result.length > 0) {
            const {id, username, password, firstname, lastname} = result[0];
            res.json({success: true, user: {id, username, password, firstname, lastname}})
        } else {
            res.json({success: false, error: 'Usuário ou senha inválidos'})
        }
    })
})

server.post('/comment', (req, res) => {
    const { author, comment_text, created_at, updated_at, idUser} = req.body;
    db.query('INSERT INTO comment (author, comment_text, created_at, updated_at, idUser) VALUES (?, ?, ?, ?, ?)', [author, comment_text, created_at, updated_at, idUser], (err, result) => {
        if(err) {
            console.error(err);
            res.status(500).json({ success: false, error: "Internal Server Error" });
            return;
        }

    });
});

server.get('/user', (req, res) => {
    db.query('SELECT * FROM user', (err, result) => {
        if(err) {
            res.status(500).json({sucess: false, error: err})
            return
        }
        res.json({success: true, user: result});
    })
})

server.get('/', (req, res) => {
    res.send(` <h1>API DO SISTEMA HUB-COMENTARIOS</h1>
    <ul>
        <li><a href="http://localhost:7000/comment"> get de comentarios</a></li>
        <li><a href="http://localhost:7000/user"> get de usuarios</a></li>
    </ul>`)
})

server.listen(PORT, () =>{
    console.log(`O server está rodando em http:\\localhost:${PORT}`)
} )