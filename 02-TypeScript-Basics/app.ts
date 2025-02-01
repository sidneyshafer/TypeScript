// ----------------------------- //
// SECTION 2 - TYPESCRIPT BASICS //
// ----------------------------- //

// USING TYPES
function add(n1: number, n2: number, showResult: boolean, resultPhrase: string) {
    //console.log(typeof n1);
    /*if(typeof n1 !== 'number' || typeof n2 !== 'number') {
        throw new Error('Incorrect input!');
    }*/
   let result = n1 + n2;
   if(showResult) {
        console.log(resultPhrase + result);
   } else {
        return result;
   }
}

// Type Inference
const number1 = 5;
const number2 = 2.8;
let showResult = true;
let phrase = 'Result is: ';

// Type Assignment
let number3: number;
number3 = 7;

const result = add(number1, number2, showResult, phrase);
//console.log(result);