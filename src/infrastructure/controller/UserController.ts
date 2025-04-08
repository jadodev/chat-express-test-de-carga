import { Socket } from "socket.io";
import { UserApplicationService } from "../../application/service/UserApplicationService";
import { UserDto } from "../../application/dto/UserDto";

export class UserController {
    constructor(private userService: UserApplicationService) {}

    handleUserConnection(socket: Socket): void {
        socket.on('register user', (user: UserDto, ack: Function) => {
            this.userService.createUser(user);
            socket.data.user = user;
            if (ack) ack({ status: 'ok' });
        });
    }
}