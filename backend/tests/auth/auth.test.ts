import request from 'supertest'
import express from 'express'
import router from '../../src/routes/auth.routes'
import { describe, expect, test, vi } from 'vitest'
import * as queries from '../../src/queries'
import bcrypt from 'bcrypt'

const hashedPassword = bcrypt.hashSync('12345678', 12) // hash reale

vi.mock('../../src/queries/', async () => {
  const actual = await vi.importActual('../../src/queries/')
  return {
    ...actual,
    getUserByEmail: vi.fn(),
  }
})

const app = express()
app.use(express.json())
app.use(router)

describe('Login Endpoints', () => {
  test('POST /auth/login - success', async () => {
    vi.mocked(queries.getUserByEmail, { partial: true }).mockResolvedValue({
      id: '1',
      email: 'mm.melchiorri@gmail.com',
      password: hashedPassword, // bcrypt hash for 'password123'
    })
    const response = await request(app).post('/auth/login').send({
      email: 'mm.melchiorri@gmail.com',
      password: '12345678',
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('accessToken')
    expect(response.headers['set-cookie']).toBeDefined()
    expect(response.headers['set-cookie']?.[0]).toMatch(/refreshToken=/)
  })

  test('POST /auth/login - invalid credentials', async () => {
    vi.mocked(queries.getUserByEmail, { partial: true }).mockResolvedValue({
      id: '1',
      email: 'm.melchiorri@gmail.com',
      password: hashedPassword, // bcrypt hash for 'password123'
    })
    const response = await request(app).post('/auth/login').send({
      email: 'mm.melchiorri@gmail.com',
      password: 'wrongpassword',
    })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error', 'Invalid email or password')
  })

  test('POST /auth/login - user not found', async () => {
    vi.mocked(queries.getUserByEmail, { partial: true }).mockResolvedValue(null)
    const response = await request(app).post('/auth/login').send({
      email: 'user_not_found@test.it',
      password: 'anypassword',
    })
    console.log(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error', 'User not found')
  })
})
