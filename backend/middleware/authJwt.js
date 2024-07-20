
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization']; 

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  if (token.startsWith('Bearer ')) { 
    token = token.slice(7, token.length); 
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    console.log("Decoded JWT:", decoded); 

    req.userId = decoded.id;
    next();
  });
};

module.exports = {
  verifyToken
};
