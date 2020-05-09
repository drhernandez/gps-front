import ValidationUtils from "../ValidationsUtil"

describe('Validation Utils', () => {
  
  it("validateRequired", () => {

    expect(ValidationUtils.validateRequired(null)).toBe(false);
    expect(ValidationUtils.validateRequired(undefined)).toBe(false);
    expect(ValidationUtils.validateRequired([])).toBe(false);
    expect(ValidationUtils.validateRequired('a')).toBe(true);
    expect(ValidationUtils.validateRequired(['a'])).toBe(true);
  });

  it("validateNumber", () => {

    expect(ValidationUtils.validateNumber(null)).toBe(false);
    expect(ValidationUtils.validateNumber(undefined)).toBe(false);
    expect(ValidationUtils.validateNumber('a')).toBe(false);
    expect(ValidationUtils.validateNumber(1)).toBe(true);
  });
  
  it("validateEmail", () => {

    expect(ValidationUtils.validateEmail(null)).toBe(false);
    expect(ValidationUtils.validateEmail(undefined)).toBe(false);
    expect(ValidationUtils.validateEmail('a')).toBe(false);
    expect(ValidationUtils.validateEmail('test@test')).toBe(false);
    expect(ValidationUtils.validateEmail('test@test.com')).toBe(true);
  });
  
  it("validateEquals", () => {

    expect(ValidationUtils.validateEquals(null, undefined)).toBe(false);
    expect(ValidationUtils.validateEquals(1, '1')).toBe(false);
    expect(ValidationUtils.validateEquals(1, 1)).toBe(true);
  });

  it("validatePassword", () => {
    debugger
    const passwordLvl1 = 'password';
    const passwordLvl2 = 'Password1';
    const passwordLvl3 = 'Password.1'

    expect(ValidationUtils.validatePassword(passwordLvl1, ValidationUtils.passwordStrenghts.PASSWORD_STRENGHT_1)).toBe(true);
    expect(ValidationUtils.validatePassword(passwordLvl1, ValidationUtils.passwordStrenghts.PASSWORD_STRENGHT_2)).toBe(false);
    expect(ValidationUtils.validatePassword(passwordLvl1, ValidationUtils.passwordStrenghts.PASSWORD_STRENGHT_3)).toBe(false);

    expect(ValidationUtils.validatePassword(passwordLvl2, ValidationUtils.passwordStrenghts.PASSWORD_STRENGHT_1)).toBe(true);
    expect(ValidationUtils.validatePassword(passwordLvl2, ValidationUtils.passwordStrenghts.PASSWORD_STRENGHT_2)).toBe(true);
    expect(ValidationUtils.validatePassword(passwordLvl2, ValidationUtils.passwordStrenghts.PASSWORD_STRENGHT_3)).toBe(false);

    expect(ValidationUtils.validatePassword(passwordLvl3, ValidationUtils.passwordStrenghts.PASSWORD_STRENGHT_1)).toBe(true);
    expect(ValidationUtils.validatePassword(passwordLvl3, ValidationUtils.passwordStrenghts.PASSWORD_STRENGHT_2)).toBe(true);
    expect(ValidationUtils.validatePassword(passwordLvl3, ValidationUtils.passwordStrenghts.PASSWORD_STRENGHT_3)).toBe(true);

    expect(ValidationUtils.validatePassword(passwordLvl1)).toBe(false);
    expect(ValidationUtils.validatePassword(passwordLvl2)).toBe(true);
    expect(ValidationUtils.validatePassword(passwordLvl3)).toBe(true);
  });
});