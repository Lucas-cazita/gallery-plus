import { cva, type VariantProps } from 'class-variance-authority'
import React, { createElement } from 'react'

export const containerVariants = cva("mx-auto", {
    variants: {
        size: {
            md: "max-w-248 px-2"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

interface ContainerProps extends
    React.ComponentProps<'div'>,
    VariantProps<typeof containerVariants> {
    as?: keyof React.JSX.IntrinsicElements;
}

const Container = ({
    as = 'div',
    className,
    children,
    ...props
}: ContainerProps) => {
    return (createElement(
        as,
        {
            className: containerVariants({ className }),
            ...props
        },
        children
    ))
}

export default Container;
