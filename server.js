const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  // console.log(err.name, err.message);
  console.log(err);
  console.log('UNHANDLED EXCEPTION!💥 SHUTTING DOWN');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 10000;
const server = app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION!💥 SHUTTING DOWN');
  server.close(() => {
    process.exit(1);
  });
});
