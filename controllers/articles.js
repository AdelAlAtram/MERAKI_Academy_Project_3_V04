const { pool } = require("../models/db");

const createNewArticle = async (req, res) => {
  try {
    const author_id = req.token.userId;
    console.log(req.token);
    const { title, description } = req.body;

    const query = `INSERT INTO articles (title, description,author_id) VALUES ($1, $2,$3) RETURNING *`;
    const values = [title, description, author_id];
    const response = await pool.query(query, values);

    if (response.rowCount) {
      res.status(201).json({
        success: true,
        message: "user created successfully",
        response: response.rows,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// headers: {
//   authorization: `Bearer ${token}`,
// }

// This function returns the articles
const getAllArticles = (req, res) => {
  pool
    .query("SELECT * FROM articles;")
    .then((result) => {
      res.json({
        success: true,
        message: "All the articles",
        articles: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

//This function returns articles by author
const getArticlesByAuthor = (req, res) => {
  const { author } = req.query;

  pool
    .query(`SELECT * FROM articles WHERE author_id=${author}`)
    .then((result) => {
      if (!result) {
        res.json({
          success: false,
          message: `The author: ${author} has no articles`,
        });
      }
console.log(result.rows);
      res.json({
        success: true,
        message: `All articles for the author: ${author}`,
        articles: result.rows,
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};

// This function returns article by its id
const getArticleById = (req, res) => {
  const { id } = req.params;
  pool
    .query(`SELECT * FROM articles WHERE id=${id}`)
    .then((result) => {
      if (!result) {
        res.json({
          success: false,
          message: `The author: ${id} has no articles`,
        });
      }

   else{
    res.json({
      success: true,
      message: `All articles for the author: ${id}`,
      articles: result.rows
    });
   }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });

};

// This function updates article by its id
const updateArticleById = (req, res) => {};

// This function deletes a specific article by its id
const deleteArticleById = (req, res) => {};

// This function deletes all the articles for a specific author
const deleteArticlesByAuthor = (req, res) => {};

module.exports = {
  createNewArticle,
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
