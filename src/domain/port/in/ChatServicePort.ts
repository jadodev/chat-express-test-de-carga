import { Message } from "../../entity/Mesagge";

export interface ChatServicePort {
    createMessage (message:Message): Promise<void>;
    getMessages(): Message[];
}