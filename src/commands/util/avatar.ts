import { Message, User } from "discord.js";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import GetMember from "@util/member_helper";
import { Bot } from "@/bot";

export default class Avatar implements Command {
    name = "Avatar";
    description = "Shows a user\'s avatar";
    syntax = "avatar <@user | user_id>?";
    aliases = ["pfp", "pic", "img", "av"];

    perms = PermissionsFrom("ATTACH_FILES", "USE_APPLICATION_COMMANDS");
    guildOnly = false;

    execute(message: Message, args: string[], BOT: Bot): void {
        let target: User;

        if (message.mentions.users.first()) {
            target = message.mentions.users.first();
        }
        else if (!args[0]) {
            target = message.author;
        }
        else if (message.channel.type == "DM") {
            target = args[0] == BOT.client.user.id
                ? BOT.client.user
                : message.author
        }
        else {
            target = GetMember(message.guild, args[0]).user;
        }

        // Send the avatar of the target
        message.channel.send(
            target.displayAvatarURL({
                dynamic: true,
                size: 1024
            })
        );
    }
}
