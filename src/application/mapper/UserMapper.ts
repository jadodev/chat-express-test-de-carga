import { User } from "../../domain/entity/User";
import { UserDto } from "../dto/UserDto";

export class UserMapper {
    public static toDto(user: User): UserDto{
        return new UserDto(
            user.id,
            user.name
        )
    }

    public static toDomain(userDto: UserDto): User{
        return new User(
            userDto.id,
            userDto.name
        )
    }
}