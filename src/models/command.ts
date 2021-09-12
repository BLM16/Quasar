import { Client, Message } from "discord.js";

/** The template for all commands to ensure required properties */
export default abstract class Command {
    public abstract readonly name: string;
    public abstract readonly description: string;
    public abstract readonly syntax: string;
    public readonly aliases?: string[];
    
    public abstract execute(message: Message, args: string[], client: Client): void;
}
