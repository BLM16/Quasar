import { Message, MessageEmbed } from "discord.js";
import Command from "@models/command";
import { PermissionsFrom } from "@util/array_helper";
import { Bot } from "@/bot";

export default class Info implements Command {
    name = "Info";
    description = "Sends info about the bot";
    syntax = "info";
    aliases = ["inf", "invite", "repo", "gh", "link", "git", "bug", "issues"];

    perms = PermissionsFrom("USE_APPLICATION_COMMANDS");
    guildOnly = false;

    execute(message: Message, args: string[], BOT: Bot): void {
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(message.channel.type == "DM" ? 0x8c3d1e : message.guild.members.cache.get(BOT.client.user.id).displayHexColor)
                    .setTimestamp()
                    .addFields(
                        { name: "Invite Quasar to a Server", value: `[Invite Link](https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID!}&permissions=8&scope=bot)`, inline: false },
                        { name: "Git Repository URL", value: `${process.env.GITHUB_REPO_URL!}`, inline: false },
                        { name: "Report Issues/Bugs", value: `${process.env.GITHUB_REPO_URL!}/issues`, inline: false }
                    )
            ]
        })
    }
}
