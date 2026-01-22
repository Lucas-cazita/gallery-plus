import React, { useState } from 'react'
import ImagePreview from '../../../components/image-preview'
import { cva } from 'class-variance-authority'
import Checkbox from '../../../components/checkbox';

export const photoImageSelectablesVariants = cva(`
    cursor-pointer relative rounded-lg outline-2 outline-transparent hover:outline-border-active`, {
    variants: {
        select: {
            true: "outline-accent-brand!"
        }
    },
    defaultVariants: {
        select: false
    }
})

interface PhotoImageSelectableProps extends
    React.ComponentProps<typeof ImagePreview> {
    selected?: boolean;
    onSelectImage?: (selected: boolean) => void;
}

const PhotoImageSelectable = ({
    selected,
    onSelectImage,
    className,
    ...props
}: PhotoImageSelectableProps) => {

    const [isSelected, setIsSelected] = useState(selected || false);

    function handleSelect() {
        const newValue = !isSelected;

        setIsSelected(newValue)
        onSelectImage?.(newValue)
    }

    return (
        <label
            className={photoImageSelectablesVariants({
                select: isSelected,
                className
            })}
        >

            <Checkbox
                size={'sm'}
                checked={isSelected}
                onChange={handleSelect}
                className='absolute! top-1 left-1 z-10'
            />
            <ImagePreview className='h-20 w-20' {...props} />

        </label>
    )
}

export default PhotoImageSelectable
