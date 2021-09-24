import { PermissionString, Permissions } from "discord.js";

/**
 * Converts multiple {@link PermissionString} into an array of {@link Permissions}
 * @param arr The list of {@link PermissionString} to convert into a permissions array
 * @returns An array of {@link Permissions}
 */
export function PermissionsFrom(...arr: PermissionString[]): Permissions[] {
    return arr.map(perm => new Permissions(perm));
}
