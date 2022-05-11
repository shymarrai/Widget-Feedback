import { MailAdapter, SendMailDta } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1f702febe56176",
        pass: "30482c29c8d12e"
    }
})

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailDta) {
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "Bruno Gomes <icestonebruno@gmail.com>",
            subject,
            html: body

        })

    }
}