const mongoose = require('mongoose');
const MONGOGB_URL = process.env.MONGOGB_URL || 'mongodb://localhost/todo-list'
mongoose.connect(MONGOGB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
});
const db = mongoose.connection;

db.on('error', (e) => {
  console.log(error);
});

db.once('open', () => {
  console.log('mogodb connect successfully');
});