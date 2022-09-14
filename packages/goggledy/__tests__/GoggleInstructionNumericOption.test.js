import { GoggleInstructionNumericOption, GoggleInstructionNumericOptionKey, } from '../src';
describe('GoggleInstructionNumericOption', () => {
    test('constructing key value', () => {
        const option = new GoggleInstructionNumericOption(GoggleInstructionNumericOptionKey.BOOST, 2);
        expect(option.key).toBe('boost');
        expect(option.value).toBe(2);
    });
    test('parsing key value', () => {
        const option = GoggleInstructionNumericOption.parse('boost=2');
        expect(option.key).toBe('boost');
        expect(option.value).toBe(2);
    });
    test('detection', () => {
        expect(GoggleInstructionNumericOption.test('boost')).toBe(true);
        expect(GoggleInstructionNumericOption.test('downrank')).toBe(true);
        expect(GoggleInstructionNumericOption.test('boost=2')).toBe(true);
        expect(GoggleInstructionNumericOption.test('boost=10')).toBe(true);
        expect(GoggleInstructionNumericOption.test('downrank=2')).toBe(true);
        expect(GoggleInstructionNumericOption.test('discard=2')).toBe(false);
    });
    test('stringify key', () => {
        expect(new GoggleInstructionNumericOption(GoggleInstructionNumericOptionKey.DOWNRANK).toString()).toBe('downrank');
    });
    test('stringify key value', () => {
        expect(new GoggleInstructionNumericOption(GoggleInstructionNumericOptionKey.BOOST, 2).toString()).toBe('boost=2');
    });
});
