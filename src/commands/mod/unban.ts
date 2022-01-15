import { Message } from "discord.js";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import GetMember from "@util/member_helper";
import { Bot } from "@/bot";

export default class Unban implements Command {
    name = "Unban";
    description = "Unbans a user from the guild";
    syntax = "unban <user | userid> <reason>?";
    aliases? = ["uban"];

    perms = PermissionsFrom("BAN_MEMBERS", "USE_APPLICATION_COMMANDS");
    guildOnly = true;

    execute(message: Message, args: string[], BOT: Bot): void {
        const member = GetMember(message.guild, args[0]);
        args.shift();
        const reason = args.join(' ') || "No reason provided";

        if (!member)
            return void(message.reply("That user does not exist!"));

        message.guild.bans.fetch(member)
            .then(() =>
                message.guild.members.unban(member, reason)
                    .then(u => message.reply(`Unbanned \`${u.tag}\` with reason: \`${reason}\``))
                    .catch(() => message.reply("An unexpected error occured, please try again.")))
            .catch(() => message.reply("That user is not banned!"));
    }
}
