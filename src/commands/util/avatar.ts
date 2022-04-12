import { Bot } from "@/bot";
import { SlashCommandBuilder } from "@discordjs/builders";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import { CommandInteraction } from "discord.js";

export default class Avatar implements Command {
    name = "Avatar";
    description = "Shows a user\'s avatar";

    perms = PermissionsFrom("ATTACH_FILES", "USE_APPLICATION_COMMANDS");
    guildOnly = false;

    SlashCommand = new SlashCommandBuilder()
        .setName(this.name.toLowerCase())
        .setDescription(this.description)
        .addUserOption(o => o.setName("user").setDescription("The user to get the avatar of").setRequired(false));

    executeSlash(interaction: CommandInteraction, BOT: Bot): void {
        let user = interaction.options.getUser("user") || interaction.user;

        interaction.reply(
            user.displayAvatarURL({
                dynamic: true,
                size: 1024
            })
        );
    }
}
