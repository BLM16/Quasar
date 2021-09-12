import { Client, Message } from "discord.js";
import Command from "@models/command";

export default class extends Command {
    name = "Ping";
    description = "Pings the server";
    syntax = "ping";
    
    execute(message: Message, args: string[], client: Client) {
        // Time how long it takes to send a message
        const start = Date.now();
        message.channel.send("pong!").then(msg => {
            const end = Date.now();
            // Edit the reply to include the latency
            msg.edit(`pong! \`${end - start}ms\``);
        });
    }
}
