
var date1 = '1960-01-01';
var date2 = '2020-12-12';
searchword = '(date between \'' + date1 + '\' and \'' + date2 + '\')';
console.log(searchword);

var a = ['method', 'participants'];
var b = ['contains', 'equals to'];
c = 'tdd';
d = 'and';
n = 3;
for (i = 1; i < n; i++) {
    searchword = searchword + ' ' + d + ' (' + a[i - 1] + ' ' + b[i - 1] + ' ' + '\'' + c + '\')';
    console.log(searchword);
}
