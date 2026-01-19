import React from 'react'
import Text from './text'
import { cva, type VariantProps } from 'class-variance-authority'

export const alertVariants = cva("rounde-md py-3 px-5", {
    variants: {
        variant: {
            info: "bg-accent-brand/10"
        }
    },
    defaultVariants: {
        variant: "info"
    }
});

interface AlertProps extends
    React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> { }

const Alert = ({
    variant,
    className,
    children,
    ...props
}: AlertProps) => {
    return (
        <div
            role='alert'
            className={alertVariants({ variant, className })}
            {...props}
        >
            <Text>
                {children}
            </Text>

        </div>
    )
}

export default Alert;
