const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const contactsModel = require("./model/contacts");
const { ObjectId } = require("bson");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const arr = ["firstName", "lastName", "phone", "email"];
app.get("/v1/contacts", async (req, res) => {
  //   console.log(users);
  try {
    let users = await contactsModel.find();
    return res.status(200).json({
      status: "ok",
      users,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
});

app.post("/v1/contacts", async (req, res) => {
  let dataReceived = req.body;
  let missingFields = [];

  arr.forEach((key) => {
    if (dataReceived[key] === undefined) {
      missingFields.push(key);
    }
  });

  console.log(missingFields);
  if (missingFields.length !== 0) {
    return res.status(400).json({
      error: `Missing required field(s): ${missingFields}`,
    });
  }
  try {
    let users = await contactsModel.find({ email: dataReceived.email });

    if (users.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: "data is already stored",
      });
    }
    let newUser = await contactsModel.create(dataReceived);

    return res.status(201).json({
      status: "success",
      newUser,
    });
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      message: "There is no contact with that id",
      errmessage: err.message,
    });
  }
});

app.get("/v1/contacts/:id", async (req, res) => {
  let _id = req.params;
  //   console.log("ObjectId(" + id + ")");
  console.log(_id);

  try {
    // let user = await contactsModel.find({ _id: `ObjectId(${id})` });
    let user = await contactsModel.find({ _id: new ObjectId(_id) });
    console.log(user);
    if (user.length > 0) {
      return res.status(200).json({
        status: "success",
        user,
      });
    } else {
      return res.status(404).json({
        status: "failed",
        message: "There is no contact with that id",
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      message: "There is no contact with that id",
      errmessage: err.message,
    });
  }
});

app.delete("/v1/contacts/:id", async (req, res) => {
  let id = req.params;

  console.log(id);
  try {
    let user = await contactsModel.deleteOne({ _id: new ObjectId(id) });
    console.log(user);
    return res.status(204).json({
      status: "ok",
    });
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      message: "There is no contact with that id",
      errmessage: err.message,
    });
  }
});

app.put("/v1/contacts/:id", async (req, res) => {
  let id = req.params;
  let data = req.body;

  console.log(id);
  console.log(data);
  try {
    let user = await contactsModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    console.log(user);
    return res.status(204).json({
      status: "success",
    });
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      message: "There is no contact with that id",
      errmessage: err.message,
    });
  }
});

app.patch("/v1/contacts/:id", async (req, res) => {
  let id = req.params;
  let data = req.body;

  console.log(id);
  // console.log(data);
  try {
    let user = await contactsModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    console.log(user);
    return res.status(204).json({
      status: "success",
    });
  } catch (err) {
    return res.status(404).json({
      status: "failed",
      message: "There is no contact with that id",
      errmessage: err.message,
    });
  }
});
module.exports = app;
