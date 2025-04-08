import { Socket } from "socket.io";
import { MessageDto } from "../../application/dto/MessageDto";
import { messageQueue } from "../config/ChatQueue";

export class ChatController {

    handleMessage(socket:Socket):void{
        socket.on("chat message", async ({ text }, ack: Function) => {
            const user = socket.data.user;
        
            if (!user) {
                if (ack) ack({ status: 'error', message: 'Usuario no registrado' });
                return;
            }
        
            const messageDto = new MessageDto(user.name, text);
        
            await messageQueue.add("new message", {
                user: { name: user.name },
                text
            });
        
            socket.broadcast.emit("chat message", messageDto);
            
            if (ack) ack({ status: 'ok' });
        });
    }
}