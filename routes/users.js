const express = require("express");

const userRouter = express.Router();
// Import users controllers
const {register} =require("../controllers/users")
userRouter.post("/register",register)


module.exports = userRouter;


/*
 * Testing Object:
{
  "firstName": "Sara",
  "lastName": "Ahmad",
  "age": 29,
  "country": "Jordan",
  "email":"sara.alahmad@gmai.com",
  "password": "123456",
  "role":"1"
}
*/


