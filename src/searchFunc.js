
function basicSearch(search){

    
    search = 'tdd'
    search = search.replace(/,/g, "' and lower(ai.summary) like '%");
    var searchword = "lower(ai.summary) like '%" + search + "%'";
    //searchword = searchword+" or (lower(at.title) like '%"+search+"%')"; 
    searchword = searchword.toLowerCase();
    // console.log(searchword);




    const { Client } = require("pg");
    const client = new Client({
        user: "wnuvnkgceokgvn",
        password: "2645ef631e8c9100a4a82d71ae79f9213e8389c68f257994798ed7faa04515a3",
        host: "ec2-107-20-251-130.compute-1.amazonaws.com",
        port: 5432,
        database: "d5j9t6vspri53v",
        ssl: true
    });


    client.connect().then(() => console.log("connected"));

    let dataset = [];
    // console.log(search);
    client.query(
        "SELECT at.title,at.author,at.journal_name,to_char(at.date,'YYYY-MM') as date,at.weblink,ai.research_ques,ai.method FROM article_info ai,article_table at where (" +
        searchword +
        ") and ai.article_id=at.article_id and (at.date between '"+ date1 +"' and '" + date2 + "');",
        (err, res) => {
          if (err) throw err;
          for (let row of res.rows) {
            console.log(typeof row);
            console.log(JSON.stringify(row));
            dataset.push(row);
          }
      
client.end();
console.log(dataset[0].title);return dataset;});}

   

module.exports={basicSearch:basicSearch
}
