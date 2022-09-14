import { Goggle, GoggleEmpty, GoggleMeta } from '../src';
const sampleGoggleStr = `! name: Goggle

! This is another comment`;
const sampleMetaData = {
    name: 'A Goggle',
    description: 'Some description',
    public: true,
    author: 'John Doe',
};
describe('Goggle', () => {
    test('get constructed meta data', () => {
        const goggle = new Goggle([], sampleMetaData);
        expect(goggle.metaData).toEqual(sampleMetaData);
    });
    test('constructing with meta data should set meta lines as well', () => {
        const goggle = new Goggle([new GoggleEmpty()], sampleMetaData);
        expect(goggle.lines.length).toEqual(Object.keys(sampleMetaData).length + 1);
        expect(goggle.lines[0]).toBeInstanceOf(GoggleMeta);
    });
    test('parsing line count', () => {
        expect(Goggle.parse(sampleGoggleStr).lines.length).toBe(3);
    });
    test('stringify', () => {
        expect(Goggle.parse(sampleGoggleStr).toString()).toBe(sampleGoggleStr);
    });
    test('discard actions count', () => {
        const goggle = Goggle.parse(`some$discard
             $boost`);
        expect(goggle.discards.length).toEqual(1);
    });
    test('boost actions count', () => {
        const goggle = Goggle.parse(`$boost=5
             $boost=10
             $downrank=10
             ! no action should also mean boost
             pattern
             $boost`);
        expect(goggle.boosts.length).toEqual(4);
    });
    test('downrank actions count', () => {
        const goggle = Goggle.parse(`$downrank
             $boost=10
             $downrank=1`);
        expect(goggle.downranks.length).toEqual(2);
    });
    test('parse and get meta data', () => {
        const goggle = Goggle.parse(`! name: Goggle
             ! description: A description`);
        expect(goggle.metaData).toHaveProperty('name', 'Goggle');
        expect(goggle.metaData).toHaveProperty('description', 'A description');
    });
    test('set and get meta data', () => {
        const goggle = Goggle.parse(sampleGoggleStr);
        goggle.metaData = sampleMetaData;
        expect(goggle.metaData).toEqual(sampleMetaData);
    });
});
