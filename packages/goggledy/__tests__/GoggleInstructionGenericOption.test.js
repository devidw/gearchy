import { GoggleInstructionGenericOption, GoggleInstructionGenericOptionKey, } from '../src';
describe('GoggleInstructionGenericOption', () => {
    test('constructing key value', () => {
        const option = new GoggleInstructionGenericOption(GoggleInstructionGenericOptionKey.SITE, 'example.org');
        expect(option.key).toBe('site');
        expect(option.value).toBe('example.org');
    });
    test('parsing key value', () => {
        const option = GoggleInstructionGenericOption.parse('site=example.org');
        expect(option.key).toBe('site');
        expect(option.value).toBe('example.org');
    });
    test('detection', () => {
        expect(GoggleInstructionGenericOption.test('site=example.org')).toBe(true);
        expect(GoggleInstructionGenericOption.test('foo=bar')).toBe(false);
    });
    test('stringify key value', () => {
        expect(new GoggleInstructionGenericOption(GoggleInstructionGenericOptionKey.SITE, 'example.org').toString()).toBe('site=example.org');
    });
    test('stringify empty', () => {
        expect(() => new GoggleInstructionGenericOption(GoggleInstructionGenericOptionKey.SITE, '').toString()).toThrow(Error);
    });
});
