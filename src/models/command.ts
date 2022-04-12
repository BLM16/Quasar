import { Bot } from "@/bot";
import { CommandInteraction, Permissions } from "discord.js";

/** The template for all commands to ensure required properties */
export default interface Command {
    /**
     * The name of the command
     */
    readonly name: string;
    /**
     * The description of the command
     */
    readonly description: string;

    /**
     * The list of required permissions to run the command
     */
    readonly perms: Permissions[];
    /**
     * Is the command only runnable in a guild
     */
    readonly guildOnly: Boolean;

    /**
     * The slash command to register with the Discord Bot API
     */
    readonly SlashCommand: object;

    /**
     * The function that gets called when a command is run as an interaction
     * @param interaction The interaction that called the command
     * @param BOT The {@link Bot} instance
     */
    executeSlash(interaction: CommandInteraction, BOT: Bot): void;
}
