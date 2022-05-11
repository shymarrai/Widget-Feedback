export interface SendMailDta{
    subject: string;
    body: string;
}

export interface MailAdapter {
    sendMail: (data: SendMailDta) => void;
}