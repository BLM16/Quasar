import { Client } from "discord.js";
import { Presence } from "./config";

export class Bot {
    /** The discordjs client object */
    client: Client;

    constructor() {
        this.client = new Client({
            // TODO: Update intents as needed
            // https://discord.com/developers/docs/topics/gateway#list-of-intents
            intents: [
                // "DIRECT_MESSAGES",
                // "DIRECT_MESSAGE_REACTIONS",
                // "GUILDS",
                // "GUILD_BANS",
                // "GUILD_EMOJIS_AND_STICKERS",
                // "GUILD_INTEGRATIONS",
                // "GUILD_INVITES",
                // "GUILD_MEMBERS",
                // "GUILD_MESSAGES",
                // "GUILD_MESSAGE_REACTIONS",
                // "GUILD_VOICE_STATES",
                // "GUILD_WEBHOOKS"
            ]
        });
    }

    /**
     * Subscribes to all the discord events the bot uses
     */
    public eventSubscriber(): void {
        this.client.once('ready', () => {
            // Set the bot's presence
            this.client.user.setPresence({
                status: Presence.status,
                activities: [{
                    name: Presence.activity,
                    type: Presence.type
                }],
            });

            console.log(`${this.client.user.username} is online.`);
        });
    }

    /**
     * Logs in the bot
     */
    public login(): void {
        this.client.login(process.env.TOKEN!);
    }
}
