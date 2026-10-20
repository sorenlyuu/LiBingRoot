import "dotenv/config"

export default class Config {

    private readonly DEV_TOKEN: string
    public readonly BOT_ID: string
    public readonly PREFIX: string

    constructor() {
        const missingProperties = []
        this.DEV_TOKEN = process.env.DEV_TOKEN ?? `${missingProperties.push("DEV_TOKEN")}`
        this.BOT_ID = process.env.BOT_ID ?? `${missingProperties.push("BOT_ID")}`
        this.PREFIX = process.env.PREFIX ?? `${missingProperties.push("PREFIX")}`

        if (missingProperties.length > 0) {
            throw new Error(`[Config] The properties ${missingProperties.join(`, `)} are missing in .env, Please add them.`)
        }
    }
}