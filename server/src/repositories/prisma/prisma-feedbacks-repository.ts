import { prisma } from "../../prima";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({type, comment, screenshot}: FeedbackCreateData){
        await prisma.feedback.create({
            data: {
                type: type,
                comment: comment,
                screenshot: screenshot,
                
                // Ou -----
                // type,
                // comment,
                // screenshot,
    
            }
        })
    }

}