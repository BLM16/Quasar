import { PermissionString, Permissions } from "discord.js";

export function PermissionsFrom(...arr: PermissionString[]): Permissions[] {
    return arr.map(perm => new Permissions(perm));
}
