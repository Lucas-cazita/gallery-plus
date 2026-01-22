import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

export const dividerVariants = cva("", {
    variants: {
        variant: {
            default: "bg-border-primary"
        },
        orientation: {
            horizontal: "h-px",
            vertical: "w-px"
        }
    },
    defaultVariants: {
        variant: "default",
        orientation: "horizontal"
    }
});

interface DividerProps extends
    React.ComponentProps<'div'>,
    VariantProps<typeof dividerVariants> { }

const Divider = ({
    variant,
    orientation,
    className,
    ...props
}: DividerProps) => {
    return (
        <div
            className={
                dividerVariants({ variant, orientation, className })
            }
            {...props}
        />
    )
}

export default Divider;
