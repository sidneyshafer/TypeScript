// --------------------------------------- //
// SECTION 2 - TYPESCRIPT UNION & ALIASES  //
// --------------------------------------- //

// Type Aliases / Custom Types
type NumberString = number | string; // Union Types - use the | operator
type ResultConversion = 'as-number' | 'as-string';

function combine(
    input1: NumberString,
    input2: NumberString,
    resultConversion: ResultConversion // Literal Types
) {
    let result: NumberString;
    
    if(typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
    // if(resultConversion === 'as-number') {
    //     return +result;
    // } else {
    //     return result.toString();
    // }
}

const combinedAges = combine(25, 20, 'as-number');
const combinedStringAges = combine('25', '20', 'as-number');
const combinedNames = combine('Sidney', 'Shafer', 'as-string');

console.log(combinedAges);
console.log(combinedStringAges);
console.log(combinedNames);