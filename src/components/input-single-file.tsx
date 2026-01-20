import React from 'react'
import Icon from './icon';
import Text from './text';
import UploadFileIcon from '../assets/icons/upload-file.svg?react'
import ImageIcon from '../assets/icons/image.svg?react'
import { cva, type VariantProps } from 'class-variance-authority';

export const inputSingleFileVariants = cva(`flex flex-col justify-center 
items-center w-full border border-solid border-border-primary 
group-hover:border-border-active rounded-lg gap-4` , {
    variants: {
        size: {
            md: "px-5 py-6"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

export const InputSingleFileIconVariants = cva("fill-text-placeholder", {
    variants: {
        size: {
            md: "w-8 h-8"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

interface InputSingleFileVariantsProps extends
    Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputSingleFileVariants> {
    error?: React.ReactNode;
}

const InputSingleFile = ({
    size,
    error,
    className,
    ...props
}: InputSingleFileVariantsProps) => {
    return (
        <div>
            <div className='relative w-full group cursor-pointer'>
                <input
                    type="file"
                    className={`
                        absolute top-0 right-0 w-full h-full opacity-0 
                        cursor-pointer
                    `}
                    {...props}
                />
                <div className={inputSingleFileVariants({ size, className })}>
                    <Icon
                        icon={UploadFileIcon}
                        className={InputSingleFileIconVariants({ size })}
                    />
                    <Text variant={'label/medium'} className='text-text-placeholder text-center'>
                        Arraste o arquivo aqui
                        <br />
                        ou clique para selecionar
                    </Text>
                </div>
            </div>
            {error &&
                <Text variant={'label/small'} className='text-accent-red!'>
                    Erro no campo
                </Text>
            }

            <div className='flex items-center border border-solid 
            border-border-primary rounded p-3 gap-3 mt-5'>
                <Icon icon={ImageIcon} className='w-6 h-6 fill-text-label' />
                <div className='flex flex-col'>
                    <div className='truncate max-w-80'>

                        <Text
                            variant={"label/medium"}
                            className='text-text-placeholder'>
                            Nome_do_arquivo.png
                        </Text>
                    </div>
                    <div className='flex'>
                        <button
                            type='button'
                        >
                            <Text
                                variant={'label/small'}
                                className='text-accent-red! hover:underline cursor-pointer'
                            >
                                Remover
                            </Text>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputSingleFile;
