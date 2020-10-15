import { Client } from "discord.js";

class BotDiaHalloween {
    client: Client
    private _token!: string

    constructor() {
        this.client = new Client()
    }

    set token(value: string) {
        this._token = value
    }

    start(): void {
        this.client.on('ready', () => {
            console.log('Bot iniciado')
        })

        this.client.login(this._token)
    }
}

const botDiaHalloween = new BotDiaHalloween()

export default botDiaHalloween
