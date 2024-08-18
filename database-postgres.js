import { randomUUID } from "crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
    
    async list(){
        const users = await sql`SELECT * FROM users `

        return users
    }

    async create(user){
        const userId = randomUUID()
        const { username, email, password, gender } = user

        await sql`insert into users (id, username, email, password, gender) VALUES (${userId}, ${username},${email},${password},${gender})`
    }

    async update(id, user){
        const { username, email, password, gender } = user

        await sql`update users set username=${username}, email=${email}, password=${password}, gender=${gender} WHERE id = ${id}`
    }

    async delete(id){
        await sql`delete from users where id = ${id}`
    }

    async login(params){
        const { email, password } = params
        const resp = await sql`select * from users where email = ${email}`
        console.log(email, password)
        console.log(resp)

        if (!resp[0].email ) throw new Error('Email não reconhecido')
        if(resp[0].password === password){
            return resp[0]
        }
        throw new Error('Senha incorreta')
        
    }
}