import express from "express"
import { config } from "dotenv"
import mongoose from "mongoose"
import { Contato } from "./models/contato.js"
import { contatoValidation } from "./utils/validations.js"
import { contatosRouter } from "./routes/contatos.js"
import { usuariosRouter } from "./routes/usuarios.js"

config()

const app = express()
app.use(express.json())
app.use(contatosRouter)
app.use(usuariosRouter)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Mongo DB Conectado')
  })
  .catch((err) => {
    console.log('Não foi possivel conectar ao mongo db', err)
  })

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})