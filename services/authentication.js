const JWT = require("jsonwebtoken");

// Create a Secret Key
const secret = "$ZER02WO$T4CKD3V$";

// Create a function to generate a token
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    profilePicture: user.profilePicture,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
};

// Create a function to verify a token
const verifyToken = (token) => {
  const decoded = JWT.verify(token, secret);
  return decoded;
};

// Export the functions
module.exports = { generateToken, verifyToken };
