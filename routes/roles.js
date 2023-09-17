const express = require("express");

const {createNewRole} = require("../controllers/roles")
// Create roles router
const roleRouter = express.Router();
roleRouter.post("/",createNewRole);

module.exports = roleRouter;


