import { Bot } from "@/bot";
import { SlashCommandBuilder } from "@discordjs/builders";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import { CommandInteraction } from "discord.js";

export default class Unban implements Command {
    name = "Unban";
    description = "Unbans a user from the guild";

    perms = PermissionsFrom("BAN_MEMBERS", "USE_APPLICATION_COMMANDS");
    guildOnly = true;

    SlashCommand = new SlashCommandBuilder()
        .setName(this.name.toLowerCase())
        .setDescription(this.description)
        .addUserOption(o => o.setName("user").setDescription("The user to unban").setRequired(true))
        .addStringOption(o => o.setName("reason").setDescription("The reason the user is getting unbanned").setRequired(false));

    executeSlash(interaction: CommandInteraction, BOT: Bot): void {
        const user = interaction.options.getUser("user", true);
        interaction.guild!.members.fetch(user).then(member => {

            if (!member)
                return void (interaction.reply({ content: "That user doesn't exist!", ephemeral: true }));

            const reason = interaction.options.getString("reason", false) || "No reason provided";
            interaction.guild!.bans.fetch(member)
                .then(ban => interaction.guild!.members.unban(member, reason)
                    .then(u => interaction.reply(`Unbanned \`${u!.tag}\` with reason: \`${reason}\``))
                    .catch(() => interaction.reply({ content: "An unexpected error occured, please try again.", ephemeral: true })))
                .catch(() => interaction.reply({ content: "That user is not banned!", ephemeral: true }));
        });
    }
}
