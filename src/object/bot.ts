import { ChannelGuid, RootBotStartState } from "@rootsdk/server-bot";
import ChannelMessageHandler from "../events/channelMessage";
import CommandHandler from "../command";
import ChannelMessageCreateReq from "../request/channelMessageCreate";
import Message from "./root/message";
import { Server } from "../server"

export default class Bot {

    public static async start(state: RootBotStartState): Promise<void> {
        console.log(`[Bot] Starting...`)
        ChannelMessageHandler.init()
        CommandHandler.init()
        new Server().bind()
        return
    }

    public static async sendMessage(content: string, channelId: ChannelGuid) {
        const message = new Message(content)
        await message.send(channelId)
        console.log(`[MSG] Sent message to ${channelId}: ${content}`)
    }

}