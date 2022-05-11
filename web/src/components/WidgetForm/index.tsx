import { CloseButton } from "../CloseButton";

import bugImageUrl from "../../assets/svg/bug.svg";
import ideaImageUrl from "../../assets/svg/idea.svg";
import thoughtImageUrl from "../../assets/svg/thought.svg";
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: "Problemas",
        image: {
            source: bugImageUrl,
            alt: "Ícone de um inseto roxo"
        }
    },
    IDEA: {
        title: "Ideias",
        image:{
            source: ideaImageUrl,
            alt: "Ícone de uma lâmpada acesa"
        }
    },
    OTHER: {
        title: "Outros",
        image:{
            source: thoughtImageUrl,
            alt: "Ícone de uma nuvem de pensamento"
        }
    }
}
/*
    Object.entries(feedbackTypes) =>
    [
        ["BUG", {title: "Problemas", image: {source: bugImageUrl, alt: "Ícone de um inseto roxo"}}],
        ["IDEA", {title: "Ideias", image: {source: ideaImageUrl, alt: "Ícone de uma lâmpada acesa"}}],
        ["OTHER", {title: "Outros", image: {source: thoughtImageUrl, alt: "Ícone de uma nuvem de pensamento"}}]
    ]


*/

export type FeedbackType =  keyof typeof feedbackTypes;

// typeof retorna a tipagem de um objeto
// keyof retorna a tipagem das chaves do objeto ex : "BUG" | "IDEA" | "OTHER"


 export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSend]   = useState(false);

    function handleRestartFeedback(){
        setFeedbackSend(false)
        setFeedbackType(null);

    }

     return(
         <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
          {
              feedbackSent ? (
                  <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
              ) : (
                  <>
                    { !feedbackType ? (
                       <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep 
                            feedbackType={feedbackType} 
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSend(true)}
                        />
                    )}
                  </>
              )
          }
             <footer className="text-xs text-neutral-400">
                Feito com ♥ por
                <a className="underline underline-offset-2" 
                    href="https://www.github.com/shymarrai"
                > Shymarrai!
                </a>
             </footer>
         </div>
     )
 }