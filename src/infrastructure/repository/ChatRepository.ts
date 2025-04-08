import { Message } from "../../domain/entity/Mesagge";
import { ChatRepositoryPort } from "../../domain/port/out/ChatRepositoryPort";

export class ChatRepository implements ChatRepositoryPort {
    private messages: Message[] = [];

    async saveMessage(message: Message): Promise<void> {
        this.messages.push(message);
    }
    
    getMessages(): Message[] {
       return this.messages;
    }
}