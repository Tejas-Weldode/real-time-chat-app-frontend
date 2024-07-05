const validateEmail = (email) => {
    // Define the regular expression for validating an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Test the email against the regular expression
    return emailRegex.test(email);
};

export default validateEmail;
