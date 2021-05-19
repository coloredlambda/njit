import test from 'ava'
import mongoose from 'mongoose'
import { equals, prop, isTrue, isNotNilOrEmpty } from '@meltwater/phi'
import request from 'supertest'
import config from '../config'
import server from '../lib/server'
import user from '../fixtures/data/user'
import post from '../fixtures/data/post'

let token
let savedPost
const { database: { mongodb: { uri, ...options } } } = config
const databaseUri = 'mongodb://localhost:27017/TestDB'

test.before(async t => {
  await mongoose.connect(databaseUri, options)
})

test.after.always(async () => {
  await mongoose.connect(databaseUri, options)
  await mongoose.connection.db.dropDatabase()
})

test.serial('Check POST /api/v1/account', async t => {
  const response = await request(server).post('/api/v1/account').send(user)
  const statusCode = prop('status', response)
  const { success, payload } = prop('body', response)
  t.truthy(equals(statusCode, 201))
  t.truthy(isTrue(success))
  t.truthy(equals(payload.email, user.email))
})

test.serial('Check POST /api/v1/account/login', async t => {
  const response = await request(server).post('/api/v1/account/login').send(user)
  const statusCode = prop('status', response)
  const { success, payload } = prop('body', response)
  t.truthy(equals(statusCode, 201))
  t.truthy(isTrue(success))
  t.truthy(equals(payload.email, user.email))
  t.truthy(isNotNilOrEmpty(payload.token))
  token = payload.token
})

test.serial('Check POST /api/v1/post', async t => {
  const response = await request(server).post('/api/v1/post').send(post).set('token', token)
  const statusCode = prop('status', response)
  const { success, payload } = prop('body', response)
  t.truthy(equals(statusCode, 201))
  t.truthy(isTrue(success))
  t.truthy(equals(payload.text, post.text))
  savedPost = payload
})

test.serial('Check GET /api/v1/post', async t => {
  const response = await request(server).get('/api/v1/post').set('token', token)
  const statusCode = prop('status', response)
  const { success, payload } = prop('body', response)
  t.truthy(equals(statusCode, 200))
  t.truthy(isTrue(success))
  t.truthy(equals(payload[0], savedPost))
})

test.serial('Check GET /api/v1/post - By Id', async t => {
  const response = await request(server).get(`/api/v1/post?id=${savedPost._id}`).set('token', token)
  const statusCode = prop('status', response)
  const { success, payload } = prop('body', response)
  t.truthy(equals(statusCode, 200))
  t.truthy(isTrue(success))
  t.truthy(equals(payload, savedPost))
})

test.serial('Check PUT /api/v1/post', async t => {
  const response = await request(server).put(`/api/v1/post/${savedPost._id}`)
    .send({ text: 'updated text' })
    .set('token', token)
  const statusCode = prop('status', response)
  const { success, payload } = prop('body', response)
  t.truthy(equals(statusCode, 200))
  t.truthy(isTrue(success))
  t.truthy(equals(payload.text, 'updated text'))
})

test.serial('Check DELETE /api/v1/post', async t => {
  const response = await request(server).delete(`/api/v1/post/${savedPost._id}`)
    .send({ text: 'updated text' })
    .set('token', token)
  const statusCode = prop('status', response)
  const { success } = prop('body', response)
  t.truthy(equals(statusCode, 200))
  t.truthy(isTrue(success))
})

test.serial('Check POST /api/v1/account/reset-password', async t => {
  const response = await request(server).post('/api/v1/account/reset-password').send(user)
  const statusCode = prop('status', response)
  const { success } = prop('body', response)
  t.truthy(equals(statusCode, 201))
  t.truthy(isTrue(success))
})
