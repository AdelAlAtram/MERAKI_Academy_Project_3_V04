const {pool} = require("../models/db")


const createNewArticle = async(req, res) => {
  
  try {
    const author_id = req.token.userId
    console.log(author_id);
  const { title, description} = req.body;
  
  const query = `INSERT INTO articles (title, description,author_id) VALUES ($1, $2,$3) RETURNING *`;
  const values = [title, description,author_id];
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
  pool.query("SELECT * FROM articles;")
  .then((result)=>{
    res.json({
      success: true,
      message: "All the articles",
      articles: result
    })
})
.catch((err)=>{
  res.status(500).json({
    success: false,
    message: "Server error",
    err: err
  });
})
};

//This function returns articles by author
const getArticlesByAuthor = (req, res) => {
 
};

// This function returns article by its id
const getArticleById = (req, res) => {
 
};

// This function updates article by its id
const updateArticleById = (req, res) => {
 
};

// This function deletes a specific article by its id
const deleteArticleById = (req, res) => {
 
};

// This function deletes all the articles for a specific author
const deleteArticlesByAuthor = (req, res) => {
 
};

module.exports = {
  createNewArticle,
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
