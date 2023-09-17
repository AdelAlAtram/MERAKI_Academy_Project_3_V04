const express = require("express");
const articleRouter = express.Router();
const authentication = require("../middleware/authentication")

// Import articles controllers
const {createNewArticle} = require("../controllers/articles");
articleRouter.get("/",authentication, createNewArticle);


module.exports = articleRouter;









/*
 * Testing Objects:
 * Article: 
 {
    "title":"Hello World",
    "description":"This is for testing",
}
*/
