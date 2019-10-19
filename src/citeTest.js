const Cite = require('citation-js')
// let example = new Cite(@article{johnston1979origins,
//     title={Origins of avian ocular and periocular tissues},
//     author={Johnston, MC and Noden, DM and Hazelton, RD and Coulombre, JL and Coulombre, AJ},
//     journal={Experimental eye research},
//     volume={29},
//     number={1},
//     pages={27--43},
//     year={1979},
//     publisher={Elsevier}
//   })
let str=`@article{liu2017ocular,
    title={Ocular recognition for blinking eyes},
    author={Liu, Peizhong and Guo, Jing-Ming and Tseng, Szu-Han and Wong, KokSheik and Lee, Jiann-Der and Yao, Chen-Chieh and Zhu, Daxin},
    journal={IEEE Transactions on Image Processing},
    volume={26},
    number={10},
    pages={5070--5081},
    year={2017},
    publisher={IEEE}
  }`      
example= new Cite(str);
let output = example.format('bibliography', {
  template: 'apa',
  lang: 'en-US'
})

console.log(example)

let title =example.data[0].title;console.log(title);
let i=0;
let author='';
 while(example.data[0].author[i])
 {if(i>0){author=author+' , '}
     author=author+example.data[0].author[i].given+'.'+example.data[0].author[i].family;
    i++;}
     console.log(example.data[0].page);
     let page=example.data[0].page;
     let volume=example.data[0].volume;console.log(example.data[0].volume);
     let issue=example.data[0].issue;
     let journal =example.data[0].publisher;console.log(example.data[0].publisher);
date=example.data[0].issued['date-parts'][0][0]
     
// let title=example.data[0].title;console.log(title);


 console.log("insert into article_table (org_article_id,title,author,journal_name,volume,number,page,date,org_article_id) values(org_article_id_seq,'"+title+"','"+author+"','"+journal+"',"+volume+","+issue+",'"+page+"','"+date+"')");