import { REST } from "@discordjs/rest";
import * as events from "@events/index";
import Command from "@models/command";
import LoadCommands from "@util/command_loader";
import { Routes } from "discord-api-types/v9";
import { Client, Collection } from "discord.js";

export class Bot {
    /** The discordjs client object */
    client: Client;
    /** The collection of commands mapping Command.name to Command */
    commands: Collection<string, Command> = new Collection();
    /** The REST API to communicate with */
    rest = new REST({ version: "9" }).setToken(process.env.TOKEN!);

    constructor() {
        this.client = new Client({
            // TODO: Update intents as needed
            // https://discord.com/developers/docs/topics/gateway#list-of-intents
            intents: [
                "DIRECT_MESSAGES",
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
            ],
            // TODO: Update partials as needed
            // https://discordjs.guide/popular-topics/partials.html
            partials: [
                "CHANNEL"
            ]
        });

        // Load the commands into the bot
        LoadCommands().then(cmds => {
            this.commands = cmds;
            this.registerSlashCommands(cmds.map(c => c.SlashCommand));
        });
    }

    /**
     * Subscribes to all the discord events the bot uses
     */
    public eventSubscriber(): void {
        this.client.once("ready", () => events.ready(this));
        this.client.on("interactionCreate", interaction => events.interactionCreate(interaction, this));
    }

    /**
     * Registers the bot's slash commands with the Discord API
     */
    public async registerSlashCommands(cmds: object[]) {
        /// TODO: Check if production and change to applicationCommands. Change back to applicationGuildCommands for testing.
        /// TODO: Look into slash command permissions: https://discordjs.guide/interactions/slash-command-permissions.html#user-permissions
        await this.rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), { body: cmds })
            .then(() => console.log(`Loaded ${cmds.length} slash commands.`))
            .catch(e => console.error(e));
    }

    /**
     * Logs in the bot
     */
    public login(): void {
        this.client.login(process.env.TOKEN!);
    }
}
