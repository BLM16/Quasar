import { CommandInteraction, Message } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders"
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
            return void(message.reply("That user doesn't exist!"));

        message.guild.bans.fetch(member)
            .then(() =>
                message.guild.members.unban(member, reason)
                    .then(u => message.reply(`Unbanned \`${u.tag}\` with reason: \`${reason}\``))
                    .catch(() => message.reply("An unexpected error occured, please try again.")))
            .catch(() => message.reply("That user is not banned!"));
    }

    SlashCommand = new SlashCommandBuilder()
        .setName(this.name.toLowerCase())
        .setDescription(this.description)
        .addUserOption(o => o.setName("user").setDescription("The user to unban").setRequired(true))
        .addStringOption(o => o.setName("reason").setDescription("The reason the user is getting unbanned").setRequired(false));

    executeSlash(interaction: CommandInteraction, BOT: Bot): void {
        const user = interaction.options.getUser("user", true);
        interaction.guild.members.fetch(user).then(member => {
            
            if (!member)
                return void(interaction.reply({ content: "That user doesn't exist!", ephemeral: true }));

            const reason = interaction.options.getString("reason", false) || "No reason provided";
            interaction.guild.bans.fetch(member)
                .then(ban => interaction.guild.members.unban(member, reason)
                    .then(u => interaction.reply(`Unbanned \`${u.tag}\` with reason: \`${reason}\``))
                    .catch(() => interaction.reply({ content: "An unexpected error occured, please try again.", ephemeral: true })))
                .catch(() => interaction.reply({ content: "That user is not banned!", ephemeral: true }));
        });
    }
}
