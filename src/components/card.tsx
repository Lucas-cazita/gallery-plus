import { cva, type VariantProps } from 'class-variance-authority'
import React, { createElement } from 'react'

export const cardVariants = cva("rounded transition", {
    variants: {
        variant: {
            default: "bg-transparent border border-border-primary",
            primary: "bg-background-primary"
        },
        size: {
            none: "",
            md: "p-3",
            lg: "p-6"
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'none'
    }
});

interface CardProps extends React.ComponentProps<'div'>,
    VariantProps<typeof cardVariants> {
    as?: keyof React.JSX.IntrinsicElements;
}

const Card = ({
    as = "div",
    variant,
    size,
    className,
    children,
    ...props
}: CardProps) => {
    return (createElement(
        as,
        {
            className: cardVariants({ variant, size, className }),
            ...props
        },
        children
    )

    )
}

export default Card;
