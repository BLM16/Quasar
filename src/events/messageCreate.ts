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
        // Get the command itself
        const C = BOT.commands.get(cmd);

        const isDM = msg.channel.type == "DM"; // Message sent in DM?
        const guildOnly = C.guildOnly; // Command only runnable in a guild?
        const perms = C.perms; // The permissions required to run the command in a guild

        if (isDM && guildOnly) msg.reply("You can only run this command in a guild");
        else if (isDM) C.execute(msg, args, BOT);
        else {
            // Make sure the user has the required permissions to run the command
            perms.forEach(perm => {
                if (!msg.member.permissions.has(perm))
                    return void(msg.reply("You don\'t have adequate permissions to run this command."));
            });

            /// TODO: Check if user has proper ranks too

            C.execute(msg, args, BOT);
        }
    } catch (e) {
        msg.reply("We encountered an unexpected error while processing your command.");
        console.error(e);
    }
}
