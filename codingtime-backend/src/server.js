const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')

app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: "CodingTime API rodando 🚀" })
})

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})