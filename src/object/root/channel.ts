import {ChannelGroupGuid, ChannelGuid, ChannelPermission, CommunityAppGuid, RoleOrMemberGuid, rootServer} from "@rootsdk/server-bot"

export default class Channel {

	public channelGroupId: ChannelGroupGuid
	public id: ChannelGuid
	public name: string
	public description?: string
	public iconAssetUri?: string
	public channelType: number
	public communityAppId?: CommunityAppGuid
	public channelPermission: ChannelPermission
	public useChannelGroupPermission: boolean
	public roleOrMemberIds: RoleOrMemberGuid[]

	private constructor(data: any) {
		this.id = data.id
		this.channelGroupId = data.channelGroupId
		this.name = data.name
		this.description = data.description
		this.iconAssetUri = data.iconAssetUri
		this.channelType = data.channelType
		this.communityAppId = data.communityAppId
		this.channelPermission = data.channelPermission
		this.useChannelGroupPermission = data.useChannelGroupPermission
		this.roleOrMemberIds = data.roleOrMemberIds
	}

	public static async fetch(id: ChannelGuid): Promise<Channel | undefined> {
		const groups = await rootServer.community.channelGroups.list()

		for (const group of groups) {
			const channels = await rootServer.community.channels.list({channelGroupId: group.id})
			const channel = channels.find(s => s.id === id)

			if (channel) return new Channel(channel)
		}

		return undefined
	}
}