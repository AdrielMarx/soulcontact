import { Router } from "express";
import { usuarioValidation } from "../utils/validations.js";
import { Usuario } from "../models/usuario.js";

export const usuariosRouter = Router()

usuariosRouter.post('/usuarios', async (req, res) => {
  const { error, value } = usuarioValidation.validate(req.body, { abortEarly: false })
  if (error) {
    res.status(400).json({ message: 'Dados inválidos', error: error.details })
    return
  }

  const { nome, email, senha } = value
  
  try {
    const novoUsuario = new Usuario({ nome, email, senha})
    await novoUsuario.save()
    res.json({ message: 'Usuário adicionado' })
  }
  catch (err) {
    res.status(500).json({ message: 'Erro inesperado ao tentar inserir usuário', err })
  }
})