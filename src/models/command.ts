import { Client, Message, Permissions } from "discord.js";

/** The template for all commands to ensure required properties */
export default interface Command {
    readonly name: string;
    readonly description: string;
    readonly syntax: string;
    readonly aliases?: string[];

    readonly perms: Permissions[];
    readonly guildOnly: Boolean;
    
    execute(message: Message, args: string[], client: Client): void;
}
