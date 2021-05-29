const { randomBytes, pbkdf2Sync } = require('crypto');
const Constants = require('../src/constants.js');

function encrypt(password) {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    return { salt, hash };
}

exports.seed = function (knex) {
    return knex('accounts').del()
        .then(function () {
            return knex('accounts').insert({
                email: 'admin@example.com',
                status: Constants.ACCOUNT_STATUS.ACTIVE,
                role: Constants.ACCOUNT_ROLE.DEVELOPER,
                subscription: Constants.ACCOUNT_SUBSCRIPTION.DEVELOPER,
                firstName: 'FIRST_NAME',
                lastName: 'LAST_NAME',
                primaryPhoneNumber: 'PRIMARY_PHONE_NUMBER',
                secondaryPhoneNumber: 'SECONDARY_PHONE_NUMBER',
                address1: 'ADDRESS_1',
                address2: 'ADDRESS_2',
                city: 'CITY',
                state: 'STATE',
                postalCode: 'POSTAL_CODE',
                apiRoute: 'admin',
                ...encrypt('admin')
            });
        });
};
