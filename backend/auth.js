const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
    expiresIn: '1h',
  });
}

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error)
    res.status(403).send('Invalid Token');
  }
}

module.exports = { generateToken, authenticateToken };
