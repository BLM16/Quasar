import { CommandInteraction, Message } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
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

    SlashCommand = new SlashCommandBuilder()
        .setName(this.name.toLowerCase())
        .setDescription(this.description)
        .addUserOption(o => o.setName("user").setDescription("The user to ban").setRequired(true))
        .addStringOption(o => o.setName("reason").setDescription("The reason the user is getting banned").setRequired(false));

    executeSlash(interaction: CommandInteraction, BOT: Bot): void {
        const user = interaction.options.getUser("user", true);
        interaction.guild.members.fetch(user).then(member => {
            if (member.id == interaction.member.user.id)
                return void(interaction.reply({ content: "😂 You can't ban yourself silly!", ephemeral: true }));
            
            if (!member.bannable)
                return void(interaction.reply({ content: "I cannot ban that user!", ephemeral: true }));

            const invoker = interaction.guild.members.cache.get(interaction.member.user.id);
            if (member.roles.highest.comparePositionTo(invoker.roles.highest) >= 0)
                return void(interaction.reply({ content: "You don\'t have adequate permissions to ban that user!", ephemeral: true }));

            const reason = interaction.options.getString("reason", false) || "No reason provided";
            member.ban({ reason: reason })
                .then(m => interaction.reply(`Banned \`${m.user.tag}\` with reason: \`${reason}\``))
                .catch(() => interaction.reply({ content: "An unexpected error occured, please try again.", ephemeral: true }));
        });
    }
}
