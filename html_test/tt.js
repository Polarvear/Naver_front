let a = 'a';
var b = 'b';


if (true) {
    a = 'c';
    console.log('let A:::', a);
    b = 'd';
    console.log('let B::::', b);
}

console.log(b); // d
console.log(a);// a