import { Bot } from "@/bot";
import { SlashCommandBuilder } from "@discordjs/builders";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import { ParseDurationAsMS, ToUNIXTimestamp } from "@util/time_helper";
import { CommandInteraction } from "discord.js";

export default class Mute implements Command {
    name = "Mute";
    description = "Mutes a member with the timeout feature";

    perms = PermissionsFrom("MODERATE_MEMBERS", "USE_APPLICATION_COMMANDS");
    guildOnly = true;

    SlashCommand = new SlashCommandBuilder()
        .setName(this.name.toLowerCase())
        .setDescription(this.description)
        .addUserOption(o => o.setName("user").setDescription("The user to mute").setRequired(true))
        .addStringOption(o => o.setName("time").setDescription("The time to mute the user for (10s | 5m | 3h | 2d | 1w)").setRequired(true))
        .addStringOption(o => o.setName("reason").setDescription("The reason the user is getting muted").setRequired(false));

    executeSlash(interaction: CommandInteraction, BOT: Bot): void {
        const user = interaction.options.getUser("user", true);
        interaction.guild!.members.fetch(user).then(member => {
            if (member.id == interaction.member!.user.id)
                return void (interaction.reply({ content: "😂 You can't mute yourself silly!", ephemeral: true }));

            if (!member.moderatable)
                return void (interaction.reply({ content: "I cannot mute that user!", ephemeral: true }));

            const invoker = interaction.guild!.members.cache.get(interaction.member!.user.id);
            if (member.roles.highest.comparePositionTo(invoker!.roles.highest) >= 0)
                return void (interaction.reply({ content: "You don\'t have adequate permissions to mute that user!", ephemeral: true }));

            try {
                const duration = ParseDurationAsMS(interaction.options.getString("time", true));
                const reason = interaction.options.getString("reason", false) || "No reason provided";
                member.timeout(duration, reason)
                    .then(m => interaction.reply(`Muted \`${m.user.tag}\` until <t:${ToUNIXTimestamp(Date.now() + duration)}:f> with reason: \`${reason}\``))
                    .catch(() => interaction.reply({ content: "An unexpected error occured, please try again.", ephemeral: true }));
            } catch {
                return void (interaction.reply({ content: "Could not parse your time. Please specify a number followed by s, m, h, d, or w.", ephemeral: true }));
            }
        });
    }
}
