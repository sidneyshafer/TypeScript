// --------------------------------------- //
// SECTION 2 - TYPESCRIPT UNION & ALIASES  //
// --------------------------------------- //
function combine(input1, input2, resultConversion // Literal Types
) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
    // if(resultConversion === 'as-number') {
    //     return +result;
    // } else {
    //     return result.toString();
    // }
}
var combinedAges = combine(25, 20, 'as-number');
var combinedStringAges = combine('25', '20', 'as-number');
var combinedNames = combine('Sidney', 'Shafer', 'as-string');
console.log(combinedAges);
console.log(combinedStringAges);
console.log(combinedNames);
