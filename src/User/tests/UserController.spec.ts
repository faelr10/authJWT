import request from 'supertest'
import { app } from '../../app'

describe('TESTS VALIDATION REGISTER', () => {
    it('should validate name is not null', async () => {
        const user = await request(app)
            .post('/register')
            .send({
                name: 'Ed',
                email: 'rafael@rafael.com',
                password: '123456',
                confirmPassword: '123456'
            })
        expect(user.body.message).toBe('Field name not null!')
    })
    it('should validate email', async () => {
        const user = await request(app)
            .post('/register')
            .send({
                name: 'Rafael',
                email: 'rafaelrafael.com',
                password: '123456',
                confirmPassword: '123456'
            })
        expect(user.body.message).toBe('Email inválido!')
    })
    it('should validate compare password', async () => {
        const user = await request(app)
            .post('/register')
            .send({
                name: 'Rafael',
                email: 'rafael@rafael.com',
                password: '123456',
                confirmPassword: '123455'
            })
        expect(user.body.message).toBe('As senhas não conferem!')
    })
})





