import { EmbedField, Message, MessageEmbed } from "discord.js";
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
            let fields: EmbedField[] = [];

            for (const C of new Set(BOT.commands.values())) {
                fields.push({
                    name: C.name,
                    value: C.description,
                    inline: false
                });
            }

            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(message.channel.type == "DM" ? 0x8c3d1e : message.guild.members.cache.get(BOT.client.user.id).displayHexColor)
                        .setTitle("Help Menu")
                        .setTimestamp()
                        .addFields(fields)
                ]
            });
        // Show details for specified command
        } else {
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(message.channel.type == "DM" ? 0x8c3d1e : message.guild.members.cache.get(BOT.client.user.id).displayHexColor)
                        .setTitle(`Help Menu for ${cmd.name}`)
                        .setDescription(cmd.description)
                        .setTimestamp()
                        .addFields(
                            { name: "Aliases", value: cmd.aliases ? cmd.aliases.map(a => `\`${a.toString().toLowerCase()}\``).join(", ") : "none", inline: false },
                            { name: "Syntax", value: cmd.syntax, inline: false },
                            { name: "Permissions", value: cmd.perms.map(p => `\`${p.toArray()}\``).join(", "), inline: false },
                            { name: "Guild Only", value: cmd.guildOnly ? "true" : "false", inline: false }
                        )
                ]
            });
        }
    }
}
