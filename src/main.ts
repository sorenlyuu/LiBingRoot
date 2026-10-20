import { rootServer, RootBotStartState } from "@rootsdk/server-bot"
import Bot from "./object/bot"

(async () => {
	await rootServer.lifecycle.start(Bot.start)
})()
