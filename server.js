
import { fastify } from "fastify"
import { DatabasePostgres } from "./database-postgres.js"

import cors from '@fastify/cors'

const server = fastify()

await server.register(cors, {
    hook: 'preHandler',
})
server.get('/', (req, reply) =>{
    reply.send({ hello:'World'})
})

server.addHook('preHandler', (req, resp, done) =>{

    done()
})

const database = new DatabasePostgres()

server.post('/users', async (req, reply ) => {

    const {username, email, password, gender} = req.body

    await database.create({
        username,
        email,
        password,
        gender,
    })

    return reply.status(201).send()
})

server.get('/users', async( req ) => {
    const users = await database.list()
    
    return users
})

server.put('/users/:id', async (req, reply) => {

    const userId = req.params.id
    const {username, email, password, gender} = req.body

    await database.update(userId, {
        username,
        email,
        password,
        gender,
    })

    return reply.status(204).send()
})

//authentication to login
server.post('/users/login', async(req)=>{
    const {email, password} = req.body
    const response = await database.login({email, password})
    
    return response 
})

server.listen({
    port: 3332,
})