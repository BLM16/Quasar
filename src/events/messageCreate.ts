import { Message } from "discord.js";
import { Bot } from "@/bot";
import { defaultPrefix } from "@/config";

/**
 * Handles the messageCreate event
 * @param msg The message that was created
 * @param BOT The instance of the bot
 */
export default function(msg: Message, BOT: Bot): void {
    if (!msg.content.startsWith(defaultPrefix)) return;
    if (msg.author.bot) return;

    // Get the command and arguments
    const args = msg.content.slice(defaultPrefix.length).split(/ +/);
    const cmd  = args.shift().toLowerCase();

    if (!BOT.commands.has(cmd)) return;

    // Run the command
    try {
        BOT.commands.get(cmd).execute(msg, args, BOT.client);
    } catch (e) {
        msg.reply("we encountered an unexpected error while processing your command.");
        console.error(e);
    }
}
