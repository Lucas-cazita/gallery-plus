import { cva, type VariantProps } from 'class-variance-authority'
import React, { createElement, type ReactNode } from 'react'

export const textVariants = cva("text-text-label", {
    variants: {
        variant: {
            "heading/large": "font-bold text-2xl/[1.3]",
            "heading/medium": "font-bold text-xl/[1.3]",
            "heading/small": "font-bold text-lg/[1.3]",
            "paragraph/large": "font-medium text-base/normal",
            "paragraph/medium": "font-medium text-sm/normal",
            "paragraph/small": "font-medium text-xs/normal",
            "label/medium": "font-semibold text-base/normal",
            "label/small": "font-semibold text-xs/normal",
        }
    },
    defaultVariants: {
        variant: "paragraph/medium"
    }
});

interface TextProps extends VariantProps<typeof textVariants> {
    as?: keyof React.JSX.IntrinsicElements;
    className?: string,
    children?: ReactNode;
}

const Text = ({
    as = "span",
    variant,
    className,
    children,
    ...props
}: TextProps) => {
    return createElement(
        as,
        {
            className: textVariants({ variant, className }),
            ...props
        },
        children
    )
}

export default Text;
