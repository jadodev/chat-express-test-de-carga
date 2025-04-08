import { Message } from "../entity/Mesagge";
import { ChatServicePort } from "../port/in/ChatServicePort";
import { ChatRepositoryPort } from "../port/out/ChatRepositoryPort";

export class ChatDomainService implements ChatServicePort{
    constructor(
        private readonly repository: ChatRepositoryPort
    ){}


    async createMessage(message: Message): Promise<void> {
        this.repository.saveMessage(message);
    }

    getMessages(): Message[] {
        const messages = this.repository.getMessages();
        return messages;
    }
}