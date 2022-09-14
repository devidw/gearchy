import { GoggleLine } from './GoggleLine';
export class GoggleEmpty extends GoggleLine {
    static regex = /^$/;
    constructor() {
        super();
    }
    toString() {
        return '';
    }
    toJSON() {
        return {
            type: 'empty',
        };
    }
}
