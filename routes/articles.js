const express = require("express");
const articleRouter = express.Router();
const authentication = require("../middleware/authentication");

// Import articles controllers
const { createNewArticle,getAllArticles,getArticlesByAuthor,getArticleById } = require("../controllers/articles");
articleRouter.post("/", authentication, createNewArticle);
articleRouter.get("/", authentication, getAllArticles);
articleRouter.get("/search_1", authentication, getArticlesByAuthor);
articleRouter.get("/search_2/:id", authentication, getArticleById);

module.exports = articleRouter;

/*
 * Testing Objects:
 * Article: 
 {
    "title":"Hello World",
    "description":"This is for testing",
}
*/
