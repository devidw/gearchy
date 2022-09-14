import { GoggleEmpty } from './GoggleEmpty';
import { GoggleMeta, GoggleMetaData } from './GoggleMeta';
import { GoggleComment } from './GoggleComment';
import { GoggleInstruction } from './GoggleInstruction';
export declare type GoggleLine = GoggleEmpty | GoggleMeta | GoggleComment | GoggleInstruction;
export declare class Goggle {
    lines: GoggleLine[];
    constructor(lines?: GoggleLine[], metaData?: GoggleMetaData);
    toString(): string;
    toJSON(): object;
    static parse(str: string): Goggle;
    get metaData(): GoggleMetaData;
    /**
     * Override all the meta data of the Goggle.
     * Existing meta data will be overwritten, obmitted meta data will be
     * removed and new meta data will be added.
     */
    set metaData(metaData: GoggleMetaData);
    private getInstructionsByAction;
    get boosts(): Readonly<GoggleInstruction[]>;
    get downranks(): Readonly<GoggleInstruction[]>;
    get discards(): Readonly<GoggleInstruction[]>;
}
//# sourceMappingURL=Goggle.d.ts.map