import { GoggleLine } from './GoggleLine';
export declare enum GoggleInstructionNumericOptionKey {
    BOOST = "boost",
    DOWNRANK = "downrank"
}
export declare type GoggleInstructionNumericOptionValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | undefined;
export declare class GoggleInstructionNumericOption extends GoggleLine {
    #private;
    static regex: RegExp;
    constructor(key: GoggleInstructionNumericOptionKey, value?: GoggleInstructionNumericOptionValue);
    testKey(key: unknown): key is GoggleInstructionNumericOptionKey;
    testValue(value: unknown): value is GoggleInstructionNumericOptionValue;
    get key(): GoggleInstructionNumericOptionKey;
    set key(key: GoggleInstructionNumericOptionKey);
    get value(): GoggleInstructionNumericOptionValue;
    set value(value: GoggleInstructionNumericOptionValue);
    toString(): string;
    static parse(line: string): GoggleInstructionNumericOption;
}
//# sourceMappingURL=GoggleInstructionNumericOption.d.ts.map