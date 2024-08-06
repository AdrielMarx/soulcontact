import { Router } from "express";

export const contatosRouter = Router()

// inserção de contato [post]
contatosRouter.post('/contatos', async (req, res) => {
  // error -> objeto com os detalhes dos erros de validação
  // value -> são os dados do req.body
  const { error, value } = contatoValidation.validate(req.body, {abortEarly: false}) // abortEarsy -> não vai abortar no primeiro erro, caso haja mais de um, vai retornar todos

  if (error) {
    // http 400 - Bad Request - indica que a requisição tem dados inválidos
    res.status(400).json({ message: 'Dados inválidos', error: error.details} )
    return
  }

  // Extrair as informações dos dados que foram validados anteriormente
  const { nome, sobrenome, email, telefone, observacoes, favorito } = value

  try {
    const novoContato = new Contato({ nome, sobrenome, email, telefone, observacoes, favorito })
    await novoContato.save()
    res.json({ message: 'Contato adicionado com sucesso' })
  }
  catch(err) {
    res.status(500).json({ message: 'Erro inesperado ao tentar adicionar contato.', error: err })
  }
})
// listagem de contatos [get]
contatosRouter.get('/contatos', async (req, res) => {
  const lista = await Contato.find()
  res.json(lista)
})

contatosRouter.get('/contatos/:id', async (req, res) => {
  const contato = await Contato.findById(req.params.id).select('-__v -favorito')
  if (contato) {
    res.json(contato)
  }
  else {
    res.status(404).json({ message: 'Contato não encontrado' })
  }
})

// atualização de contato [put]
contatosRouter.put('/contatos/:id', async (req, res) => {
  const { error, value } = contatoValidation.validate(req.body, { abortEarly: false })
  if(error) {
    res.status(400).json({ message: 'Dados inválidos', error: error.details })
  }

  const { nome, sobrenome, email, telefone, observacoes, favorito } = value

  try {
    const contato = await Contato.findByIdAndUpdate(req.params.id, { nome, sobrenome, email, telefone, observacoes, favorito })
    if (contato) {
      res.json({ message: 'Contato atualizado com sucesso' })
    }
    else {
      res.status(404).json({ message: 'Contato não encontrado' })
    }
  }

  catch(err) {
    res.status(500).json({ message: 'Erro inesperado ao atualizar contato' })
  }
})
// remoção de contato [delete]
contatosRouter.delete('/contatos/:id', async (req, res) => {
  try {
    const contato =await Contato.findByIdAndDelete(req.params.id)
    if (contato) {
      res.json({ message: 'Contato removido com sucesso' })
    }
    else {
      res.status(404).json({ message: 'Contato não encontrado' })
    }
  }
  catch(err) {
    res.status(500).json({ message: 'um erro ocorreu', error: err})
  }
})