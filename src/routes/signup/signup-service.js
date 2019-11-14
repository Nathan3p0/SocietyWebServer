const xss = require('xss');
const bcrypt = require('bcryptjs');
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&])[\S]+/;

const signupServices = {
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
    },
    hasUserWithUsername(knex, username) {
        return knex('members')
            .where({ username })
            .first()
            .then(user => !!user);
    },
    hasGroupWithGroupName(knex, group_name) {
        return knex('groups')
            .where({ group_name })
            .first()
            .then(group => !!group);
    },
    findGroupIdByCode(knex, code) {
        return knex('groups')
            .where({ code })
            .first()
    },
    hashPassword(password) {
        return bcrypt.hash(password, 10);
    },
    insertMember(knex, newMember) {
        return knex('members')
            .insert(newMember)
            .returning('*')
            .then(([user]) => {
                return user;
            });
    },
    insertGroup(knex, newGroup) {
        return knex('groups')
            .insert(newGroup)
            .returning('*')
            .then(([group]) => {
                return group;
            });
    },
    serializeMember(member) {
        return {
            id: member.id,
            full_name: xss(member.full_name),
            username: xss(member.username)
        }
    }
}

module.exports = signupServices;