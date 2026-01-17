import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import Text from './text';
import Skeleton from './skeleton';
import Icon from './icon';
import SpinnerIcon from '../assets/icons/spinner.svg?react'

export const buttonVariants = cva("flex justify-center items-center cursor-pointer gap-1", {
    variants: {
        variant: {
            none: "",
            primary: "bg-accent-brand hover:bg-accent-brand-light",
            secondary: "bg-background-secondary hover:bg-background-tertiary",
            destructive: "bg-background-secondary hover:bg-background-tertiary",
            ghost: `
					bg-transparent border border-solid border-border-primary 
				 hover:border-background-secondary
				`
        },
        size: {
            sm: "h-7 min-w-20 py-1 px-3 rounded-md",
            md: "h-10 min-w-20 px-3 py-2 rounded-md"
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
})

export const buttonTextVariants = cva("", {
    variants: {
        variant: {
            none: "",
            primary: "text-text-label-inverse",
            secondary: "text-text-label",
            destructive: "text-accent-red!",
            ghost: "text-accent-paragraph"
        }
    },
    defaultVariants: {
        variant: "primary"
    }
});

export const buttonIconVariants = cva("", {
    variants: {
        variant: {
            none: "",
            primary: "fill-text-label-inverse",
            secondary: "fill-text-label",
            destructive: "fill-accent-red",
            ghost: "fill-accent-paragraph"
        },
        size: {
            sm: "w-4 h-4",
            md: "w-6 h-6"
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "md"
    }
})

interface ButtonProps extends
    Omit<React.ComponentProps<"button">, "disabled">,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
    icon?: React.ComponentProps<typeof Icon>["icon"];
}

const Button = ({
    variant,
    size,
    disabled,
    handling,
    loading,
    type = "button",
    icon,
    className,
    children,
    ...props
}: ButtonProps) => {

    if (loading) {
        return <Skeleton
            rounded={"md"}
            className={buttonVariants({ variant: "none", size })}
        />
    }

    return (
        <button
            type={type}
            className={buttonVariants({
                variant, size, disabled, handling, className
            })}
            disabled={disabled as boolean}
            {...props}
        >
            <Text
                variant={"label/medium"}
                className={buttonTextVariants({ variant })}
            >
                {children}
            </Text>

            {(icon || handling) && (

                <Icon
                    icon={handling ? SpinnerIcon : icon}
                    animate
                    className={buttonIconVariants({ variant, size })}
                />

            )}
        </button>
    )
}

export default Button;
