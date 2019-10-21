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
// let str=`@inproceedings{park2009periocular,
//   title={Periocular biometrics in the visible spectrum: A feasibility study},
//   author={Park, Unsang and Ross, Arun and Jain, Anil K},
//   booktitle={2009 IEEE 3rd International Conference on Biometrics: Theory, Applications, and Systems},
//   pages={1--6},
//   year={2009},
//   organization={IEEE}
// }
//   }`      
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
if(title==undefined){title=null;}
if(author==undefined){author=null}
if(journal==undefined){journal=null}
if(page==undefined){page=null}
if(issue==undefined){issue=null}
if(date==undefined){date=null}
if(volume==undefined){volume=null}
 console.log("insert into article_table (org_article_id,title,author,journal_name,volume,number,page,date,weblink) values(nextval('org_article_id_seq'),'"+title+"','"+author+"','"+journal+"',"+volume+","+issue+",'"+page+"','"+date+"-01-01',null)");