import { GoggleLine } from './GoggleLine';
export var GoggleMetaDataKey;
(function (GoggleMetaDataKey) {
    GoggleMetaDataKey["NAME"] = "name";
    GoggleMetaDataKey["DESCRIPTION"] = "description";
    GoggleMetaDataKey["PUBLIC"] = "public";
    GoggleMetaDataKey["AUTHOR"] = "author";
    GoggleMetaDataKey["HOMEPAGE"] = "homepage";
    GoggleMetaDataKey["ISSUES"] = "issues";
    GoggleMetaDataKey["TRANSFERRED_TO"] = "transferred_to";
    GoggleMetaDataKey["AVATAR"] = "avatar";
    GoggleMetaDataKey["LICENSE"] = "license";
})(GoggleMetaDataKey || (GoggleMetaDataKey = {}));
export class GoggleMeta extends GoggleLine {
    static regex = /! (?<key>(name|description|public|author|homepage|issues|transferred_to|avatar|license)): (?<value>(.+))/;
    #key;
    #value;
    constructor(key, value) {
        super();
        this.key = key;
        this.value = value;
    }
    static testKey(key) {
        return Object.values(GoggleMetaDataKey).includes(key);
    }
    static testValue(value) {
        return typeof value === 'string' || typeof value === 'boolean';
    }
    get key() {
        return this.#key;
    }
    set key(key) {
        if (!GoggleMeta.testKey(key)) {
            throw new Error(`Invalid key for GoggleMeta: ${key}`);
        }
        this.#key = key;
    }
    get value() {
        return this.#value;
    }
    set value(value) {
        if (!GoggleMeta.testValue(value)) {
            throw new Error(`Invalid value for GoggleMeta: ${value}`);
        }
        this.#value = value;
    }
    toString() {
        return `! ${this.key}: ${this.value}`;
    }
    toJSON() {
        return {
            type: 'meta',
            key: this.key,
            value: this.value,
        };
    }
    // TODO: Refactor into seperate classes to also call .test() and .parse()
    // for boolean and string meta data values
    // This would also make sure that key value combinations have runtime type
    // checks via the user defined type guards testKey() and testValue()
    static parse(line) {
        const groups = line.match(this.regex)?.groups;
        if (!groups?.key || !groups?.value) {
            throw new Error(`Invalid meta data: ${line}`);
        }
        switch (true) {
            // ! public: true
            case groups.key === GoggleMetaDataKey.PUBLIC && groups.value === 'true':
                return new GoggleMeta(GoggleMetaDataKey.PUBLIC, true);
            // ! public: false
            case groups.key === GoggleMetaDataKey.PUBLIC && groups.value === 'false':
                return new GoggleMeta(GoggleMetaDataKey.PUBLIC, false);
            // ! any other valid key: value
            case Object.values(GoggleMetaDataKey).includes(groups.key):
                return new GoggleMeta(groups.key, groups?.value || '');
            // Should never happen because regex already checks for valid keys,
            // but typescript complains if we don't handle "all" cases.
            default:
                /* istanbul ignore next */
                throw new Error(`Invalid meta data: ${line}`);
        }
    }
}
