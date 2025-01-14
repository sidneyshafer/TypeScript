// --------------------------------------- //
//    SECTION 2 - UNKNOWN & NEVER TYPES    //
// --------------------------------------- //

let userName: string;

// Unknown Type
//let userInput: any;
let userInput: unknown;

userInput = 5;
userInput = 'Sidney';
//userName = userInput; // error

if(typeof userInput === 'string') {
    userName = userInput;
}

// Never Type (void is typically assumed as the return type)
function generateError(message: string, code: number): never {
    throw { message: message, errorCode: code };
}

generateError('An error occurred!', 500);