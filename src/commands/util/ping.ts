import { Bot } from "@/bot";
import { SlashCommandBuilder } from "@discordjs/builders";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import { CommandInteraction, HexColorString, MessageEmbed } from "discord.js";

export default class Ping implements Command {
    name = "Ping";
    description = "Pings the server";

    perms = PermissionsFrom("USE_APPLICATION_COMMANDS");
    guildOnly = false;

    SlashCommand = new SlashCommandBuilder()
        .setName(this.name.toLowerCase())
        .setDescription(this.description);

    executeSlash(interaction: CommandInteraction, BOT: Bot): void {
        interaction.reply({
            embeds: [this.getEmbed(!interaction.guild ? 0x8c3d1e : interaction.guild.me!.displayHexColor, interaction.createdTimestamp, BOT)],
            ephemeral: true
        });
    }

    getEmbed = (color: number | HexColorString, timestamp: number, BOT: Bot) => {
        return new MessageEmbed()
            .setColor(color)
            .setTitle("Pong!")
            .setTimestamp()
            .addFields([
                // Client latency from message to reply, API latency from websocket ping
                { name: "Client Latency", value: `${Date.now() - timestamp}ms`, inline: true },
                { name: "API Latency", value: `${Math.round(BOT.client.ws.ping)}ms`, inline: true }
            ]);
    }
}
