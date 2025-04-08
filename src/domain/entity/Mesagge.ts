export class Message{
    public user: string;
    public text: string;
    public timestamp: Date;
    
    constructor(user:string,text: string){
        this.user = user;
        this.text = text
        this.timestamp = new Date();
    }
}