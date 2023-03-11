const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let password = process.env.PASSWORD;
let username = process.env.MongoUser;
console.log(password, username);
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.eqvbavg.mongodb.net/contact?retryWrites=true&w=majority`,

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
