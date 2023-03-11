const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
  // `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.eqvbavg.mongodb.net/contact?retryWrites=true&w=majority`,
  `mongodb+srv://njzAdmin:MongoTest@cluster0.eqvbavg.mongodb.net/contact?retryWrites=true&w=majority`,

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

app.listen(5000, () => console.log("server is listening at port 5000"));
