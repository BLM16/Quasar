import { ActivityType, PresenceStatusData } from "discord.js";

/** The default prefix for the bot */
export const defaultPrefix = ".";

/** The presence activity of the bot */
export class Presence {
    static status: PresenceStatusData = "online";
    static type: ActivityType = "WATCHING";
    static activity: string = "The Universe";
}
