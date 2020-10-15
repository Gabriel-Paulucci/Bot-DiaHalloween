import { createConnection } from "typeorm";
import botDiaHalloween from "./core";
import config from "./configs/bot.json"
import { User } from "./database/models/user";

createConnection().then(connection => {
    connection.getRepository(User).save({
        discordId: 203713369927057408
    })
    console.log('Database iniciada')
    botDiaHalloween.token = config.token
    botDiaHalloween.start()
})
