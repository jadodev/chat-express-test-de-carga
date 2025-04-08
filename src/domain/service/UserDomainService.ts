import { User } from "../entity/User";
import { UserServicePort } from "../port/in/UserServicePort";
import { UserRepositoryPort } from "../port/out/UserRepositoryPort";

export class UserDomainService implements UserServicePort{
    constructor(
        private readonly repository: UserRepositoryPort
    ){}

    createUser(user: User): void {
        this.repository.saveUser(user);
    }
    
    getUserById(id: number): User | undefined {
        const user = this.repository.getUserById(id);
        return user;
    }
    
}