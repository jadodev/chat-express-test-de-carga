import { User } from "../../entity/User";

export interface UserServicePort {
        createUser(user: User): void;
        getUserById(id: number): User | undefined;
}