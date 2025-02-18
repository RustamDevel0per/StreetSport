import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/model/user.model';

@Injectable()
export class MailService {
    constructor(private readonly mailService:MailerService){}
    async sendMail(user:User){
        const url =`${process.env.API_URL}/api/users/activate/${user}`
        console.log(url);
        await this.mailService.sendMail({
            to:user.email,
            subject:"Skidkachiga xush kelibsiz",
            template:"./confirm",
            context:{
                name:user.username,
                url
            }
        })
        
    }
}
