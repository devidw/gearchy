import { GoggleComment } from '../src';
describe('GoggleComment', () => {
    test('construction', () => {
        expect(new GoggleComment('okay').value).toBe('okay');
    });
    test('detecting', () => {
        expect(GoggleComment.test('')).toBe(false);
        expect(GoggleComment.test('pattern')).toBe(false);
        expect(GoggleComment.test('! name: Goggle')).toBe(false);
        expect(GoggleComment.test('! hey')).toBe(true);
    });
    test('parsing', () => {
        expect(GoggleComment.parse('! hey').value).toBe(' hey');
    });
    test('stringification', () => {
        expect(GoggleComment.parse('! hey').toString()).toBe('! hey');
    });
});
