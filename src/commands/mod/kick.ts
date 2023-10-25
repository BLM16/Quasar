import { Bot } from "@/bot";
import { SlashCommandBuilder } from "@discordjs/builders";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import { CommandInteraction } from "discord.js";

export default class Kick implements Command {
    name = "Kick";
    description = "Kicks a user from the guild";

    perms = PermissionsFrom("KICK_MEMBERS", "USE_APPLICATION_COMMANDS");
    guildOnly = true;

    SlashCommand = new SlashCommandBuilder()
        .setName(this.name.toLowerCase())
        .setDescription(this.description)
        .addUserOption(o => o.setName("user").setDescription("The user to kick").setRequired(true))
        .addStringOption(o => o.setName("reason").setDescription("The reason the user is getting kicked").setRequired(false));

    executeSlash(interaction: CommandInteraction, BOT: Bot): void {
        const user = interaction.options.getUser("user", false);
        interaction.guild!.members.fetch(user!).then(member => {
            if (member.id == interaction.member!.user.id)
                return void (interaction.reply({ content: "😂 You can't kick yourself silly!", ephemeral: true }));

            if (!member.kickable)
                return void (interaction.reply({ content: "I cannot kick that user!", ephemeral: true }));

            const invoker = interaction.guild!.members.cache.get(interaction.member!.user.id);
            if (member.roles.highest.comparePositionTo(invoker!.roles.highest) >= 0)
                return void (interaction.reply({ content: "You don\'t have adequate permissions to kick that user!", ephemeral: true }));

            const reason = interaction.options.getString("reason", false) || "No reason provided";
            member.kick(reason)
                .then(m => interaction.reply(`Kicked \`${m.user.tag}\` with reason: \`${reason}\``))
                .catch(() => interaction.reply({ content: "An unexpected error occured, please try again.", ephemeral: true }));
        });
    }
}
