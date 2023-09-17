
// This function creates (new user)
const {pool} = require("../models/db")
const bcrypt = require("bcrypt");

const register =async (req, res) => {
 try {
  const { firstName,lastName,age,country,email,password,role_id} = req.body;
  const result = await bcrypt.hash(password, 5);
  const query = `INSERT INTO users (firstName,lastName,age,country,email,password,role_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING firstName, age, email`;
  const values = [firstName,lastName,age,country,email,result,role_id];
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
  res.status(409).json({
    success: false,
    message: "The email already exists",
    error: error.message,
  });
}
};



const login = (req, res) => {
   
  };
  

module.exports = {
  register
};
