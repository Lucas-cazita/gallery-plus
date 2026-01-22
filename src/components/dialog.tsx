import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog';
import Card from './card';
import Text from './text';
import ButtonIcon from './button-icon';
import XIcon from '../assets/icons/x.svg?react';
import Divider from './divider';

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogClose = DialogPrimitive.Close;

export function DialogOverlay({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return <DialogPrimitive.Overlay
        className={`
            fixed inset-0 z-50 bg-background-secondary/60
            backdrop-blur-sm 
            data-state-open:animate-in
            data-state-open:fade-in-0
            data-state-closed:animete-out
            data-state-closed:fade-out-0
            ${className ?? ''}
        `}
        {...props}
    />

}

export function DialogContent({
    className,
    ref,
    children,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
    return <DialogPrimitive.Portal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={`
                fixed left-1/2 top-1/2 w-full max-w-lg 
                z-60 -translate-x-1/2 -translate-y-1/2
                data-state-open:animate-in
                data-state-open:fade-in-0
                data-state-open:slide-in-from-bottom-[48%]
                data-state-closed:animate-out
                data-state-closed:fade-out-0
                data-state-closed:slide-out-to-bottom-[48%]
                ${className ?? ''}
            `}
        >
            <Card size={'lg'} variant={'primary'}>
                {children}
            </Card>
        </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
};

export function DialogHeader({
    children,
    className,
    ...props
}: React.ComponentProps<"div">) {
    return <>
        <header
            className={`
                flex items-center justify-between ${className ?? ''}
            `}
            {...props}
        >
            <DialogPrimitive.Title>
                <Text variant={'heading/medium'} className='flex-1'>
                    {children}
                </Text>
            </DialogPrimitive.Title>
            <DialogClose asChild>
                <ButtonIcon icon={XIcon} variant={'ghost'} />
            </DialogClose>
        </header>
        <Divider className='mt-1.5 mb-5' />
    </>
};

export function DialogBody({ children, ...props }: React.ComponentProps<"div">) {
    return <div {...props}>{children}</div>
};

export function DialogFooter({
    children,
    ...props
}: React.ComponentProps<"div">) {
    return <div {...props}>
        <Divider className='mt-5 mb-1.5' />
        <footer className='flex items-center justify-end gap-3'>
            {children}
        </footer>
    </div>
};


