import { GoggleInstruction } from '../src';
describe('GoggleInstruction', () => {
    test('construction pattern', () => {
        expect(new GoggleInstruction('some-pattern').pattern).toBe('some-pattern');
    });
    test('construction boolean option', () => {
        const instruction = new GoggleInstruction('', {
            discard: true,
        });
        expect(instruction.options).toEqual({ discard: true });
    });
    test('construction numeric option', () => {
        const instruction = new GoggleInstruction('', { boost: 5 });
        expect(instruction.options).toEqual({ boost: 5 });
    });
    test('construction generic option', () => {
        const instruction = new GoggleInstruction('', {
            site: 'example.org',
        });
        expect(instruction.options).toEqual({ site: 'example.org' });
    });
    test('detecting', () => {
        expect(GoggleInstruction.test('')).toBe(false);
        expect(GoggleInstruction.test('!')).toBe(false);
        expect(GoggleInstruction.test('pattern')).toBe(true);
    });
    test('parsing without options', () => {
        expect(GoggleInstruction.parse('pattern').pattern).toBe('pattern');
    });
    test('parsing of numeric option', () => {
        const line = GoggleInstruction.parse('pattern$boost');
        expect(line.pattern).toBe('pattern');
        expect(line.options).toHaveProperty('boost');
    });
    test('parsing of boolean discard option', () => {
        const line = GoggleInstruction.parse('pattern$discard');
        expect(line.pattern).toBe('pattern');
        expect(line.options).toEqual({ discard: true });
    });
    test('parsing of generic option', () => {
        const line = GoggleInstruction.parse('pattern$site=example.org');
        expect(line.pattern).toBe('pattern');
        expect(line.options).toEqual({ site: 'example.org' });
    });
    test('parsing of non existing option', () => {
        const line = GoggleInstruction.parse('pattern$foo');
        expect(line.pattern).toBe('pattern');
        expect(line.options).toEqual({});
    });
    test('parsing of multiple different option types', () => {
        const line = GoggleInstruction.parse('pattern$boost=10,incontent,site=example.org');
        expect(line.pattern).toBe('pattern');
        expect(line.options).toEqual({
            boost: 10,
            incontent: true,
            site: 'example.org',
        });
    });
    test('stringify without option', () => {
        expect(GoggleInstruction.parse('pattern').toString()).toBe('pattern');
    });
    test('stringify with options', () => {
        expect(GoggleInstruction.parse('pattern$boost').toString()).toBe('pattern$boost');
    });
});
