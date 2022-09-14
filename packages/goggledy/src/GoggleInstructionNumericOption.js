import { GoggleLine } from './GoggleLine';
export var GoggleInstructionNumericOptionKey;
(function (GoggleInstructionNumericOptionKey) {
    GoggleInstructionNumericOptionKey["BOOST"] = "boost";
    GoggleInstructionNumericOptionKey["DOWNRANK"] = "downrank";
})(GoggleInstructionNumericOptionKey || (GoggleInstructionNumericOptionKey = {}));
export class GoggleInstructionNumericOption extends GoggleLine {
    static regex = /^(boost|downrank)(=([1-9]|10))?$/;
    #key;
    #value;
    constructor(key, value) {
        super();
        this.key = key;
        this.value = value;
    }
    testKey(key) {
        return Object.values(GoggleInstructionNumericOptionKey).includes(key);
    }
    testValue(value) {
        return (value === undefined ||
            (typeof value === 'number' && value >= 1 && value <= 10));
    }
    get key() {
        return this.#key;
    }
    set key(key) {
        if (!this.testKey(key)) {
            throw new Error('Invalid key');
        }
        this.#key = key;
    }
    get value() {
        return this.#value;
    }
    set value(value) {
        if (!this.testValue(value)) {
            throw new Error('Invalid value');
        }
        this.#value = value;
    }
    toString() {
        switch (this.value) {
            case undefined:
                return this.key;
            default:
                return this.key + '=' + this.value;
        }
    }
    static parse(line) {
        const [key, value] = line.split('=');
        const theKey = key;
        const theValue = value
            ? parseInt(value)
            : undefined;
        return new GoggleInstructionNumericOption(theKey, theValue);
    }
}
