import React, { useMemo } from 'react'
import Icon from './icon';
import Text from './text';
import UploadFileIcon from '../assets/icons/upload-file.svg?react'
import ImageIcon from '../assets/icons/image.svg?react'
import { cva, type VariantProps } from 'class-variance-authority';
import { useWatch } from 'react-hook-form'

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
    form: any;
    allowedExtenxions: string[];
    maxFileSizeInMb: number;
    replaceBy?: React.ReactNode;
    error?: React.ReactNode;
}

const InputSingleFile = ({
    size,
    error,
    form,
    allowedExtenxions,
    maxFileSizeInMb,
    replaceBy,
    className,
    ...props
}: InputSingleFileVariantsProps) => {
    const formValues = useWatch({ control: form.control });
    const name = props.name || "";
    const formFile: File = useMemo(() =>
        formValues[name]?.[0]
        , [formValues, name]);
    const { fileExtenxion, fileSize } = useMemo(() => ({
        fileExtenxion: formFile?.name?.split('.')?.pop()?.toLowerCase() || '',
        fileSize: formFile?.size || 0
    }), [formFile]);

    function isValideExtenxion() {
        return allowedExtenxions.includes(fileExtenxion);
    }

    function isValideSize() {
        return fileSize <= maxFileSizeInMb * 1024 * 1024
    }

    function isValidFile() {
        return isValideExtenxion() && isValideSize()
    }

    return (
        <div>
            {!formFile || !isValidFile() ? (

                <>
                    <div className='relative w-full group cursor-pointer mt-5'>
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
                    <div className='flex flex-col gap-1 mt-1'>
                        {formFile && !isValideExtenxion() && (
                            <Text variant={'label/small'} className='text-accent-red!'>
                                A extensão do arquivo não é permitida
                            </Text>
                        )}
                        {formFile && !isValideSize() && (
                            <Text variant={'label/small'} className='text-accent-red!'>
                                O tamanho do arquivo supera o limite máximo permitido
                            </Text>
                        )}
                        {error &&
                            <Text variant={'label/small'} className='text-accent-red!'>
                                {error}
                            </Text>
                        }
                    </div>
                </>

            ) : (
                <>
                    {replaceBy}
                    <div className='flex items-center border border-solid 
                        border-border-primary rounded p-3 gap-3 mt-5'>
                        <Icon icon={ImageIcon} className='w-6 h-6 fill-text-label' />
                        <div className='flex flex-col'>
                            <div className='truncate max-w-80'>

                                <Text
                                    variant={"label/medium"}
                                    className='text-text-placeholder'>
                                    {formFile.name}
                                </Text>
                            </div>
                            <div className='flex'>
                                <button
                                    type='button'
                                    onClick={() => {
                                        form.setValue(name, undefined);
                                    }}
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
                </>
            )}
        </div>
    )
}

export default InputSingleFile;
