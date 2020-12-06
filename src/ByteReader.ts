
export const EOF = -1;

/**
 * Provides an API for reading through a byte array.
 */
export class ByteReader {
    private readonly b: Uint8Array;
    private pos: number;

    constructor(b: Uint8Array) {
        this.b = b;
        this.pos = 0;
    }

    /**
     * Return the next byte, or EOF on end of array.
     *
     * @returns {number}
     */
    public read(): number {
        return this.pos < this.b.length ? this.b[this.pos++] : EOF;
    }

    /**
     * Return the byte address of the next byte to be read.
     */
    public addr(): number {
        return this.pos;
    }

    /**
     * Reads a little-endian short (two-byte) integer.
     *
     * @param allowEofAfterFirstByte if true, an EOF after the first byte will result in just the
     * first byte. Otherwise an EOF is returned.
     * @returns the integer, or EOF on end of file.
     */
    public readShort(allowEofAfterFirstByte: boolean): number {
        const low = this.read();
        if (low === EOF) {
            return EOF;
        }

        const high = this.read();
        if (high === EOF) {
            return allowEofAfterFirstByte ? low : EOF;
        }

        return low + high * 256;
    }

    /**
     * Reads an ASCII string from the stream. If the returned string is shorter than "length", then we hit EOF.
     */
    public readString(length: number): string {
        return new TextDecoder("ascii").decode(this.readBytes(length));
    }

    /**
     * Returns the next "length" bytes. If the returned array is shorter than "length", then we hit EOF.
     */
    public readBytes(length: number): Uint8Array {
        const pos = this.pos;
        length = Math.min(length, this.b.length - pos);
        this.pos += length;

        // So instead make a copy.
        return this.b.slice(pos, pos + length);
    }
}
