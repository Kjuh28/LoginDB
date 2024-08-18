import { sql } from './db.js'

// sql`DROP TABLE IF EXISTS users;`.then(() =>{
//     console.log('tabela apagada!')
// })


sql`
CREATE TABLE users (
    id VARCHAR(200) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    gender VARCHAR(10)
);
`.then(() => {
    console.log('Tabela criada')
})