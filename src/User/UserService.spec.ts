import { UserRepositoryMock } from "./UserRepositoryMock"
import { UserService } from "./UserService"

const createSut = () => {
    const userRepositoryMock = new UserRepositoryMock()
    const sut = new UserService(userRepositoryMock)
    return sut
}

interface ICreateUser {
    id?: string
    name: string
    email: string,
    passwordHash: string
}

describe('test UserService',()=>{

    it('should verified already exist email register',async()=>{
        const sut = createSut()
        const user = {
            name:'Rafael',
            email:'adriano@adriano',
            passwordHash:'123456'
        }
        const result = await sut.register(user)
        expect(result).toEqual({message:'Email already exist!'})
    })

})