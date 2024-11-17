export const normalizeValidator = (val: string) =>
    validate(val) ||
    "*Proibido o uso dos seguintes caracteres [!@#$%*()_+=-?°``''~©,.;<>:].";

function validate(val: string) {
    const regex = /[!@#$%*()_+=-?°``''~©,.;<>:]/g;

    return !regex.test(val);
}
