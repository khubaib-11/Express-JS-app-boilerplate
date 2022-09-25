const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

const app = require('./app');

//! Handling Uncaught Rejections
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception ⚠️ ');
  console.log(`Shutting down because of ${err.name} ---> ${err.message} \n`);
  console.log(`Error stack: \n`);
  console.log(`${err.stack} \n`);
  process.exit(1);
});

// ! Switching & Connecting Databases according to environment-

let DB;

if (process.env.NODE_ENV === 'development') {
  DB = process.env.DEVELOPMENT_DB.replace(
    '<PASSWORD>',
    process.env.DEVELOPMENT_DB_PASSWORD
  );
} else if (process.env.NODE_ENV === 'production') {
  DB = process.env.PRODUCTION_DB.replace(
    '<PASSWORD>',
    process.env.PRODUCTION_DB_PASSWORD
  );
}

console.log(`\n ✅ You are in {${process.env.NODE_ENV}} environment ✅`);

mongoose.connect(DB).then(console.log(`DB connection successful ☑️`));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Server started 👋👋👋 ... \n');
});

//! Handling Unhandled promise rejections

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Promise Rejection ⚠️ ');
  console.log(`Shutting down because of ${err.name} ---> ${err.message} \n`);
  // Closing server after finishing all requests
  server.close(() => {
    process.exit(1);
  });
});
