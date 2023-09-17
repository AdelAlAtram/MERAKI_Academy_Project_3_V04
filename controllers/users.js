
const jwt = require("jsonwebtoken");

// getting environment variables
const SECRET = process.env.SECRET;

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


const login =async (req, res) => {

  try {
    const {email,password} = req.body;
    const query = `SELECT * FROM users WHERE email = $1;`;
    const value = [email]
    const response = await pool.query(query,value);
    
    // console.log(response);
    if (response.rows.length) {
      const result = await bcrypt.compare(password, response.rows[0].password);
      if(result){
        const payload = {
          userId:  response.rows[0]._id,
          country:  response.rows[0].country,
          role:  response.rows[0].role_id,
        };

        const options = {
          expiresIn: "60m",
        };
        const token = jwt.sign(payload, SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      }



     
      res.status(201).json({
        success: true,
        message: "Valid login credentials",
        response: response.rows[0],
      });
    }
  
  } catch (error) {
    console.log(error);
    res.status(409).json({
      success: false,
      message: "The email doesn’t exist or the password you’ve entered is incorrect",
      error: error.message,
    });
  }
  };
  

module.exports = {
  register,login
};
