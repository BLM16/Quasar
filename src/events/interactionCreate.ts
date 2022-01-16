import { Interaction } from "discord.js";
import { Bot } from "@/bot";

/**
 * Handles the interactionCreate event
 * @param interaction The interaction that was created
 * @param BOT The instance of the bot
 */
export default function(interaction: Interaction, BOT: Bot) {
    if (interaction.isCommand()) {
        // Get the command itself
        const cmd = BOT.commands.get(interaction.commandName);
        if (!cmd) return;

        // Run the command
        try {
            if (!interaction.guild && cmd.guildOnly) return interaction.reply({ content: "This command can only be run in a guild.", ephemeral: true });
            else if (!interaction.guild) return cmd.executeSlash(interaction, BOT);
            
            const member = interaction.guild.members.cache.get(interaction.member.user.id);
            // Make sure the user has the required permissions to run the command
            cmd.perms.forEach(perm => {
                if (!member.permissions.has(perm))
                    return void(interaction.reply({ content: "You don\'t have adequate permissions to run this command.", ephemeral: true }));
            });

            /// TODO: Check if user has proper ranks too

            cmd.executeSlash(interaction, BOT);
        } catch (e) {
            interaction.reply({ content: "We encountered an unexpected error while processing your command.", ephemeral: true });
            console.error(e);
        }
    }
}
