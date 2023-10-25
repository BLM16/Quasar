import { Bot } from "@/bot";
import { SlashCommandBuilder } from "@discordjs/builders";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import { CacheType, CommandInteraction } from "discord.js";

export default class Unmute implements Command {
    name = "Unmute";
    description = "Unmutes a member with the timeout feature";

    perms = PermissionsFrom("MODERATE_MEMBERS", "USE_APPLICATION_COMMANDS");
    guildOnly = true;

    SlashCommand = new SlashCommandBuilder()
        .setName(this.name.toLowerCase())
        .setDescription(this.description)
        .addUserOption(o => o.setName("user").setDescription("The user to unmute").setRequired(true))
        .addStringOption(o => o.setName("reason").setDescription("The reason the user is getting unmuted").setRequired(false));

    executeSlash(interaction: CommandInteraction<CacheType>, BOT: Bot): void {
        const user = interaction.options.getUser("user", true);
        interaction.guild!.members.fetch(user).then(member => {
            if (!member.moderatable)
                return void (interaction.reply({ content: "I cannot unmute that user!", ephemeral: true }));

            const invoker = interaction.guild!.members.cache.get(interaction.member!.user.id);
            if (member.roles.highest.comparePositionTo(invoker!.roles.highest) >= 0)
                return void (interaction.reply({ content: "You don\'t have adequate permissions to unmute that user!", ephemeral: true }));

            const reason = interaction.options.getString("reason", false) || "No reason provided";
            member.timeout(null, reason)
                .then(m => interaction.reply(`Unmuted \`${m.user.tag}\` with reason: \`${reason}\``))
                .catch(() => interaction.reply({ content: "An unexpected error occured, please try again.", ephemeral: true }));
        });
    }
}