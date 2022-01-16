import { CommandInteraction, Message, Permissions } from "discord.js";
import { Bot } from "@/bot";

/** The template for all commands to ensure required properties */
export default interface Command {
    readonly name: string;
    readonly description: string;
    readonly syntax: string;
    readonly aliases?: string[];

    readonly perms: Permissions[];
    readonly guildOnly: Boolean;
    
    /**
     * The function to call when the command is run
     * @param message The message that was sent
     * @param args The arguments passed to the command
     * @param BOT The {@link Bot} instance
     */
    execute(message: Message, args: string[], BOT: Bot): void;

    readonly SlashCommand?: object;

    /**
     * 
     * @param interaction The interaction that called the command
     * @param BOT The {@link Bot} instance
     */
    executeSlash?(interaction: CommandInteraction, BOT: Bot): void;
}
