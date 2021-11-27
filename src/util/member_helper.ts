import { Guild, GuildMember } from "discord.js";

/**
 * Gets a GuildMember from an id
 * @param guild The guild to fetch the member from
 * @param query The id to find the user with
 * @returns The matched GuildMember
 */
export default function GetMember(guild: Guild, query: string): GuildMember {
    let gm: GuildMember;
    if (!gm) {
        guild.members.fetch(query).then(m => gm = m);
    }

    return gm;
}
