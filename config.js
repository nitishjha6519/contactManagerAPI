const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://njzAdmin:MongoTest@cluster0.eqvbavg.mongodb.net/contact?retryWrites=true&w=majority",
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected to DB");
    }
  }
);

// //To handle errors after initial connection was established,
// mongoose.connection.on("error", (err) => {
//   if (err) {
//     console.log(" err after connection " + err);
//   } else {
//     console.log("connected to db");
//   }
// });
