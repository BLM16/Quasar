import { Message } from "discord.js";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import GetMember from "@util/member_helper";
import { Bot } from "@/bot";

export default class Ban implements Command {
    name = "Ban";
    description = "Bans a user from the guild";
    syntax = "ban <user | userid> <reason>?";

    perms = PermissionsFrom("BAN_MEMBERS", "USE_APPLICATION_COMMANDS");
    guildOnly = true;

    execute(message: Message, args: string[], BOT: Bot): void {
        const member = message.mentions.members.first() || GetMember(message.guild, args[0]);
        args.shift();
        const reason = args.join(' ') || "No reason provided";

        if (!member)
            return void(message.reply("That user does not exist!"));

        if (member.id == message.member.id)
            return void(message.react('😂').then(() => message.reply("You can't ban yourself silly!")));

        if (!member.bannable)
            return void(message.reply("I cannot ban that user!"));

        if (member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0)
            return void(message.reply("You don\'t have adequate permissions to ban that user!"));

        member.ban({ reason: reason })
            .then(m => message.reply(`Banned \`${m.user.tag}\` with reason: \`${reason}\``))
            .catch(() => message.reply("An unexpected error occured, please try again."));
    }
}
