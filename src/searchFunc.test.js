const {basicSearch}= require('./basicSearch')

test('to test the basic search',()=>{



    expect(basicSearch('tdd').title).toBe('The TDD way');
}

)