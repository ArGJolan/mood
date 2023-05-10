const AuthService = require('@Service/auth')
const MoodService = require('@Service/mood')
const { logger: LogService } = require('@Service/log')

const getAll = [
  AuthService.authenticateToken,
  async (req, res) => {
    try {
      const { id: userId } = req.user;
      const result = await MoodService.getUserMoods(userId)

      res.json(result)
    } catch (err) {
      LogService.error('Could not get moods', err)
      res.status(400).json({ error: 'Could not get moods' })
    }
  }
]

const create = [
  AuthService.authenticateToken,
  async (req, res) => {
    try {
      const { id: userId } = req.user;
      await MoodService.create(userId, req.body)

      res.status(201).json({ message: 'Mood created' })
    } catch (err) {
      LogService.error('Could not create mood', err)
      res.status(400).json({ error: 'Could not create mood' })
    }
  }
]

module.exports = {
  getAll,
  create,
}
