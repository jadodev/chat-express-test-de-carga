import { Message } from "../../entity/Mesagge";

export interface ChatRepositoryPort {
    saveMessage (message:Message):Promise<void>;
    getMessages(): Message[];
}