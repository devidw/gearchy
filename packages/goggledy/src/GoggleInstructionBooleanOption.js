import { GoggleLine } from './GoggleLine';
export var GoggleInstructionBooleanOptionKey;
(function (GoggleInstructionBooleanOptionKey) {
    GoggleInstructionBooleanOptionKey["DISCARD"] = "discard";
    GoggleInstructionBooleanOptionKey["INURL"] = "inurl";
    GoggleInstructionBooleanOptionKey["INTITLE"] = "intitle";
    GoggleInstructionBooleanOptionKey["INDESCRIPTION"] = "indescription";
    GoggleInstructionBooleanOptionKey["INCONTENT"] = "incontent";
})(GoggleInstructionBooleanOptionKey || (GoggleInstructionBooleanOptionKey = {}));
// TODO: Does it make sense to have a value for this? When set should always be
// truthy. Would not make sense to set to false, since then it should no be set
// in the first place. Because this would mean that the option should no bet set
// at all.
export class GoggleInstructionBooleanOption extends GoggleLine {
    static regex = /^(discard|inurl|intitle|indescription|incontent)$/;
    #key;
    #value;
    constructor(key, value = true) {
        super();
        this.key = key;
        this.value = value;
    }
    static testKey(key) {
        return Object.values(GoggleInstructionBooleanOptionKey).includes(key);
    }
    static testValue(value) {
        return typeof value === 'boolean';
    }
    get key() {
        return this.#key;
    }
    set key(key) {
        if (!GoggleInstructionBooleanOption.testKey(key)) {
            throw new Error(`Invalid key for GoggleInstructionBooleanOption: ${key}`);
        }
        this.#key = key;
    }
    get value() {
        return this.#value;
    }
    set value(value) {
        if (!GoggleInstructionBooleanOption.testValue(value)) {
            throw new Error(`Invalid value for GoggleInstructionBooleanOption: ${value}`);
        }
        this.#value = value;
    }
    toString() {
        return this.value ? this.key : '';
    }
    static parse(str) {
        return new GoggleInstructionBooleanOption(str);
    }
}
