import test from 'ava'
import register from './register'

test.beforeEach(t => {
  t.context.input = {
    email: 'raaj.ahab@gmail.com',
    password: '849h39g9uhh4uhf983hf9'
  }
})

test('Check register endpoint', t => {
  const output = register()
})
