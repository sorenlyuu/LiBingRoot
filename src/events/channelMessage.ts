
import { ChannelMessageEvent, rootServer } from "@rootsdk/server-bot";

type ChannelMessageListener = (...args: any[]) => void | Promise<void>;

export default class ChannelMessageHandler {

    public static channelMessageCreateListen: ChannelMessageListener[] = []

    public static async init() {
        rootServer.community.channelMessages.on(ChannelMessageEvent.ChannelMessageCreated, (...args) => this.handle(...args))
        console.log(`[Event] Initialized channelMessageHandler`)
    }

    public static async handle(...args: any[]) {
        for (const func of this.channelMessageCreateListen) {
            try {
                console.log(`[Event] incoming channelMessageCreated`)
                await func(...args)
            } catch (err) {
                console.log(`[Event] channelMessageHandler.channelMessageCreated failed:\n${err}`)
            }
        }
    }

    public static bind(func: ChannelMessageListener, event: ChannelMessageEvent) {
        console.log(`[Event] ${func.name} bound to ${event}`)
        switch (event) {
            case ChannelMessageEvent.ChannelMessageCreated:
                this.channelMessageCreateListen.push(func)
                break
            default:
                console.log(`[Event] There is no listener for ${event}`)
        }
    }

}
