const validatePassword = (password) => {
    // The password should be from 4 to 32 characters long.
    console.log(password.length);
    return password != null && 4 <= password.length && password.length <= 32;
};

export default validatePassword;
