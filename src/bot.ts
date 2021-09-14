import Command from "@models/command";
import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { defaultPrefix, Presence } from "./config";

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

        // Loop through all the folders in the commands directory
        readdirSync(join(__dirname, "commands"), { withFileTypes: true })
            .filter(dir => dir.isDirectory())
            .map(dir => dir.name)
            .forEach(dir => {
                // Loop through all the files in each command directory
                readdirSync(join(__dirname, "commands", dir), { withFileTypes: true }).forEach(file => {
                    // Get the command
                    const F = require(join(__dirname, "commands", dir, file.name));
                    const cmd: Command = new F.default;

                    // Add the command and its aliases to the commands collection
                    this.commands.set(cmd.name.toLowerCase(), cmd);
                    if (cmd.aliases)
                        cmd.aliases.forEach((alias: string) => {
                            this.commands.set(alias.toLowerCase(), cmd);
                        });
                });
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
