import test from 'ava'
import { post, user } from './models'

test('Check that models have not changed', t => {
  t.snapshot(post)
  t.snapshot(user)
})
