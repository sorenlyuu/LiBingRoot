import { ChannelMessageCreatedEvent } from "@rootsdk/server-bot"
import Message from "../../object/root/message"
import { CommandData } from "../../types/command"

export default class TestCommand {
	public static readonly command: string = "Test Command"
	public static readonly enabled: boolean = true
	public static readonly development: boolean = true
	public static readonly triggers: string[] = ["test"]

	public static async run(evt: ChannelMessageCreatedEvent, args: string[]) {
        new Message(`Hi! ${args.join(" - ")}`).send(evt.channelId)

    }
}
