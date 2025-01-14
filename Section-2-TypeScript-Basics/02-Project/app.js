// ----------------------------- //
// SECTION 2 - TYPESCRIPT BASICS //
// ----------------------------- //
// USING TYPES
function add(n1, n2, showResult, resultPhrase) {
    //console.log(typeof n1);
    /*if(typeof n1 !== 'number' || typeof n2 !== 'number') {
        throw new Error('Incorrect input!');
    }*/
    var result = n1 + n2;
    if (showResult) {
        console.log(resultPhrase + result);
    }
    else {
        return result;
    }
}
var number1 = 5;
var number2 = 2.8;
var showResult = true;
var phrase = 'Result is: ';
var result = add(number1, number2, showResult, phrase);
//console.log(result);
