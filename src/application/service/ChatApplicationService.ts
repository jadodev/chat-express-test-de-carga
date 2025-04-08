import { ChatDomainService } from "../../domain/service/ChatDomainService";
import { MessageDto } from "../dto/MessageDto";
import { MessageMapper } from "../mapper/MessageMapper";

export class ChatApplicationService {
    constructor(
        private readonly serviceDomain: ChatDomainService
    ){}

    public async createMessage(message:MessageDto): Promise<void> {
        const ms = MessageMapper.toDomain(message);
        await this.serviceDomain.createMessage(ms);
    }

    public getMessages(): MessageDto[] {
        return this.serviceDomain.getMessages().map(MessageMapper.dto);
    }
}