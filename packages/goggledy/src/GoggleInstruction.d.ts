import { GoggleLine } from './GoggleLine';
import { GoggleInstructionBooleanOption, GoggleInstructionBooleanOptionKey } from './GoggleInstructionBooleanOption';
import { GoggleInstructionNumericOption, GoggleInstructionNumericOptionKey, GoggleInstructionNumericOptionValue } from './GoggleInstructionNumericOption';
import { GoggleInstructionGenericOption, GoggleInstructionGenericOptionKey } from './GoggleInstructionGenericOption';
export declare type GoggleInstructionOptionKey = GoggleInstructionBooleanOptionKey | GoggleInstructionNumericOptionKey | GoggleInstructionGenericOptionKey;
export declare type GoggleInstructionOption = GoggleInstructionBooleanOption | GoggleInstructionNumericOption | GoggleInstructionGenericOption;
export declare enum GoggleInstructionActionOptionKey {
    DISCARD = "discard",
    BOOST = "boost",
    DOWNRANK = "downrank"
}
export declare enum GoggleInstructionContextOptionKey {
    INURL = "inurl",
    INTITLE = "intitle",
    INDESCRIPTION = "indescription",
    INCONTENT = "incontent"
}
declare type GoggleInstructionBaseOptions = Partial<{
    [value in GoggleInstructionGenericOptionKey]: string;
} & {
    [value in GoggleInstructionContextOptionKey]: true;
}>;
export declare type GoggleInstructionDiscardOptions = GoggleInstructionBaseOptions & {
    [GoggleInstructionBooleanOptionKey.DISCARD]?: true;
    [GoggleInstructionNumericOptionKey.BOOST]?: never;
    [GoggleInstructionNumericOptionKey.DOWNRANK]?: never;
};
export declare type GoggleInstructionBoostOptions = GoggleInstructionBaseOptions & {
    [GoggleInstructionBooleanOptionKey.DISCARD]?: never;
    [GoggleInstructionNumericOptionKey.BOOST]?: GoggleInstructionNumericOptionValue;
    [GoggleInstructionNumericOptionKey.DOWNRANK]?: never;
};
export declare type GoggleInstructionDownrankOptions = GoggleInstructionBaseOptions & {
    [GoggleInstructionBooleanOptionKey.DISCARD]?: never;
    [GoggleInstructionNumericOptionKey.BOOST]?: never;
    [GoggleInstructionNumericOptionKey.DOWNRANK]?: GoggleInstructionNumericOptionValue;
};
export declare type GoggleInstructionOptions = GoggleInstructionDiscardOptions | GoggleInstructionBoostOptions | GoggleInstructionDownrankOptions;
export declare class GoggleInstruction extends GoggleLine {
    static regex: RegExp;
    pattern?: string;
    optionLines: GoggleInstructionOption[];
    constructor(pattern?: string, options?: GoggleInstructionOptions);
    toString(): string;
    toJSON(): {
        type: string;
        pattern: string | undefined;
        options: GoggleInstructionOptions;
    };
    static parse(line: string): GoggleInstruction;
    get options(): GoggleInstructionOptions;
    set options(options: GoggleInstructionOptions);
    get action(): GoggleInstructionActionOptionKey;
}
export {};
//# sourceMappingURL=GoggleInstruction.d.ts.map