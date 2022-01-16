import { CommandInteraction, EmbedField, HexColorString, Message, MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import { Bot } from "@/bot";

export default class Help implements Command {
    name = "Help";
    description = "Gets help for a specific command or for the bot in general";
    syntax = "help <command>?";
    aliases = ["?"];

    perms = PermissionsFrom("USE_APPLICATION_COMMANDS");
    guildOnly = false;

    execute(message: Message, args: string[], BOT: Bot): void {
        let cmd: Command = null; // Command the user passed or null if no command was specified

        // Load the command if the user specified one for help
        if (args.length > 0)
            cmd = BOT.commands.has(args[0].toLowerCase()) ? BOT.commands.get(args[0]) : null;

        // No command was specified, show list of all commands
        if (cmd == null) {
            message.channel.send({
                embeds: [ this.getGeneralEmbed(message.channel.type == "DM" ? 0x8c3d1e : message.guild.me.displayHexColor, BOT) ]
            });
        // Show details for specified command
        } else {
            message.channel.send({
                embeds: [ this.getCommandEmbed(cmd, message.channel.type == "DM" ? 0x8c3d1e : message.guild.me.displayHexColor) ]
            });
        }
    }

    /// TODO: Add choices so the user can only select a valid command
    SlashCommand = new SlashCommandBuilder()
        .setName(this.name.toLowerCase())
        .setDescription(this.description)
        .addStringOption(o => o.setName("command").setDescription("The command for help with").setRequired(false));

    executeSlash(interaction: CommandInteraction, BOT: Bot): void {
        let cmd = BOT.commands.get(interaction.options.getString("command")) || null;

        if (cmd == null) {
            interaction.reply({
                embeds: [ this.getGeneralEmbed(!interaction.guild ? 0x8c3d1e : interaction.guild.me.displayHexColor, BOT) ],
                ephemeral: true
            });
        } else {
            interaction.reply({
                embeds: [ this.getCommandEmbed(cmd, !interaction.guild ? 0x8c3d1e : interaction.guild.me.displayHexColor) ],
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
                { name: "Aliases", value: cmd.aliases ? cmd.aliases.map(a => `\`${a.toString().toLowerCase()}\``).join(", ") : "none", inline: false },
                { name: "Syntax", value: cmd.syntax, inline: false },
                { name: "Permissions", value: cmd.perms.map(p => `\`${p.toArray()}\``).join(", "), inline: false },
                { name: "Guild Only", value: cmd.guildOnly ? "true" : "false", inline: false }
            );
    }
}
