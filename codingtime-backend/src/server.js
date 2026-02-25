const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json()) // 🔥 PRECISA vir antes das rotas

const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')

app.use('/auth', authRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.json({ message: "CodingTime API rodando 🚀" })
})

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})