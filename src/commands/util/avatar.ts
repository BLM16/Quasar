import Command from "@models/command";
import { Message, Client, User } from "discord.js";

export default class Avatar implements Command {
    name = "Avatar";
    description = "Shows a user\'s avatar";
    syntax = "avatar <@user | user_id>?";
    aliases = ["pfp", "pic", "img"];

    execute(message: Message, args: string[], client: Client): void {
        let target: User = undefined;

        // Handles a mention
        if (message.mentions.users.first() != undefined)
            target = message.mentions.users.first();

        // Handles a user_id
        else if (message.guild != null)
            message.guild.members.fetch(args[0]).then(member => {
                target = member.user;
            }).catch(() => { });

        // Default to the message author
        if (target == undefined)
            target = message.author;

        // Send the avatar of the target
        message.channel.send(
            target.displayAvatarURL({
                dynamic: true,
                size: 1024
            })
        );
    }
}
