import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

export const skeletonVariants = cva("bg-background-tertiary animate-pulse pointer-events-none", {
    variants: {
        rounded: {
            xs: "rounded-xs",
            sm: "rounded-sm",
            md: "rounded-md",
            full: "rounded-full"
        }
    },
    defaultVariants: {
        rounded: "sm"
    }
})

interface SkeletonProps extends
    Omit<React.ComponentProps<"div">, "size">,
    VariantProps<typeof skeletonVariants> { }

const Skeleton = ({ rounded, className }: SkeletonProps) => {
    return (
        <div className={skeletonVariants({ rounded, className })} />
    )
}

export default Skeleton;
