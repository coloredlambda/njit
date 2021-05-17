import register from './register'
import login from './login'

export default ctx => ({
  register: register(ctx),
  login: login(ctx)
})
