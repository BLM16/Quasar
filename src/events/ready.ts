import { Bot } from "@/bot";
import { Presence } from "@/config";

/**
 * Handles the ready event
 * @param BOT The instance of the bot
 */
export default function(BOT: Bot): void {
    // Set the bot's presence
    BOT.client.user!.setPresence({
        status: Presence.status,
        activities: [{
            name: Presence.activity,
            type: Presence.type
        }],
    });

    console.log(`${BOT.client.user!.username} is online.`);
}
