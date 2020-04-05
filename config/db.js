const mongoose = require('mongoose');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose connect
mongoose.connect
('mongodb+srv://Kris:Kris@pusherpoll-pkpm7.mongodb.net/test?retryWrites=true&w=majorityCopy')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));