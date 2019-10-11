import { isPatternLike } from "@babel/types";

var date1 = '1960-01-01';
var date2 = '2020-12-12';
searchword = '(date between \'' + date1 + '\' and \'' + date2 + '\')';
console.log(searchword);

var a = 'method';
var b = 'contains';
c = 'tdd';
d = 'and';
n = 3;

if (b == 'contains') {
    c1 = d;
    s1 = a;
    s2 = 'like';
    s3 = c;
    searchword = searchword + ' ' + c1 + ' (' + s1 + ' ' + s2 + ' ' + '\'%' + s3 + '%\')';
    console.log(searchword)
}

if (b = 'does not contain') {


}







//method like '%'+c+'%'
// for (i = 1; i < n; i++) {
searchword = searchword + ' ' + c1 + ' (' + s1 + ' ' + s2 + ' ' + '\'' + s3 + '\')';
console.log(searchword);

