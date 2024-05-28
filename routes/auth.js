const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../db/connection');
const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
    const { email, password, name, surname } = req.body;

    try {
        // Verificar si el correo ya existe
        connection.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.error('Error al verificar el correo:', error);
                return res.status(500).send({ message: 'Error al verificar el correo' });
            }

            if (results.length > 0) {
                // El correo ya está en uso
                return res.status(400).send({ message: 'El correo ya está en uso' });
            }

            // Hashear la contraseña y registrar el usuario
            const hashedPassword = await bcrypt.hash(password, 10);
            connection.query('INSERT INTO users (email, password, name, surname) VALUES (?, ?, ?, ?)', [email, hashedPassword, name, surname], (error, results) => {
                if (error) {
                    console.error('Error al registrar usuario:', error);
                    return res.status(500).send({ message: 'Error al registrar usuario' });
                }

                res.status(201).send({ message: 'Usuario registrado con éxito' });
            });
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).send({ message: 'Error al registrar usuario' });
    }
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const user = results[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ idUser: user.id_user }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
