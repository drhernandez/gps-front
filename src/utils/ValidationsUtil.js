import { isNullOrUndefined } from "util";

const MIN_LENGHT = "(?=.{8,})";
const HAVE_UPPERCASE = "(?=.*[A-Z])";
const HAVE_NUMERIC = "(?=.*[0-9])";
const HAVE_SPECIAL_CHARACTERS = "(?=.[!@#\$%\^&])";

const PASSWORD_STRENGHT_1 = [MIN_LENGHT];
const PASSWORD_STRENGHT_2 = PASSWORD_STRENGHT_1.concat(HAVE_NUMERIC, HAVE_UPPERCASE);
const PASSWORD_STRENGHT_3 = PASSWORD_STRENGHT_2.concat(HAVE_SPECIAL_CHARACTERS);

function validateRequired(value) {
  return !isNullOrUndefined(value) && value.length > 0;
};

function validateNumber(value) {
  return !isNaN(value);
}

function validateEmail(value) {
  // return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+$/.test(value);
}

function validateEquals(value1, value2) {
  return value1 === value2
}

function validatePassword(value, passwordStrenght) {
  const validations = passwordStrenght === undefined ? PASSWORD_STRENGHT_2 : passwordStrenght;
  let isValid = value !== undefined;
  validations.forEach(element => {
    isValid &= new RegExp(element).test(value);  
  });
  return isValid;
}

export default {
  passwordStrenghts: {
    PASSWORD_STRENGHT_1, PASSWORD_STRENGHT_2, PASSWORD_STRENGHT_3
  },
  validateRequired,
  validateNumber,
  validateEmail, 
  validateEquals,
  validatePassword
}