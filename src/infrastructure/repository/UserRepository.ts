import { User } from "../../domain/entity/User";
import { UserRepositoryPort } from "../../domain/port/out/UserRepositoryPort";

export class UserRepository implements UserRepositoryPort {
    private users: Map< number, User> = new Map;
    private currendId = 0;

    saveUser(user: User): void {
        user.id = this.currendId++;
        this.users.set(user.id, user);
    }
    getUserById(id: number): User | undefined {
        return this.users.get(id);
    }
}