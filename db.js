const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'den1042',
    host: 'localhost',
    port: 5432,
    database: 'biocad'
});


module.exports = pool; 