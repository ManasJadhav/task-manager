const db = require("../database/db");
const { createToken } = require("../utility/createJWToken");
const { checkPassword } = require("../utility/passwordManager");
const maxAge = 3 * 24 * 60 * 60;

// client login
module.exports.loginClient = async (req, res) => {
  let { email, password } = req.body;
  let sqlQuery = "SELECT * FROM client WHERE email = ?";
  let value = [email];
  db.query(sqlQuery, [value], async (error, result) => {
    if (error) {
      res.status(502).json({
        success: false,
        error: "Internal Server Error.",
      });
      return;
    }
    if (result.length == 0) {
      res.status(404).json({
        success: false,
        error: "Client is not registered.",
      });
    } else {
      let id = result[0].clientId;
      let hashPassword = result[0].password;
      let auth = await checkPassword(password, hashPassword);
      if (auth) {
        const token = createToken(id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({
          success: true,
          data: "Logged in successfully.",
        });
      } else {
        res.status(400).json({
          success: false,
          data: "Invalid Credentials.",
        });
      }
    }
  });
};

// get profile of client
module.exports.getClientProfile = async (req, res) => {
  const client = req.client;
  delete client.clientId;
  delete client.password;
  res.status(200).json({ success: true, data: { client } });
};

// client logout
module.exports.logoutClient = async (req, res) => {
  res
    .clearCookie("jwt")
    .status(200)
    .json({ success: true, data: "Logged out successfully." });
};