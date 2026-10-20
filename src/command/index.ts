import {ChannelMessageCreatedEvent, ChannelMessageEvent, MessageType} from "@rootsdk/server-bot"
import ChannelMessageHandler from "../events/channelMessage"
import Config from "../object/config"
import Bot from "../object/bot"
import {readdirSync} from "fs"
import * as path from "path"

export default class CommandHandler {
	private static prefix: string = "-"
	private static commands: any[] = []

	public static async listener(evt: ChannelMessageCreatedEvent) {
		if (evt.messageType === MessageType.System) return
		const message = evt.messageContent
		const parts = message.split(" ")
		if (parts.length < 1) return
		
		if (parts[0].startsWith(this.prefix)) {
			const command = parts[0].replace(this.prefix, "")
			console.log(`[CMD] ${evt.userId} executed ${command}`)
			const data = this.commands.find((s) => s.triggers.includes(command))
			if (!data) {
				return console.log(`[CMD] No command data for ${command}`)
			}
			if (!data.enabled) {
				return await Bot.sendMessage(`This command is disabled.`, evt.channelId)
			}
			const args = parts.slice(0)
			console.log(`[CMD] Executing ${data.command} with args ${args.join(" ")}`)
			try {
				data.run(evt, args)
				console.log(`[CMD] Successfully executed ${data.command}`)
			} catch (err) {
				console.log(`[CMD] ${data.command} failed: ${err}`)
			}
		}
	}

	public static async init() {
		ChannelMessageHandler.bind(this.listener.bind(this), ChannelMessageEvent.ChannelMessageCreated)
		const config = new Config()
		this.prefix = config.PREFIX
		const commandDir = path.join(__dirname, "commands")
		const commands = readdirSync(commandDir).filter((s) => s.endsWith(".js"))
		for (const s of commands) {
			const mod = await import(path.join(commandDir, s))
			const command = mod.default
			if (!command) continue
			this.commands.push(command)
			console.log(`[CMD] Loaded ${command.command}`)
		}
	}
}
