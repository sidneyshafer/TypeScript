// --------------------------------------- //
// SECTION 2 - TYPESCRIPT FUNCTION TYPES   //
// --------------------------------------- //
// Function return types
function addNum(n1, n2) {
    return n1 + n2;
}
// Void - function does not return anything
function printResult(num) {
    console.log('Result: ' + num);
}
// Callback
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
printResult(addNum(5, 12));
// let someValue: undefined;
// Function as type
//let combineValues: Function;
var combineValues;
combineValues = addNum;
//combineValues = printResult;
console.log(combineValues(8, 8));
addAndHandle(10, 20, function (result) {
    console.log(result);
});
