const express = require("express");
const UserController = require("../controller/UserController");
const route = express.Router();

//user controller
route.get("/getalluser", UserController.getalluser);
route.post("/userInsert", UserController.userInsert);

module.exports = route;
