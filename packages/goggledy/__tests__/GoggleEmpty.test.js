import { GoggleEmpty } from '../src';
describe('GoggleEmpty', () => {
    test('detecting', () => {
        expect(GoggleEmpty.test('')).toBe(true);
        expect(GoggleEmpty.test('!')).toBe(false);
    });
    test('stringification', () => {
        expect(new GoggleEmpty().toString()).toBe('');
    });
});
