require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Permite solicitudes desde cualquier origen

// Configurar la conexión a MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Ruta de login para POST
app.post('/login', (req, res) => {
    const { nombre_usuario, password } = req.body;

    // Cambia 'username' a 'nombre_usuario'
    const query = 'SELECT * FROM usuario WHERE nombre_usuario = ?';
    db.query(query, [nombre_usuario], (err, results) => {
        
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en el servidor');
        }
        
        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        const user = results[0];
        //const passwordIsValid = bcrypt.compareSync(password, user.password); para cuando tenga la funcion de registrar esta es la manera, encriptando la contraseña
        if (!password === user.password) {
            return res.status(401).send('Usuario y/o contraseña incorrecta');
        }

        const token = jwt.sign({ id: user.idusuario }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).send({ auth: true, token });
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

