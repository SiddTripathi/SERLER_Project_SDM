
const advSearch = require("../src/advSearchFunc");
let data= {title:"The TDD way",author:"R.R. Sharma\n",journal_name:"IEEE",date:"2018-11",weblink:"https://dummyfortdd.com",research_ques:"benefits of tdd",method:"tdd",benefit:"performance"};
let inputData={date1: "",
date2: "",
method: "contains",
operator: "and",
type: "method",
value: "tdd"};



test('to test the advance search',()=>{
    return advSearch.advSearch(inputData).then(data1 => {
console.log(data1);
expect(data1.title).toBe(data.title);
    }) 
})
