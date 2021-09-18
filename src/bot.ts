import { Client, Collection } from "discord.js";
import Command from "@models/command";
import LoadCommands from "@util/command_loader";
import * as events from "@events/index";

export class Bot {
    /** The discordjs client object */
    client: Client;
    /** The collection of commands mapping Command.name to Command */
    commands: Collection<string, Command> = new Collection();

    constructor() {
        this.client = new Client({
            // TODO: Update intents as needed
            // https://discord.com/developers/docs/topics/gateway#list-of-intents
            intents: [
                // "DIRECT_MESSAGES",
                // "DIRECT_MESSAGE_REACTIONS",
                "GUILDS",
                // "GUILD_BANS",
                // "GUILD_EMOJIS_AND_STICKERS",
                // "GUILD_INTEGRATIONS",
                // "GUILD_INVITES",
                // "GUILD_MEMBERS",
                "GUILD_MESSAGES",
                // "GUILD_MESSAGE_REACTIONS",
                // "GUILD_VOICE_STATES",
                // "GUILD_WEBHOOKS"
            ]
        });

        // Load the commands into the bot
        this.commands = LoadCommands();
    }

    /**
     * Subscribes to all the discord events the bot uses
     */
    public eventSubscriber(): void {
        this.client.once("ready", () => events.ready(this));
        this.client.on("messageCreate", msg => events.messageCreate(msg, this));
    }

    /**
     * Logs in the bot
     */
    public login(): void {
        this.client.login(process.env.TOKEN!);
    }
}
