import { GoggleLine } from './GoggleLine';
export var GoggleInstructionGenericOptionKey;
(function (GoggleInstructionGenericOptionKey) {
    GoggleInstructionGenericOptionKey["SITE"] = "site";
})(GoggleInstructionGenericOptionKey || (GoggleInstructionGenericOptionKey = {}));
export class GoggleInstructionGenericOption extends GoggleLine {
    static regex = /^(site)=(.+)$/;
    #key;
    #value;
    constructor(key, value) {
        super();
        this.key = key;
        this.value = value;
    }
    static testKey(key) {
        return Object.values(GoggleInstructionGenericOptionKey).includes(key);
    }
    static testValue(value) {
        return typeof value === 'string' && value.length > 0;
    }
    get key() {
        return this.#key;
    }
    set key(key) {
        if (!GoggleInstructionGenericOption.testKey(key)) {
            throw new Error(`Invalid key for GoggleInstructionGenericOption: ${key}`);
        }
        this.#key = key;
    }
    get value() {
        return this.#value;
    }
    set value(value) {
        if (!GoggleInstructionGenericOption.testValue(value)) {
            throw new Error(`Invalid value for GoggleInstructionGenericOption: ${value}`);
        }
        this.#value = value;
    }
    toString() {
        return `${this.key}=${this.value}`;
    }
    static parse(str) {
        const [key, value] = str.split('=');
        return new GoggleInstructionGenericOption(key, value);
    }
}
