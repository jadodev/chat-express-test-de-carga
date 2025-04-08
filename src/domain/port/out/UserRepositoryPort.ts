import { User } from "../../entity/User";

export interface UserRepositoryPort{
    saveUser(user: User): void;
    getUserById(id: number): User | undefined;
}