export class MessageDto{
    public user: string;
    public text: string;

    constructor(user:string, text: string){
        this.user = user;
        this.text = text;
    }
}