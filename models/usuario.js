import { model, Schema } from "mongoose"

export const Usuario = model('usuario', new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    reqired: true
  }
}))