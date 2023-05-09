import axios from 'axios'
import Router from './router';

const errorHandler = (error) => {
  if ([401, 403].includes(error.response.status)) {
    Router.push('/login')
    throw new Error('Please login again')
  }
}

export default {
  get: (...args) => axios.get(...args).catch(errorHandler),
  post: (...args) => axios.post(...args).catch(errorHandler),
  put: (...args) => axios.get(...args).catch(errorHandler),
}
