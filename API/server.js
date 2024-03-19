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
            const {id, username, firstname, lastname} = result[0];
            res.json({success: true, user: {id, username, firstname, lastname}})
        } else {
            res.json({success: false, error: 'Usuário ou senha inválidos'})
        }
    })
})

server.get('/user', (req, res) => {
    db.query('SELECT * FROM user', (err, result) => {
        if(err) {
            res.status(500).json({sucess: false, error: err})
            return
        }
        res.json({success: true, user: result});
    })
})

server.listen(PORT, () =>{
    console.log(`O server está rodando em http:\\localhost:${PORT}`)
} )