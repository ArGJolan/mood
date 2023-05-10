const AuthService = require('@Service/auth')
const LogService = require('@Service/log')

const login = async (req, res) => {
  try {
    // TODO typecheck body
    const user = await AuthService.login(req.body)

    return res.header('Authorization', user.token).json({ user });
  } catch (err) {
    LogService.logger.error('Username or password is incorrect', err)
    return res.status(400).send('Username or password is incorrect');
  }
}

const register = async (req, res) => {
  try {
    // TODO typecheck body
    const user = await AuthService.register(req.body)

    return res.header('Authorization', user.token).json({ user });
  } catch (err) {
    LogService.logger.error('Could not create user', err)
    return res.status(400).send('Could not create user');
  }
}

module.exports = {
  login: [ login ],
  register: [ register ],
}
