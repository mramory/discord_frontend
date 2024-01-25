
export type CreateChannelDto = {
    serverId: string,
    name: string
    type: ChannelType
}

type ChannelType = "TEXT" | "VIDEO"