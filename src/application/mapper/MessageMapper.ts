import { Message } from "../../domain/entity/Mesagge";
import { MessageDto } from "../dto/MessageDto";

export class MessageMapper {
    public static dto(message: Message): MessageDto{
        return new MessageDto(
            message.user,
            message.text
        )
    }

    public static toDomain(messageDto: MessageDto): Message {
        return new Message(
            messageDto.user,
            messageDto.text
        )
    }
}