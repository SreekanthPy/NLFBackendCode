const { Pool } = require('pg');
require('dotenv').config();
// const fs = require('fs');
// // Replace the URL with your ElephantSQL database URL
// //const connectionString = 'postgres://imfhhxyp:1gBfqjymgT1l1pHd8roawKbljUrAMmtn@tiny.db.elephantsql.com:5432/imfhhxyp';


// const pool = new Pool({
//   connectionString: connectionString,
//   ssl: {
//          rejectUnauthorized: false,  // Allow self-signed certificates
//        },
// });

// // Test the connection by running a simple query
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Connection error:', err.stack);
//   } else {
//     console.log('Connected to the database:', res.rows[0]);
//   }
//   // Don't forget to end the pool connection after you're done
//   pool.end();
// });

// module.exports = pool;


// Connection string and SSL configuration
const pool = new Pool({
 user: process.env.USER,
 password: process.env.PASSWORD,
 database: process.env.DATABASE,
 host: process.env.HOST,
 port: 20362,
 ssl: {
   rejectUnauthorized: false,  // Allow self-signed certificates
 },
});

// Query the database
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Connection error:', err.stack);
//   } else {
//     //Add table 
   
//     console.log('Connected to the database:', res.rows[0]);
//   }
//   // Don't forget to close the pool after you're done
//   pool.end();
// });


module.exports = pool;
