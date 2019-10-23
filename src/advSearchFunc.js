
async function advSearch(data) {
    var date1 = '1960-01-01';
    var date2 = '2020-12-12';
    if (data.date1) { date1 = data.date1; };
    if (data.date2) { date2 = data.date2 };

    const { Client } = require("pg");
    const client = new Client({
        user: "wnuvnkgceokgvn",
        password: "2645ef631e8c9100a4a82d71ae79f9213e8389c68f257994798ed7faa04515a3",
        host: "ec2-107-20-251-130.compute-1.amazonaws.com",
        port: 5432,
        database: "d5j9t6vspri53v",
        ssl: true
    });
 


    let searchword = '';

    console.log(data.operator)
    for (let i = 0; i < data.length; i++) {


        var a = data[i].type;
        var b = data[i].method;
        c = data[i].value.toLowerCase();
        d = '('
        if (i > 0) { d = data[i - 1].operator + ' '; }
        console.log(d)


        if (b == 'contains') {
            c1 = d;
            s1 = a;
            s2 = 'like';
            s3 = c;
            searchword = searchword + ' ' + c1 + '(ai.' + s1 + ' ' + s2 + ' ' + '\'%' + s3 + '%\')';
            console.log(searchword)
        }

        if (b == 'doesNotContain') {
            c1 = d;
            s1 = a;
            s2 = 'not like';
            s3 = c;
            searchword = searchword + ' ' + c1 + '(ai.' + s1 + ' ' + s2 + ' ' + '\'%' + s3 + '%\')';
        }

        if (b == 'equal') {
            c1 = d;
            s1 = a;
            s2 = '=';
            s3 = c;
            searchword = searchword + ' ' + c1 + '(ai.' + s1 + ' ' + s2 + ' ' + '\'' + s3 + '\')';

            let dataset = [];
            // console.log(searchword);

        }
    }

    client.connect();







    //method like '%'+c+'%'
    // for (i = 1; i < n; i++) {
    // searchword = searchword + ' ' + c1 + ' (' + s1 + ' ' + s2 + ' ' + '\'' + s3 + '\')';
    // console.log(searchwor}
    // console.log(JSON.parse(data));
    // console.log(data)
    // var search = req.query.describe; //screen searc bar

    // var advSearch = req.query.desctibe;// adv search bar

    // search = search.replace(/,/g, "' and lower(ai.summary) like '%");
    // var searchword = "lower(ai.summary) like '%" + search + "%'";
    // searchword = searchword.toLowerCase();



    // var date1 = '1960-01-01';
    // var date2 = '2020-12-12';
    // //date1=;date2=;
    // searchword = '(date between \'' + date1 + '\' and \'' + date2 + '\')';
    // console.log(searchword);



    // let dataset = [];
    // console.log(search);
    // client.query(
    //   "SELECT at.title,at.author,at.journal_name,at.date,at.weblink FROM article_info ai,article_table at where " +
    //   searchword +
    //   " and ai.article_id=at.article_id;",
    //   (err, res) => {
    //     if (err) throw err;
    //     for (let row of res.rows) {
    //       console.log(typeof row);
    //       console.log(JSON.stringify(row));
    //       dataset.push(row);
    //     }
    //     // client.end();
    //     response.send({
    //       dataset
    //     });
    //   }
    // );

    if (searchword === '') { searchword = '(at.date between \'' + date1 + '\' and \'' + date2 + '\')' }
    else { searchword = '(at.date between \'' + date1 + '\' and \'' + date2 + '\') and' + searchword + ')' }

    // console.log("SELECT at.title,at.author,at.journal_name,to_char(at.date,'YYYY-MM') as date,at.weblink FROM article_info ai,article_table at where " +
    //     searchword +
    //     " and ai.article_id=at.article_id;");

    searchword = "SELECT at.title,at.author,at.journal_name,to_char(at.date,'YYYY-MM') as date,at.weblink,ai.research_ques,ai.method,ai.benefit FROM article_info ai,article_table at where " +
        searchword +
        " and ai.article_id=at.article_id;";
    let dataset = [];
    let promise = new Promise((res1, rej) => {
        client.query(
            searchword,
            (err, data) => {
                if (err) throw err;
                for (let row of data.rows) {
                    // console.log(typeof row);
                    // console.log(JSON.stringify(row));
                    dataset.push(row);
                }
                client.end();
                res1(dataset);
            }
        );
    })



    let results = await promise;
//console.log(results[0]);
    return results[1];


}



module.exports = {
    advSearch: advSearch
}
// advSearch({date1: "",
// date2: "",
// method: "contains",
// operator: "and",
// type: "method",
// value: "tdd"});