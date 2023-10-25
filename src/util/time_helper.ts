const durationRE = /(?<num>\d+(.\d+)?)(?<fix>[smhdw])/i;

export function ParseDurationAsMS(duration: string): number {
    duration = duration.replace(" ", "");
    if (!durationRE.test(duration)) {
        throw "Cannot parse duration";
    }

    let parsed = duration.match(durationRE)!.groups;
    let num = Number.parseFloat(parsed!.num);

    switch (parsed!.fix) {
        case 's':
            return 1000 * num;
        case 'm':
            return 1000 * 60 * num;
        case 'h':
            return 1000 * 60 * 60 * num;
        case 'd':
            return 1000 * 60 * 60 * 24 * num;
        case 'w':
            return 1000 * 60 * 60 * 24 * 7 * num;

        default: // Should never happen
            throw "Cannot parse duration"
    }
}

export function ToUNIXTimestamp(time: number) {
    return Math.floor(time / 1000);
}
