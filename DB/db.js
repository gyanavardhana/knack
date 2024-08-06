const mongoose = require('mongoose');
try {
    mongoose.connect(process.env.MONGO_URI, {})
        .then(() => console.log("connected to database"));
}
catch (err) {
    console.log(err);
}