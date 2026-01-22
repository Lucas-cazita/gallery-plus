import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import Icon from './icon';
import CheckIcon from '../assets/icons/check.svg?react'
import Skeleton from './skeleton';

export const checkboxWrapperVariants = cva("inline-flex justify-center items-center relative group");

export const checkboxVariants = cva("appearance-none peer flex justify-center items-center cursor-pointer overflow-hidden transition", {
    variants: {
        variant: {
            none: "",
            default: `border border-border-primary bg-transparent
                    hover:border-border-active checked:border-accent-brand 
                    checked:bg-accent-brand group-hover:checked:border-accent-brand-light
                    group-hover:checked:bg-accent-brand-light
                    `
        },
        size: {
            sm: "h-3 w-3 p-1 rounded",
            md: "w-5 h-5 rounded"
        },
        disabled: {
            true: "pointer-events-none"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "md",
        disabled: false
    }
})

export const checkboxIconVariants = cva(`absolute top-1/2 -translate-y-1/2 hidden 
            peer-checked:block fill-text-label cursor-pointer`, {
    variants: {
        size: {
            sm: "w-3 h-3",
            md: "w-5 h-5"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

interface CheckboxProps extends
    Omit<React.ComponentProps<"input">, "size" | "disabled">,
    VariantProps<typeof checkboxVariants> {
    loading?: boolean // O Professor não fez essa verificação nem o Skeleton
}

const Checkbox = ({
    variant,
    size,
    disabled,
    loading,
    className,
    ...props
}: CheckboxProps) => {

    if (loading) {
        return <Skeleton
            rounded={"xs"}
            className={checkboxVariants({ variant: "none", size })}
        />
    }

    return (
        <span
            className={checkboxWrapperVariants({ className })}
        >
            <input
                type="checkbox"
                className={checkboxVariants({ variant, size, disabled })}
                {...props}
            />
            <Icon
                icon={CheckIcon}
                className={checkboxIconVariants({ size })}
            />
        </span>
    )
}

export default Checkbox
