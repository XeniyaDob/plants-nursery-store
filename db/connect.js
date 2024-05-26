const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(
    url
    //{
    // useNewUrlParser: true,---> DEPRECATED
    // useCreateIndex: true,---> REMOVED because of error
    // useFindAndModify: false,---> REMOVED because of error
    //useUnifiedTopology: true,---> DEPRECATED
    //}
  );
};

module.exports = connectDB;
