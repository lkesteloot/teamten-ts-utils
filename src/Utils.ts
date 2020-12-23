
/**
 * Remove all children from element.
 */
export function clearElement(e: Element): void {
    while (e.firstChild) {
        e.removeChild(e.firstChild);
    }
}

/**
 * Generate the string version of a number, in base 10, with commas for thousands groups.
 */
export function withCommas(n: number | string): string {
    let s = typeof n === "number" ? Math.round(n).toString(10) : n;

    const negative = s.length >= 1 && s.charAt(0) === "-";
    const firstDigit = negative ? 1 : 0;

    if (s.length - firstDigit > 4) {
        for (let i = s.length - 3; i > firstDigit; i -= 3) {
            s = s.substring(0, i) + "," + s.substring(i);
        }
    }

    return s;
}

/**
 * Concatenate a list of byte arrays into one.
 */
export function concatByteArrays(samplesList: Uint8Array[]): Uint8Array {
    const length = samplesList.reduce((sum, samples) => sum + samples.length, 0);
    const allBytes = new Uint8Array(length);

    let offset = 0;
    for (const samples of samplesList) {
        allBytes.set(samples, offset);
        offset += samples.length;
    }

    return allBytes;
}
