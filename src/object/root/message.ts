import { ChannelGuid } from "@rootsdk/server-bot"
import ChannelMessageCreateReq from "../../request/channelMessageCreate"

export default class Message {
    private readonly message: string

    constructor(msg: string) {
        this.message = msg
    }

    public async send(channelId: ChannelGuid) {
        const req = new ChannelMessageCreateReq(this.message, channelId).send()
    }
}