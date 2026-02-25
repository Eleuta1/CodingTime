const pool = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body

  try {
    const hashedPassword = await bcrypt.hash(senha, 10)

    const result = await pool.query(
      'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, hashedPassword]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.login = async (req, res) => {
  const { email, senha } = req.body

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuário não encontrado' })
    }

    const user = result.rows[0]

    const validPassword = await bcrypt.compare(senha, user.senha)

    if (!validPassword) {
      return res.status(400).json({ error: 'Senha inválida' })
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token })
  } catch (error) {
    console.log("ERRO COMPLETO:", error)
    res.status(500).json({ error: error.message || "Erro interno" })
  }
}