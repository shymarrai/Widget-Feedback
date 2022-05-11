import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"


// spies => saber se alguma função foi chamada

const createFeednackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeednackSpy},
    {sendMail: sendMailSpy}
)
    // {create: async () => {}},
    // { sendMail : async () => {} }

describe('Submit feedback', () => {

    //deveria ser possivel enviar um feedback
    it('should be able to submit a feedback', async () => {
        
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: 'example comment',
            screenshot: 'data:image/png;base64:asdasdasdasdasdasdasd'
    
        })).resolves.not.toThrow();

        expect(createFeednackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    //não deveria ser possivel enviar um feedback sem um tipo
    it('should not be able to submit feedback without type', async () => {
        
        await expect(submitFeedback.execute({
            type: "",
            comment: 'example comment',
            screenshot: 'data:image/png;base64:asdasdasdasdasdasdasd'
    
        })).rejects.toThrow();
    })

    //não deveria ser possivel enviar um feedback sem um comentario
    it('should not be able to submit feedback without comment', async () => {
        
        await expect(submitFeedback.execute({
            type: "bUG",
            comment: '',
            screenshot: 'data:image/png;base64:asdasdasdasdasdasdasd'
    
        })).rejects.toThrow();
    })


    //não deveria ser possivel enviar um feedback sem uma screenshot
    it('should not be able to submit feedback without screenshot invalid', async () => {
        
        await expect(submitFeedback.execute({
            type: "bUG",
            comment: 'example comment',
            screenshot: '123'
    
        })).rejects.toThrow();
    })

})