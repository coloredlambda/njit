import register from './register'
import login from './login'

export default ctx => ({
  login: login(ctx),
  register: register(ctx)
})
