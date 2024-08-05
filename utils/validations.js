import Joi from "joi";

// validação para inserção/atualização de contato
export const contatoValidation = Joi.object({ 
  nome: Joi.string().max(150).required(),
  sobrenome: Joi.string().max(150),
  email: Joi.string().email(),
  telefone: Joi.string().required(),
  observacoes: Joi.string().max(200),
  favorito: Joi.boolean()

})