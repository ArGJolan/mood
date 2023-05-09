const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const logger = require('./logger');
const db = require('./db');
const { generateToken, authenticateToken } = require('./auth');
const expressWinston = require('express-winston');
const winston = require('winston');
const jwt = require('jsonwebtoken')

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  exposedHeaders: ['Authorization']
}));
app.use(express.json());
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'requests.log' })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, meta }) => {
      return `[${timestamp}] ${level}: ${message} - ${JSON.stringify(meta)}`;
    })
  ),
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: true,
}));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.post('/api/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      username: req.body.username,
      password: hashedPassword,
    };

    const result = await db('users').insert(user);
    const newUser = await db('users').where({ id: result[0] }).first();

    const token = generateToken(newUser);
    res.header('Authorization', token).json({ user: newUser.username });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post('/api/login', async (req, res) => {
  const user = await db('users').where({ username: req.body.username }).first();

  if (!user) {
    return res.status(400).send('Username or password is incorrect');
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send('Username or password is incorrect');
  }

  const token = generateToken(user);
  res.header('Authorization', token).json({ user: user.username });
});

app.listen(port, () => {
  logger.info(`Backend server listening at http://localhost:${port}`);
});

app.post('/api/mood', authenticateToken, async (req, res) => {
  try {
    const { id: userId } = req.user;

    const {
      entry_date,
      health,
      work,
      romantic_relationship,
      family_relationships,
      friends,
      physical_wellness,
      entry_comment,
      health_comment,
      work_comment,
      romantic_relationship_comment,
      family_relationships_comment,
      friends_comment,
      physical_wellness_comment,
    } = req.body;

    const cleanedData = {
      user_id: userId,
      entry_date,
      health: health || null,
      work: work || null,
      romantic_relationship: romantic_relationship || null,
      family_relationships: family_relationships || null,
      friends: friends || null,
      physical_wellness: physical_wellness || null,
    };
    
    const result = await db('mood_entries').insert({
      user_id: userId,
      entry_date,
      health,
      work,
      romantic_relationship,
      family_relationships,
      friends,
      physical_wellness,
      entry_comment,
      health_comment,
      work_comment,
      romantic_relationship_comment,
      family_relationships_comment,
      friends_comment,
      physical_wellness_comment,
      ...cleanedData
    });
    
    res.status(201).json({ message: 'Mood entry created', entryId: result[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating mood entry' });
  }
});

app.get('/api/moods', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const moods = await db('mood_entries').where({ user_id: userId }).orderBy('entry_date', 'desc').limit(30);
    res.json({ moods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching moods' });
  }
});

