import { ExcludeEnum, PresenceStatusData } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";

/** The default prefix for the bot */
export const defaultPrefix = ".";

/** The presence activity of the bot */
export class Presence {
    static status: PresenceStatusData = "online";
    static type: ExcludeEnum<typeof ActivityTypes, "CUSTOM"> = "WATCHING";
    static activity: string = "The Universe";
}
