import { Bot } from "@/bot";
import { SlashCommandBuilder } from "@discordjs/builders";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import { CommandInteraction, EmbedField, HexColorString, MessageEmbed } from "discord.js";

export default class Help implements Command {
    name = "Help";
    description = "Gets help for a specific command or for the bot in general";

    perms = PermissionsFrom("USE_APPLICATION_COMMANDS");
    guildOnly = false;

    /// TODO: Add choices so the user can only select a valid command
    SlashCommand = new SlashCommandBuilder()
        .setName(this.name.toLowerCase())
        .setDescription(this.description)
        .addStringOption(o => o.setName("command").setDescription("The command for help with").setRequired(false));

    executeSlash(interaction: CommandInteraction, BOT: Bot): void {
        let cmd = BOT.commands.get(interaction.options.getString("command")!) || null;

        if (cmd == null) {
            interaction.reply({
                embeds: [this.getGeneralEmbed(!interaction.guild ? 0x8c3d1e : interaction.guild.me!.displayHexColor, BOT)],
                ephemeral: true
            });
        } else {
            interaction.reply({
                embeds: [this.getCommandEmbed(cmd, !interaction.guild ? 0x8c3d1e : interaction.guild.me!.displayHexColor)],
                ephemeral: true
            });
        }
    }

    getGeneralEmbed = (color: number | HexColorString, BOT: Bot) => {
        let fields: EmbedField[] = [];

        for (const C of new Set(BOT.commands.values())) {
            fields.push({
                name: C.name,
                value: C.description,
                inline: false
            });
        }

        return new MessageEmbed()
            .setColor(color)
            .setTitle("Help Menu")
            .setTimestamp()
            .addFields(fields);
    }

    getCommandEmbed = (cmd: Command, color: number | HexColorString) => {
        return new MessageEmbed()
            .setColor(color)
            .setTitle(`Help Menu for ${cmd.name}`)
            .setDescription(cmd.description)
            .setTimestamp()
            .addFields(
                { name: "Permissions", value: cmd.perms.map(p => `\`${p.toArray()}\``).join(", "), inline: false },
                { name: "Guild Only", value: cmd.guildOnly ? "true" : "false", inline: false }
            );
    }
}
