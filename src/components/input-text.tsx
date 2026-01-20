import React from 'react'
import Icon from './icon'
import Text from './text'
import { cva, type VariantProps } from 'class-variance-authority'

export const inputTextContainerVariants = cva("flex flex-col gap-1");

export const inputTextWrapperVariants = cva(`
    border border-solid border-border-primary focus:border-border-active hover:border-border-active 
    bg-transparent rounded flex items-center gap-3
`, {
    variants: {
        size: {
            md: "h-10 p-3"
        },
        disabled: {
            true: "pointer-events-none"
        }
    },
    defaultVariants: {
        size: "md",
        disabled: false
    }
});

export const inputTextVariants = cva(`
    bg-transparent outline-none placeholder:text-text-placeholder text-accent-paragraph flex-1 
`);

export const inputTextIconVariants = cva("fill-text-placeholder", {
    variants: {
        size: {
            md: "w-6 h-6"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

interface InputTextPropos extends
    Omit<React.ComponentProps<"input">, "size" | "disabled">,
    VariantProps<typeof inputTextWrapperVariants> {
    icon?: React.ComponentProps<typeof Icon>["icon"];
    error?: React.ReactNode;
}


const InputText = ({
    size,
    disabled,
    error,
    icon,
    className,
    ...props
}: InputTextPropos) => {
    return (
        <div className={inputTextContainerVariants({ className })}>
            <div className={inputTextWrapperVariants({ size })}>
                {icon && (
                    <Icon
                        icon={icon}
                        className={inputTextIconVariants({ size })}
                    />
                )}
                <input
                    className={inputTextVariants()}
                    disabled={disabled as boolean}
                    {...props}
                />
            </div>
            {error &&
                <Text variant={'label/small'} className='text-accent-red'>
                    {error}
                </Text>
            }
        </div>
    )
}

export default InputText
