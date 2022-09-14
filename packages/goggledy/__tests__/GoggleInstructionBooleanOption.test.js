import { GoggleInstructionBooleanOption, GoggleInstructionBooleanOptionKey, } from '../src';
describe('GoggleInstructionBooleanOption', () => {
    test('constructing', () => {
        expect(new GoggleInstructionBooleanOption(GoggleInstructionBooleanOptionKey.DISCARD).key).toBe('discard');
    });
    test('detecting valid keys', () => {
        expect(GoggleInstructionBooleanOption.test('discard')).toBe(true);
        expect(GoggleInstructionBooleanOption.test('inurl')).toBe(true);
        expect(GoggleInstructionBooleanOption.test('intitle')).toBe(true);
        expect(GoggleInstructionBooleanOption.test('indescription')).toBe(true);
        expect(GoggleInstructionBooleanOption.test('incontent')).toBe(true);
    });
    test('detecting existing but invalid keys', () => {
        expect(GoggleInstructionBooleanOption.test('boost')).toBe(false);
        expect(GoggleInstructionBooleanOption.test('downrank')).toBe(false);
        expect(GoggleInstructionBooleanOption.test('site')).toBe(false);
    });
    test('that values are not detected', () => {
        expect(GoggleInstructionBooleanOption.test('inurl=true')).toBe(false);
    });
    test('parse key', () => {
        expect(GoggleInstructionBooleanOption.parse('inurl').key).toBe('inurl');
    });
    test('stringify', () => {
        expect(new GoggleInstructionBooleanOption(GoggleInstructionBooleanOptionKey.INURL).toString()).toBe('inurl');
    });
});
