import { ChatTeardropDots } from 'phosphor-react'
import { Popover } from '@headlessui/react'
{/* COMPONENTE PARA ACESSIBILIDADE */}

export function Widget() {

    return (
        <Popover className="absolute bottom-4 right-4 ">
            <Popover.Panel className='p-8 bg-violet-100 flex items-center'>
                Opa!
            </Popover.Panel>

            <Popover.Button 
                className='bg-brand-500 px-3 h-12 rounded-full text-white flex items-center group'
            >
                <ChatTeardropDots className='w-6 h-6' size="50"  />
                
                <span className='max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear'>
                    <span className='pl-2'></span>
                    Feedback
                </span>
            </Popover.Button>

        </Popover>
    )
}