import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {

    private feedbacksRepository: FeedbacksRepository;
    private mailAdapter: MailAdapter;

    constructor(
        feedbacksRepository: FeedbacksRepository,
        mailAdapter: MailAdapter,
    ){
        this.feedbacksRepository = feedbacksRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request: SubmitFeedbackUseCaseRequest): Promise<void> {
        const { type, comment, screenshot } = request;

        if(!type){
            throw new Error('type is required');
        }
        
        if(!comment){
            throw new Error('comment is required');
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format');

        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                "<div style='font-family:sans-serif; font-size:16px; color: #333' >",
                `<p>Feedback do tipo: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<image src="${screenshot}" />` : null,
                "</div>",
            ].join('\n')
        })
    }
}