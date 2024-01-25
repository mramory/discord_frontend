import { UserType } from "./User"

export type ConversationType = {
    id: number,
    name?: string,
    type: Type,
    contentType: ContentType
    users: UserType[]
}

export enum ContentType {
    TEXT = "TEXT",
    VOICE = "VOICE",
    VIDEO = "VIDEO"
}

export enum Type {
    SERVER = "SERVER",
    DIALOG = "DIALOG"
}