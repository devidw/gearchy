import { GoggleLine } from './GoggleLine';
export declare class GoggleComment extends GoggleLine {
    /**
     * @see https://stackoverflow.com/a/977294/13765033
     */
    static regex: RegExp;
    value: string;
    constructor(value: string);
    toString(): string;
    toJSON(): object;
    static parse(line: string): GoggleComment;
}
//# sourceMappingURL=GoggleComment.d.ts.map