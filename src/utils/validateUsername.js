const validateUsername = (username) => {
    // The username should not be more than 20 characters long.
    return username != null && username.length <= 20;
};

export default validateUsername;
