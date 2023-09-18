const express = require("express");
const articleRouter = express.Router();
const authentication = require("../middleware/authentication");

// Import articles controllers
const { createNewArticle,getAllArticles } = require("../controllers/articles");
articleRouter.post("/", authentication, createNewArticle);
articleRouter.get("/", authentication, getAllArticles);

module.exports = articleRouter;

/*
 * Testing Objects:
 * Article: 
 {
    "title":"Hello World",
    "description":"This is for testing",
}
*/
