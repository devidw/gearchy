import { GoggleLine } from './GoggleLine';
export declare enum GoggleMetaDataKey {
    NAME = "name",
    DESCRIPTION = "description",
    PUBLIC = "public",
    AUTHOR = "author",
    HOMEPAGE = "homepage",
    ISSUES = "issues",
    TRANSFERRED_TO = "transferred_to",
    AVATAR = "avatar",
    LICENSE = "license"
}
export declare type GoggleMetaData = Partial<{
    [GoggleMetaDataKey.NAME]: string;
    [GoggleMetaDataKey.DESCRIPTION]: string;
    [GoggleMetaDataKey.PUBLIC]: boolean;
    [GoggleMetaDataKey.AUTHOR]: string;
    [GoggleMetaDataKey.HOMEPAGE]: string;
    [GoggleMetaDataKey.ISSUES]: string;
    [GoggleMetaDataKey.TRANSFERRED_TO]: string;
    [GoggleMetaDataKey.AVATAR]: string;
    [GoggleMetaDataKey.LICENSE]: string;
}>;
export declare class GoggleMeta extends GoggleLine {
    #private;
    static regex: RegExp;
    constructor(key: GoggleMetaDataKey, value: string | boolean);
    static testKey(key: unknown): key is GoggleMetaDataKey;
    static testValue(value: unknown): value is string | boolean;
    get key(): GoggleMetaDataKey;
    set key(key: GoggleMetaDataKey);
    get value(): string | boolean;
    set value(value: string | boolean);
    toString(): string;
    toJSON(): object;
    static parse(line: string): GoggleMeta;
}
//# sourceMappingURL=GoggleMeta.d.ts.map