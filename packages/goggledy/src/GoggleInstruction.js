import { GoggleLine } from './GoggleLine';
import { GoggleInstructionBooleanOption, GoggleInstructionBooleanOptionKey, } from './GoggleInstructionBooleanOption';
import { GoggleInstructionNumericOption, GoggleInstructionNumericOptionKey, } from './GoggleInstructionNumericOption';
import { GoggleInstructionGenericOption, GoggleInstructionGenericOptionKey, } from './GoggleInstructionGenericOption';
export var GoggleInstructionActionOptionKey;
(function (GoggleInstructionActionOptionKey) {
    GoggleInstructionActionOptionKey["DISCARD"] = "discard";
    GoggleInstructionActionOptionKey["BOOST"] = "boost";
    GoggleInstructionActionOptionKey["DOWNRANK"] = "downrank";
})(GoggleInstructionActionOptionKey || (GoggleInstructionActionOptionKey = {}));
export var GoggleInstructionContextOptionKey;
(function (GoggleInstructionContextOptionKey) {
    GoggleInstructionContextOptionKey["INURL"] = "inurl";
    GoggleInstructionContextOptionKey["INTITLE"] = "intitle";
    GoggleInstructionContextOptionKey["INDESCRIPTION"] = "indescription";
    GoggleInstructionContextOptionKey["INCONTENT"] = "incontent";
})(GoggleInstructionContextOptionKey || (GoggleInstructionContextOptionKey = {}));
export class GoggleInstruction extends GoggleLine {
    static regex = /^(?!!).+/;
    pattern;
    optionLines;
    constructor(pattern, options) {
        super();
        this.optionLines = [];
        this.pattern = pattern || '';
        this.options = options || {};
    }
    toString() {
        let stringified = this.pattern;
        const options = this.optionLines
            .map((option) => option.toString())
            .filter((option) => option)
            .join(',');
        if (options) {
            stringified += '$' + options;
        }
        return stringified || '';
    }
    toJSON() {
        return {
            type: 'instruction',
            pattern: this.pattern,
            options: this.options,
        };
    }
    static parse(line) {
        const instruction = new GoggleInstruction();
        const [pattern, options] = line.split('$');
        instruction.pattern = pattern;
        if (options) {
            const optionLines = options.split(',');
            optionLines.forEach((optionLine) => {
                switch (true) {
                    case GoggleInstructionBooleanOption.test(optionLine):
                        instruction.optionLines.push(GoggleInstructionBooleanOption.parse(optionLine));
                        break;
                    case GoggleInstructionNumericOption.test(optionLine):
                        instruction.optionLines.push(GoggleInstructionNumericOption.parse(optionLine));
                        break;
                    case GoggleInstructionGenericOption.test(optionLine):
                        instruction.optionLines.push(GoggleInstructionGenericOption.parse(optionLine));
                        break;
                    default:
                        break;
                }
            });
        }
        return instruction;
    }
    get options() {
        const options = {};
        this.optionLines.forEach(({ key, value }) => {
            Object.assign(options, { [key]: value });
        });
        return options;
    }
    set options(options) {
        this.optionLines = []; // clear existing options
        Object.entries(options).forEach(([key, value]) => {
            switch (true) {
                case Object.values(GoggleInstructionBooleanOptionKey).includes(key):
                    this.optionLines.push(new GoggleInstructionBooleanOption(key, value));
                    break;
                case Object.values(GoggleInstructionNumericOptionKey).includes(key):
                    this.optionLines.push(new GoggleInstructionNumericOption(key, value));
                    break;
                case Object.values(GoggleInstructionGenericOptionKey).includes(key):
                    this.optionLines.push(new GoggleInstructionGenericOption(key, value));
                    break;
                default:
                    /* istanbul ignore next */
                    throw new Error(`Invalid option ${key} provided`);
            }
        });
    }
    get action() {
        return ((Object.keys(this.options).find((key) => Object.values(GoggleInstructionActionOptionKey).includes(key))) || GoggleInstructionActionOptionKey.BOOST // default action
        );
    }
}
