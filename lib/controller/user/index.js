import register from './register'
import login from './login'
import resetPassword from './reset-password'
import changePassword from './change-password'

export default ctx => ({
  login: login(ctx),
  register: register(ctx),
  resetPassword: resetPassword(ctx),
  changePassword: changePassword(ctx)
})
