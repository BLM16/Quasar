import { Message } from "discord.js";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import GetMember from "@util/member_helper";
import { Bot } from "@/bot";

export default class Kick implements Command {
    name = "Kick";
    description = "Kicks a user from the guild";
    syntax = "kick <user | userid> <reason>?";

    perms = PermissionsFrom("KICK_MEMBERS", "USE_APPLICATION_COMMANDS");
    guildOnly = true;

    execute(message: Message, args: string[], BOT: Bot): void {
        const member = message.mentions.members.first() || GetMember(message.guild, args[0]);
        args.shift();
        const reason = args.join(' ') || "No reason provided";

        if (!member)
            return void(message.reply("That user does not exist!"));

        if (member.id == message.member.id)
            return void(message.react('😂').then(() => message.reply("You can't kick yourself silly!")));

        if (!member.kickable)
            return void(message.reply("I cannot kick that user!"));

        if (member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0)
            return void(message.reply("You don\'t have adequate permissions to kick that user!"));

        member.kick(reason)
            .then(m => message.reply(`Kicked \`${m.user.tag}\` with reason: \`${reason}\``))
            .catch(() => message.reply("An unexpected error occured, please try again."));
    }
}
