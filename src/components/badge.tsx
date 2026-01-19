import React from 'react'
import Text from './text'
import { cva, cx, type VariantProps } from 'class-variance-authority'
import Skeleton from './skeleton';

export const badgeVariants = cva("inline-flex justify-center items-center cursor-pointer", {
    variants: {
        variant: {
            ghost: "bg-transparent border border-border-primary hover:border-border-active"
        },
        size: {
            xs: "rounded-sm py-0.5 px-2",
            sm: "rounded-md py-1 px-3"
        }
    },
    defaultVariants: {
        variant: "ghost",
        size: "sm"
    }
});

export const badgeSkeletonVariants = cva("", {
    variants: {
        size: {
            xs: "w-12 h-5.5",
            sm: "w-16 h-7.5",
        },
    },
    defaultVariants: {
        size: "sm",
    },
});

interface BadgeProps extends
    React.ComponentProps<"div">,
    VariantProps<typeof badgeVariants> {
    loading?: boolean;
}

const Badge = ({
    variant,
    size,
    loading,
    className,
    children,
    ...props
}: BadgeProps) => {

    if (loading) {
        return <Skeleton
            rounded={size}
            className={cx(
                badgeVariants({ variant, size }),
                badgeSkeletonVariants({ size }),
                className
            )}
        />
    }

    return (
        <div
            role='button'
            className={badgeVariants({ variant, size, className })}
            {...props}
        >
            <Text
                variant={size === 'xs' ? 'paragraph/small' : 'paragraph/medium'}
            >
                {children}
            </Text>
        </div>
    )
}

export default Badge
