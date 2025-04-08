import { UserDomainService } from "../../domain/service/UserDomainService";
import { UserDto } from "../dto/UserDto";
import { UserMapper } from "../mapper/UserMapper";

export class UserApplicationService {
    constructor(
        private readonly serviceDomain: UserDomainService
    ){}

    public createUser(userDto: UserDto): void {
        const user = UserMapper.toDomain(userDto)
        this.serviceDomain.createUser(user);
    }

    public getById(id:number): UserDto | null{
        const user = this.serviceDomain.getUserById(id);
        return user || null;
    }
}