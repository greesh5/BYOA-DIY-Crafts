const jwt = require('jsonwebtoken');
const User = require('../model/User');

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header not found' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    User.findById(decodedToken.userId)
      .then((user) => {

        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }

        
        req.user = user;

        next();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  requireAuth,
};
