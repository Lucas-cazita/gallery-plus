import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

export const iconVariants = cva("", {
    variants: {
        animate: {
            true: "animate-spin"
        }
    },
    defaultVariants: {
        animate: false
    }
})

interface IconProps extends React.ComponentProps<"svg">, VariantProps<typeof iconVariants> {
    icon: React.FC<React.ComponentProps<"svg">>
}

const Icon = ({
    icon: SvgComponent,
    animate,
    className,
    ...props
}: IconProps) => {
    return (
        <SvgComponent
            className={iconVariants({ animate, className })}
            {...props}
        />
    )
}

export default Icon
