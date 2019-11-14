const xss = require('xss');
const bcrypt = require('bcryptjs');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const signupService = {
    validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be longer than 8 characters.';
        }

        if (password.length > 72) {
            return 'Password must be less than 72 characters';
        }

        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }

        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return 'Paswword must contain 1 upper case, number and special character'
        }
        return null
    }
}

