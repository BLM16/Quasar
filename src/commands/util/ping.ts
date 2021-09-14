import { Client, Message, MessageEmbed } from "discord.js";
import Command from "@models/command";

export default class Ping implements Command {
    name = "Ping";
    description = "Pings the server";
    syntax = "ping";
    
    execute(message: Message, args: string[], client: Client): void {
        message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(message.guild.members.cache.get(client.user.id).displayHexColor)
                .setTitle("Pong!")
                .setTimestamp()
                .addFields([
                    // Client latency from message to reply, API latency from websocket ping
                    { name: "Client Latency:", value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
                    { name: "API Latency", value: `${Math.round(client.ws.ping)}ms`, inline: true }
                ])
            ]
        });
    }
}
