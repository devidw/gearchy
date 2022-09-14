import { GoggleLine } from './GoggleLine';
export declare enum GoggleInstructionGenericOptionKey {
    SITE = "site"
}
export declare type GoggleInstructionGenericOptionValue = string;
export declare class GoggleInstructionGenericOption extends GoggleLine {
    #private;
    static regex: RegExp;
    constructor(key: GoggleInstructionGenericOptionKey, value: GoggleInstructionGenericOptionValue);
    static testKey(key: unknown): key is GoggleInstructionGenericOptionKey;
    static testValue(value: unknown): value is GoggleInstructionGenericOptionValue;
    get key(): GoggleInstructionGenericOptionKey;
    set key(key: GoggleInstructionGenericOptionKey);
    get value(): GoggleInstructionGenericOptionValue;
    set value(value: GoggleInstructionGenericOptionValue);
    toString(): string;
    static parse(str: string): GoggleInstructionGenericOption;
}
//# sourceMappingURL=GoggleInstructionGenericOption.d.ts.map