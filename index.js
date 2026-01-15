const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require("cors");
const path = require("path");
const port = 3001;
const save_user_login = require('./router/user_login_router');
const helmet = require("helmet");
const pool=require('./db')

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req);
  next();
});

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "20mb" }));
app.use(
  express.urlencoded({ extended: true, limit: "20mb", parameterLimit: "5000" })
);

app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM user_login');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/', async (req, res) => {
  try {

//     let reslut;
//  reslut=await pool.query('select * from user_login_hdr order by 1 desc')

 
    await pool.query(`CREATE TABLE user_login_hdr (
  id SERIAL PRIMARY KEY,      -- Auto-incrementing unique ID for each user
  name VARCHAR(100) NOT NULL, -- Name column, cannot be null
  email VARCHAR(100) NOT NULL UNIQUE, -- Email column, unique constraint to prevent duplicates
  phone VARCHAR(15),          -- Phone number column
  password VARCHAR(255) NOT NULL -- Password column, should be hashed and salted in practice
);
`)

 reslut=await pool.query(`CREATE TABLE study_form_hdr (
  id SERIAL PRIMARY KEY,  -- Auto-incrementing ID for each row
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  readinformation JSONB[],  -- This column stores an array of JSONB objects
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`)
pool.query(`ALTER TABLE study_form_hdr
ADD COLUMN createddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN modifieddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
`)
    res.json('hello');
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/api', save_user_login);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



//module.exports.handler = serverless(app);