import { UserRepositoryMock } from "./mocks/UserRepositoryMock"
import { UserService } from "../UserService"

const createSut = () => {
    const userRepositoryMock = new UserRepositoryMock()
    const sut = new UserService(userRepositoryMock)
    return sut
}
describe('TEST VALIDATIONS REGISTER', () => {
    it('should verified already exist email register', async () => {
        const sut = createSut()
        const user = {
            name: 'Teste',
            email: 'teste@teste.com',
            passwordHash: '123456'
        }
        const result = await sut.register(user)
        expect(result).toEqual({ message: 'Email already exist!' })
    })

})
describe('TESTS VALIDATION FOR LOGIN', () => {
    it('should login sucess', async () => {
        const sut = createSut()
        const user = await sut.login('teste@teste.com', '123456')
        expect(user).toHaveProperty('token')
    })
    it('should validate compare password', async () => {
        const sut = createSut()
        const user = await sut.login('teste@teste.com', '123455')
        expect(user).toEqual({ message: 'Senha inválida!' })
    })
    it('should validate email for login', async () => {
        const sut = createSut()
        const user = await sut.login('teste1@teste.com', '123456')
        expect(user).toEqual({ message: 'Email inválido!' })
    })
})