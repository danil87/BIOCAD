const postgres = require('postgres');
const URL = `postgres://danil87:WHQu2MLqND1T@ep-muddy-frog-103045.us-east-2.aws.neon.tech/neondb`;

module.exports = postgres(URL, { ssl: 'require' }); 