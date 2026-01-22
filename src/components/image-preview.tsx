import { cva } from 'class-variance-authority';
import React from 'react'

export const imagePreviewVariants = cva("rounded-lg overflow-hidden ");

export const imagePreviewImageVariants = cva("object-cover");

interface ImagePreviewProps extends React.ComponentProps<"img"> {
    imageClassName?: string;
}

const ImagePreview = ({
    className,
    imageClassName,
    ...props
}: ImagePreviewProps) => {
    return (
        <div className={imagePreviewVariants({ className })}>
            <img
                className={imagePreviewImageVariants({
                    className: imageClassName
                })}
                {...props}
            />
        </div>
    )
}

export default ImagePreview;
