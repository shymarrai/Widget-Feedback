import { CloseButton } from "./CloseButton";

import bugImageUrl from "../assets/svg/bug.svg";
import ideaImageUrl from "../assets/svg/idea.svg";
import thoughtImageUrl from "../assets/svg/thought.svg";
import { useState } from "react";

const feedbackTypes = {
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

type FeedbackType =  keyof typeof feedbackTypes;

// typeof retorna a tipagem de um objeto
// keyof retorna a tipagem das chaves do objeto ex : "BUG" | "IDEA" | "OTHER"


 export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);


     return(
         <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

             <header>
                 <span className="text-xl leading-6">
                     Deixe seu feedback!
                 </span>

                <CloseButton />
             </header>

            <div className="flex py-8 gap-2 w-full">
                {
                    Object.entries(feedbackTypes).map(([key, value]) => {
                        return (
                            <button
                                key={key} 
                                className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center  gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                                onClick={() => setFeedbackType(key as FeedbackType)}
                                type="button"
                            >
                                <img 
                                    src={value.image.source} 
                                    alt={value.image.alt} 
                                />
                                <span>
                                    {value.title}
                                </span>

                            </button>
                        )
                    })
                }
            </div>

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