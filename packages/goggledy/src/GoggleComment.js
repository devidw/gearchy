import { GoggleLine } from './GoggleLine';
export class GoggleComment extends GoggleLine {
    /**
     * @see https://stackoverflow.com/a/977294/13765033
     */
    static regex = /^!(?:(?! (name|description|public|author|homepage|issues|transferred_to|avatar|license):))(?<value>(.*))/;
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    toString() {
        return `!${this.value}`;
    }
    toJSON() {
        return {
            type: 'comment',
            value: this.value,
        };
    }
    static parse(line) {
        const groups = line.match(this.regex)?.groups;
        const value = groups?.value ?? '';
        return new GoggleComment(value);
    }
}
