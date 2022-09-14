import { GoggleEmpty } from './GoggleEmpty';
import { GoggleMeta } from './GoggleMeta';
import { GoggleComment } from './GoggleComment';
import { GoggleInstruction, GoggleInstructionActionOptionKey, } from './GoggleInstruction';
export class Goggle {
    lines = [];
    constructor(lines, metaData) {
        if (lines?.length) {
            this.lines = lines;
        }
        if (metaData) {
            this.metaData = metaData;
        }
    }
    toString() {
        return this.lines.map((line) => line.toString()).join('\n');
    }
    toJSON() {
        return {
            metaData: this.metaData,
            lines: this.lines.map((line) => line.toJSON()),
        };
    }
    static parse(str) {
        const lines = str.split('\n').map((line) => {
            line = line.trimStart();
            switch (true) {
                case GoggleEmpty.test(line):
                    return new GoggleEmpty();
                case GoggleMeta.test(line):
                    return GoggleMeta.parse(line);
                case GoggleComment.test(line):
                    return GoggleComment.parse(line);
                default:
                    return GoggleInstruction.parse(line);
            }
        });
        return new Goggle(lines);
    }
    get metaData() {
        const meta = {};
        this.lines.forEach((line) => {
            if (line instanceof GoggleMeta) {
                Object.assign(meta, { [line.key]: line.value });
            }
        });
        return meta;
    }
    /**
     * Override all the meta data of the Goggle.
     * Existing meta data will be overwritten, obmitted meta data will be
     * removed and new meta data will be added.
     */
    set metaData(metaData) {
        // Remove all existing meta data
        this.lines = this.lines.filter((line) => {
            return !(line instanceof GoggleMeta);
        });
        // Add all meta data
        Object.entries(metaData)
            .reverse()
            .forEach(([key, value]) => {
            this.lines = [
                new GoggleMeta(key, value),
                ...this.lines,
            ];
        });
    }
    getInstructionsByAction(action) {
        return (this.lines.filter((line) => line instanceof GoggleInstruction && line.action === action));
    }
    get boosts() {
        return this.getInstructionsByAction(GoggleInstructionActionOptionKey.BOOST);
    }
    get downranks() {
        return this.getInstructionsByAction(GoggleInstructionActionOptionKey.DOWNRANK);
    }
    get discards() {
        return this.getInstructionsByAction(GoggleInstructionActionOptionKey.DISCARD);
    }
}
