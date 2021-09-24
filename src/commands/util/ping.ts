import { Message, MessageEmbed } from "discord.js";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import { Bot } from "@/bot";

export default class Ping implements Command {
    name = "Ping";
    description = "Pings the server";
    syntax = "ping";
    
    perms = PermissionsFrom("USE_APPLICATION_COMMANDS");
    guildOnly = false;

    execute(message: Message, args: string[], BOT: Bot): void {
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(message.channel.type == "DM" ? 0x8c3d1e : message.guild.members.cache.get(BOT.client.user.id).displayHexColor)
                    .setTitle("Pong!")
                    .setTimestamp()
                    .addFields([
                        // Client latency from message to reply, API latency from websocket ping
                        { name: "Client Latency", value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
                        { name: "API Latency", value: `${Math.round(BOT.client.ws.ping)}ms`, inline: true }
                    ])
            ]
        });
    }
}
