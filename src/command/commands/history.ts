import {ChannelMessageCreatedEvent} from "@rootsdk/server-bot"
import Message from "../../object/root/message"
import {CommandData} from "../../types/command"
import axios from "axios"
import Channel from "../../object/root/channel"

export default class HistoryCommand {
	public static readonly command: string = "History Command"
	public static readonly enabled: boolean = true
	public static readonly development: boolean = true
	public static readonly triggers: string[] = ["history", "h"]

	public static async run(evt: ChannelMessageCreatedEvent, args: string[]) {
		new Message(`Fetching...`).send(evt.channelId)
		const channel = await Channel.fetch(evt.channelId)
        if (!channel) return
		const rsp = await axios.get(`http://127.0.0.1:8081/channel/${encodeURIComponent(channel.name)}`)
		rsp.data.forEach((s: any) => {
			let msg = `**${s.author.username} (${s.author.displayName})**\n${s.content}`
			s.attachments.forEach((r: any) => {
				msg += `\n${r.url}`
			})
            new Message(msg).send(evt.channelId)
		})
	}

}
