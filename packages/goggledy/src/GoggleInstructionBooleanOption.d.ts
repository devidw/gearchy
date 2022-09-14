import { GoggleLine } from './GoggleLine';
export declare enum GoggleInstructionBooleanOptionKey {
    DISCARD = "discard",
    INURL = "inurl",
    INTITLE = "intitle",
    INDESCRIPTION = "indescription",
    INCONTENT = "incontent"
}
export declare class GoggleInstructionBooleanOption extends GoggleLine {
    #private;
    static regex: RegExp;
    constructor(key: GoggleInstructionBooleanOptionKey, value?: boolean);
    static testKey(key: unknown): key is GoggleInstructionBooleanOptionKey;
    static testValue(value: unknown): value is boolean;
    get key(): GoggleInstructionBooleanOptionKey;
    set key(key: GoggleInstructionBooleanOptionKey);
    get value(): boolean;
    set value(value: boolean);
    toString(): string;
    static parse(str: string): GoggleInstructionBooleanOption;
}
//# sourceMappingURL=GoggleInstructionBooleanOption.d.ts.map