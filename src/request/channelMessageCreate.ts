import { ChannelGuid, ChannelMessageCreateRequest, rootServer } from "@rootsdk/server-bot"

export default class ChannelMessageCreateReq {

    private readonly message: string
    private readonly channelId: ChannelGuid

    constructor(message: string, channelId: ChannelGuid) {
        this.message = message
        this.channelId = channelId
    }

    public async send(): Promise<ChannelMessageCreateRequest> {
        const req: ChannelMessageCreateRequest = {
            channelId: this.channelId,
            content: this.message
        }
        await rootServer.community.channelMessages.create(req)
        return req
    }

}