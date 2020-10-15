import { createConnection } from "typeorm";

createConnection().then(connection => {
    console.log('Database criada')
})
