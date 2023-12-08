import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/tenis', (request, reply) => {
// Acessando dados do corpo da requisição
    const {Marca, Cor, nsapato} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        Marca: Marca,
        Cor: Cor,
        nsapato: nsapato,
    })

    return reply.status(201).send
})

server.get('/tenis', (request) => {
    const search = request.query.search
    console.log(search)
    const Tenis = database.list(search)
    console.log(Tenis)
    return Tenis
})

server.put('/Tenis/:id', (request, reply) => {
    const tenisId = request.params.id
    const {Marca, Cor, nsapato} = request.body
    const tenis = database.update(tenisId, {
        Marca: Marca,
        Cor: Cor,
        nsapato: nsapato,
    })
    return reply.status(204).send()
})

server.delete('/Tenis/:id', (request, reply) => {
    const tenisId = request.params.id

    database.delete(tenisId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})