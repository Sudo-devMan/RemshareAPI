import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    constructor(private readonly mailerService: MailerService) {}

    async sendShareEmail(senderEmail: string, receiverEmail: string, password: string, link: string) {
        try {
            const response = await this.mailerService.sendMail({
                to: receiverEmail,
                subject: "Receive files from Remshare",
                text: `Hello, ${receiverEmail}! You have received files from ${senderEmail} via Remshare. Here is a link: ${link}       Use this password to receive the files: ${password}`,
                html: `
                    <h1 style="color: #101735;">Receive Files</h1>
                    <br/>
                    <p>Hello, ${receiverEmail}, you have received files from ${senderEmail} via Remshare.</p>
                    <p>Here is the link: <a href="${link}">Click here to receive the files</a>.</p>
                    <p>You can use this password to receive the files: <span style="color: #128eff; font-weight: bold;">${password}</span></p>
                `
            })

            console.log("Receiver email sent: ", response)
            return {
                success: true,
                message: "Email successfully sent to receiver"
            }
        } catch (err) {
            console.error("Failed to send email to receiver: ", err)
            throw err
        }
    }
}
