const mongoose = require("mongoose");
const express = require("express");
const { restart } = require("nodemon");
const app = express();
app.use(express.json());
const connect = async () => {
  await mongoose
    .connect("mongodb://:@localhost:27017/")
    .catch((error) => console.log(error));
};
connect();
const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  email: {
    type: String,
    required: true,
  },
});
const UserModel = mongoose.model("User", user);
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
app.post("/users", async (req, res) => {
  try {
    const _user = await UserModel.create(req.body);
    return res.status(201).json(_user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndRemove(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.listen(8090, (err) => {
  if (err) {
    console.log("error");
  } else {
    console.log("running");
  }
});
