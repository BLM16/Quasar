import Collection from "@discordjs/collection";
import Command from "@models/command";
import { readdirSync } from "fs";
import { join } from "path";

/** The path to the commands folder */
const commandFolderPath = join(__dirname, "..", "commands");

/**
 * Maps all the command files in the commands directory to names and aliases
 * @returns A {@link Collection} of mapped commands
 */
export default function LoadCommands(): Collection<string, Command> {
    const commands = new Collection<string, Command>();

    // Loop through all the folders in the commands directory
    getCommandFolders().forEach(dir => {
        // Loop through all the files in each command directory
        readdirSync(join(commandFolderPath, dir), { withFileTypes: true }).forEach(file => {
            // Get the command
            const F = require(join(commandFolderPath, dir, file.name));
            const cmd: Command = new F.default;

            // Add the command and its aliases to the commands collection
            commands.set(cmd.name.toLowerCase(), cmd);
            if (cmd.aliases)
                cmd.aliases.forEach((alias: string) => {
                    commands.set(alias.toLowerCase(), cmd);
                });
        });
    });

    return commands;
}

/**
 * @returns The list of all the folders in the commands directory
 */
function getCommandFolders(): string[] {
    return readdirSync(commandFolderPath, { withFileTypes: true })
            .filter(dir => dir.isDirectory())
            .map(dir => dir.name)
}
