import express from "express"
import http from "http"
import cors from "cors"
import {ChannelMessageCreatedEvent, ChannelMessageEvent, MessageType, rootServer} from "@rootsdk/server-bot"
import Message from "../object/root/message"
import ChannelMessageHandler from "../events/channelMessage"
import axios from "axios"
import Channel from "../object/root/channel"

export class Server {
	public readonly app
	public readonly webServer

	constructor() {
		this.app = express()
		this.app.use(express.json({limit: "500mb"}))
		this.app.use(cors({origin: "*"}))
		this.webServer = http.createServer(this.app)
		this.webServer.listen(8088, "127.0.0.1", () => {
			console.log(`[SERVER] Started!`)
		})

		this.app.post("/msg", async (req, res) => {
			try {
				const data: {channelName: string; message: string} = req.body
				const groups = await rootServer.community.channelGroups.list()

				for (const group of groups) {
					const channels = await rootServer.community.channels.list({channelGroupId: group.id})
					const channel = channels.find((s) => s.name === data.channelName)

					if (channel) {
						await new Message(data.message).send(channel.id)
						return res.status(200).json({success: true})
					}
				}

				return res.status(404).send()
			} catch (error) {
				console.error("[SERVER] Failed to send message:", error)
				return res.status(500).send()
			}
		})
	}

	public bind() {
		ChannelMessageHandler.bind(async (evt: ChannelMessageCreatedEvent) => {
            if (evt.messageType === MessageType.System) return
			let msg = evt.messageContent
			axios
				.post("http://127.0.0.1:8081/msg", {
					channelName: (await Channel.fetch(evt.channelId))!.name,
					message: msg,
				})
				.catch((error) => {
					console.log(error)
				})
		}, ChannelMessageEvent.ChannelMessageCreated)
	}
}
