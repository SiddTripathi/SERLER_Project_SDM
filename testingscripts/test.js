import { isPatternLike } from "@babel/types";

var date1 = '1960-01-01';
var date2 = '2020-12-12';
searchword = '(date between \'' + date1 + '\' and \'' + date2 + '\')';
console.log(searchword);

<<<<<<< HEAD
// var a = ['method', 'participants'];
// var b = ['contains', 'equals to'];
// c = 'tdd';
// d = 'and';
// n = 3;
for (i = 1; i < n; i++) {
    searchword = searchword + ' ' + d + ' (' + a[i - 1] + ' ' + b[i - 1] + ' ' + '\'' + c + '\')';
    console.log(searchword);
=======
var a = 'method';
var b = 'contains';
c = 'tdd';
d = 'and';
n = 3;

if(b=='contains') 
{c1=d;
    s1=a;
s2= 'like';
s3=c;
searchword = searchword + ' ' + c1 + ' (' + s1 + ' ' + s2 + ' ' + '\'%' + s3 + '%\')';
console.log(searchword)
}

if (b='does not contain'){


>>>>>>> 50fc7b1230a2e4bba85442d66235caaa43e27729
}







//method like '%'+c+'%'
// for (i = 1; i < n; i++) {
    searchword = searchword + ' ' + c1 + ' (' + s1 + ' ' + s2 + ' ' + '\'' + s3 + '\')';
    console.log(searchword);

