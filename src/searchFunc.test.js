

const searchGenral = require('./searchFunc.js')
const searchWord = "tdd"
let dataset = { "title": "The TDD way", "author": "R.R. Sharma\n", "journal_name": "IEEE", "date": "1999-10-31T11:00:00.000Z", "weblink": "https://dummyfortdd.com" }
// //test site loads on host 8080
// test("test app loads",()=>{

// });
// // test return valid result when search is valid
// // test return no result when search do not have result
// // test return when search is null
// let l1 = searchGenral(searchWord);
// console.log(typeof dataset)
//console.log(JSON.stringify(searchGenral(searchWord)))

searchGenral.basicsearch("tdd").then(() => console.log("connected"));


//console.log((JSON.stringify(searchGenral(searchWord))).title);
// if (JSON.stringify(searchGenral(searchWord)) == dataset) {
//     console.log("1");
// } else { console.log("0") }
// console.log(searchGeneral("tdd").title);

// test('tdd search', () => {
//     expect(searchGenral(searchWord).toEqual(dataset));
// });