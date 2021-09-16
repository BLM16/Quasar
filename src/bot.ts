import Command from "@models/command";
import { Client, Collection } from "discord.js";
import { defaultPrefix, Presence } from "./config";
import LoadCommands from "@util/command_loader";

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
        // When the client logs in
        this.client.once("ready", () => {
            // Set the bot's presence
            this.client.user.setPresence({
                status: Presence.status,
                activities: [{
                    name: Presence.activity,
                    type: Presence.type
                }],
            });

            console.log(`${this.client.user.username} is online.`);
            console.log(`Loaded ${this.commands.map(cmd => cmd).length} commands and aliases.`)
        });

        this.client.on("messageCreate", msg => {
            if (!msg.content.startsWith(defaultPrefix)) return;
            if (msg.author.bot) return;

            // Get the command and arguments
            const args = msg.content.slice(defaultPrefix.length).split(/ +/);
            const cmd  = args.shift().toLowerCase();

            if (!this.commands.has(cmd)) return;

            // Run the command
            try {
                this.commands.get(cmd).execute(msg, args, this.client);
            } catch (e) {
                msg.reply("we encountered an unexpected error while processing your command.");
                console.error(e);
            }
        });
    }

    /**
     * Logs in the bot
     */
    public login(): void {
        this.client.login(process.env.TOKEN!);
    }
}
