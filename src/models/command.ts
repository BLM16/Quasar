import { Client, Message } from "discord.js";

/** The template for all commands to ensure required properties */
export default interface Command {
    readonly name: string;
    readonly description: string;
    readonly syntax: string;
    readonly aliases?: string[];
    
    execute(message: Message, args: string[], client: Client): void;
}
