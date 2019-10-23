
const basicSearch = require("../src/searchFunc");



test('to test the basic search', () => {
    return basicSearch.basicSearch().then(data => {

        expect(data[0].title).toBe('The TDD way');
    })
})




