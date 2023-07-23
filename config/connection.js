const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/usersDB';

connect(connectionString)
.then(() => {
    console.log('Connected successfully to MongoDB');
})
.catch((err) => {
  console.error('Mongo connection error: ', err.message);
});


module.exports = connection;