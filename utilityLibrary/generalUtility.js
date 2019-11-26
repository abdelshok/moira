// File that will hold general utility functions that will be used throughout the application


// Checks whether the argument passed to it 
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Validates if the string passed has a valid email format ie. 'xxx@yyy.zzz'
// Parameter:
// email (string)
// Returns:
// boolean --> whether the string passed has a proper email format 
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {
    isNumeric, 
    validateEmail,
}