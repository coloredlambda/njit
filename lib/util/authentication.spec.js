import test from 'ava'
import { isNotNilOrEmpty, equals } from '@meltwater/phi'
import { createHashPassword, createComparePassword, createSignPayload, createVerifyPayload } from './authentication'
import config from '../../config'

test('Check hash and compare password', async t => {
  const candidatePassword = 'pineapple'

  const hashPassword = createHashPassword()
  const comparePassword = createComparePassword()

  const hashedPassword = await hashPassword('pineapple')
  const correctPassword = await comparePassword({ hashedPassword, password: candidatePassword })
  const wrongPassword = await comparePassword({ hashedPassword, password: 'wrongPassword' })
  t.truthy(correctPassword)
  t.falsy(wrongPassword)
})

test('Check sign and verify jwt payload', async t => {
  const candidatePayload = { email: 'raaj.ahab@gmail.com', id: 'hu3fw98rhg083h2foq' }
  const signPayload = createSignPayload({ config })
  const verifyPayload = createVerifyPayload({ config })

  const token = await signPayload(candidatePayload)
  t.truthy(isNotNilOrEmpty(token))

  const outputPayload = await verifyPayload(token)
  t.truthy(equals(outputPayload.email, candidatePayload.email))
  t.truthy(equals(outputPayload.id, candidatePayload.id))
})
