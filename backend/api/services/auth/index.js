const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const DbService = require('@Service/db')

const jwtSecret = process.env.JWT_SECRET;

const login = async (data) => {
  const user = await DbService('users').where({ username: data.username }).first();

  if (!user) {
    throw new Error('Username or password is incorrect');
  }

  const validPassword = await bcrypt.compare(data.password, user.password);

  if (!validPassword) {
    throw new Error('Username or password is incorrect');
  }

  const token = generateToken(user);
  return {
    userrname: user.username,
    token,
  }
};

const register = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const user = {
    username: data.username,
    password: hashedPassword,
  };

  const result = await DbService('users').insert(user);
  const newUser = await DbService('users').where({ id: result[0] }).first();

  const token = generateToken(newUser);
  return {
    user: newUser.username,
    token
  };
};


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

module.exports = { generateToken, authenticateToken, login, register };
