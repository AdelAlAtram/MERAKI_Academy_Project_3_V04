const {pool} = require("../models/db")



// const funcName=(req,res)=>{

   
// try {
//   const { name, email, password } = req.body;

//   const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING email, name, id`;
//   const values = [name, email, password];
//   const response = await pool.query(query, values);

//   if (response.rowCount) {
//     res.status(201).json({
//       success: true,
//       message: "user created successfully",
//       response: response.rows,
//     });
//   }
// } catch (error) {
//   console.log(error);
//   res.status(500).json({
//     success: false,
//     message: "Server Error",
//     error: error.message,
//   });
// }
   
// }













// This function creates new role
const createNewRole = async(req, res) => {
  try {
    const {role} = req.body;

    const query = `INSERT INTO roles (role) VALUES ($1) RETURNING role, id`;
    const values = [role];
    const response = await pool.query(query, values);

    if (response.rowCount) {
      res.status(201).json({
        success: true,
        message: "Role created successfully",
        role: response.rows,
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

// This function creates new permission
const createNewPermission = (req, res) => {
  
};

// This function creates new role permission
const createNewRolePermission = (req, res) => {
  
};

module.exports = {
  createNewRole,
  createNewPermission,
  createNewRolePermission
};
