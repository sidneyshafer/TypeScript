export interface Validate {
    value?: string | number;
    required?: boolean;
    minLength?: number
    maxLength?: number;
    min?: number;
    max?: number;
}

export function validate(validateInput: Validate): [boolean, string] {
    let isValid = true;
    let errorStr = '';

    if (validateInput.required) {
        isValid = isValid && validateInput.value?.toString().trim().length !== 0;
        if(!isValid) {
            errorStr = 'Required field'
        }
    }
    if (validateInput.minLength != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length > validateInput.minLength;
        if(!isValid) {
            errorStr = 'Character length must be greater than ' + validateInput.minLength;
        }
    }
    if (validateInput.maxLength != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length < validateInput.maxLength;
        if(!isValid) {
            errorStr = 'Character length must be less than ' + validateInput.maxLength;
        }
    }
    if (validateInput.min != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value > validateInput.min;
        if(!isValid) {
            errorStr = 'Values must be greater than ' + validateInput.min;
        }
    }
    if (validateInput.max != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value < validateInput.max;
        if(!isValid) {
            errorStr = 'Values must be less than ' + validateInput.max;
        }
    }
    return [isValid, errorStr];
}