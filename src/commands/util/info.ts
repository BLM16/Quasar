import { Bot } from "@/bot";
import { SlashCommandBuilder } from "@discordjs/builders";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import { CommandInteraction, HexColorString, MessageEmbed } from "discord.js";

export default class Info implements Command {
    name = "Info";
    description = "Sends info about the bot";

    perms = PermissionsFrom("USE_APPLICATION_COMMANDS");
    guildOnly = false;

    SlashCommand = new SlashCommandBuilder()
        .setName(this.name.toLowerCase())
        .setDescription(this.description);

    executeSlash(interaction: CommandInteraction, BOT: Bot): void {
        interaction.reply({
            embeds: [this.getEmbed(!interaction.guild ? 0x8c3d1e : interaction.guild.me.displayHexColor)]
        });
    }

    getEmbed = (color: number | HexColorString) => {
        return new MessageEmbed()
            .setColor(color)
            .setTimestamp()
            .addFields(
                { name: "Invite Quasar to a Server", value: `[Invite Link](https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID!}&permissions=8&scope=bot%20applications.commands)`, inline: false },
                { name: "Git Repository URL", value: `https://github.com/BLM16/Quasar`, inline: false },
                { name: "Report Issues/Bugs", value: `https://github.com/BLM16/Quasar/issues`, inline: false }
            );
    }
}
