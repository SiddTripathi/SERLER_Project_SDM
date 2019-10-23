// const {basicSearch}= require('')
const basicSearch = require("../src/searchFunc");

// test('to test the basic search',()=>{



//     expect(basicSearch('tdd').title).toBe('The TDD way');
// }

// )



    test('to test the basic search', () => {
        return basicSearch.basicSearch().then(data => {

            expect(data[0].title).toBe('The TDD way');
        })
    })



