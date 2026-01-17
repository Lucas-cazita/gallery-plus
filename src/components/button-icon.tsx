import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import Icon from './icon';
import SpinnerIcon from '../assets/icons/spinner.svg?react'
import Skeleton from './skeleton';

export const buttonIconContainerVariants = cva("inline-flex justify-center items-center cursor-pointer transition", {
    variants: {
        variant: {
            none: "",
            primary: "bg-accent-brand hover:bg-accent-brand-light",
            secondary: "bg-background-secondary hover:bg-background-tertiary",
            ghost: "bg-transparent hover:bg-border-primary/20",
        },
        size: {
            md: "p-2 w-10 h-10 rounded"
        },
        disabled: {
            true: "pointer-events-none opacity-50"
        },
        handling: {
            true: "pointer-events-none"
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
        disabled: false,
        handling: false
    }
});

export const buttonIconIconVariants = cva("", {
    variants: {
        variant: {
            none: "",
            primary: "fill-text-label",
            secondary: "fill-text-label",
            ghost: "fill-text-label",

        },
        size: {
            md: "w-6 h-6"
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "md"
    }
})

interface ButtonIconProps extends
    Omit<React.ComponentProps<"button">, "disabled">,
    VariantProps<typeof buttonIconContainerVariants> {
    icon: React.ComponentProps<typeof Icon>["icon"];
    loading?: boolean,
}

const ButtonIcon = ({
    icon,
    variant,
    size,
    disabled,
    handling,
    loading,
    className,
    ...props
}: ButtonIconProps) => {

    if (loading) {
        return <Skeleton
            rounded={"md"}
            className={buttonIconContainerVariants({ variant: "none", size })}
        />
    }

    return (
        <button
            className={buttonIconContainerVariants({
                variant,
                size,
                disabled,
                handling,
                className
            })}
            {...props}
        >
            <Icon
                icon={handling ? SpinnerIcon : icon}
                animate={handling}
                className={buttonIconIconVariants({ variant, size })}
            />
        </button>
    )
}

export default ButtonIcon
