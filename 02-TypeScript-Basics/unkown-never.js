// --------------------------------------- //
//    SECTION 2 - UNKNOWN & NEVER TYPES    //
// --------------------------------------- //
var userName;
// Unknown Type
//let userInput: any;
var userInput;
userInput = 5;
userInput = 'Sidney';
//userName = userInput; // error
if (typeof userInput === 'string') {
    userName = userInput;
}
// Never Type (void is typically assumed as the return type)
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError('An error occurred!', 500);
