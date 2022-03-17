import validator from "validator";

export const isSpecialCharsThere = (data: string) => {
    return validator.matches(data, /[^A-Za-z0-9]+/);
};
export const isValidLength = (data: string, min?: number, max?: number) => {
    return validator.isLength(data, {
        min: min ?? 2,
        max: max ?? 10,
    });
};

export const isValidEmail = (data: string) => {
    return validator.isEmail(data);
};

export const isFieldEmpty = (data: string) => {
    return validator.isEmpty(data);
};

export const isValidPassword = (data: string) => {
    const lowerCaseLetterPresent = validator.matches(data, /(?=.*[a-z])/);
    const upperCaseLetterPresent = validator.matches(data, /(?=.*[A-Z])/);
    const numberPresent = validator.matches(data, /(?=.*\d)/);
    const specialLetterPresent = validator.matches(data, /(?=.*\W)/);
    const validLength = isValidLength(data, 8, 10);

    return [
        lowerCaseLetterPresent,
        upperCaseLetterPresent,
        numberPresent,
        specialLetterPresent,
        validLength,
    ];
};
