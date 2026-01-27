import React, { useEffect, useState, useTransition } from 'react'
import { Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../../../components/dialog';
import Button from '../../../components/button';
import InputText from '../../../components/input-text';
import Alert from '../../../components/alert';
import InputSingleFile from '../../../components/input-single-file';
import ImagePreview from '../../../components/image-preview';
import Text from '../../../components/text';
import Skeleton from '../../../components/skeleton';
import { useForm } from 'react-hook-form';
import useAlbums from '../../albums/hooks/use-albums';
import { photoNewFormSchema, type PhotoNewFormSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod'
import usePhoto from '../hooks/use-photo';


interface PhotoNewDialogProps {
    trigger: React.ReactNode;
}

const PhotoNewDialog = ({ trigger }: PhotoNewDialogProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [isCreatingPhoto, setIsCreatingPhoto] = useTransition();

    const form = useForm<PhotoNewFormSchema>({
        resolver: zodResolver(photoNewFormSchema)
    });
    const file = form.watch('file');
    const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

    const { createPhoto } = usePhoto()

    const albumsIds = form.watch('albumsIds');
    const { albums, isLoadingAlbums } = useAlbums();

    useEffect(() => {

        if (!modalOpen) {
            form.reset()
        }
    }, [modalOpen, form]);

    function handleToggleAlbum(albumId: string) {
        const albumsIds = form.getValues('albumsIds') || [];
        const albumsSet = new Set(albumsIds);

        if (albumsSet.has(albumId)) {
            albumsSet.delete(albumId)
        } else {
            albumsSet.add(albumId)
        }

        form.setValue('albumsIds', Array.from(albumsSet))
    }

    function handleSubmit(payload: PhotoNewFormSchema) {

        setIsCreatingPhoto(async () => {
            await createPhoto(payload);

            setModalOpen(false);

        });
    }

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit(handleSubmit)(e);
                }}>
                    <DialogHeader>
                        Adicionar foto
                    </DialogHeader>

                    <DialogBody className='flex flex-col gap-5'>
                        <InputText
                            placeholder='Adicione um título'
                            maxLength={255}
                            error={form.formState.errors.title?.message}
                            {...form.register('title')}
                            disabled={isCreatingPhoto}
                        />

                        <Alert>
                            Tamanho máximo: 50MB
                            <br />
                            Você pode selecionar arquivos em PNG, JPG ou JPEG
                        </Alert>
                        <InputSingleFile
                            form={form}
                            allowedExtenxions={['png', 'jpg', 'jpeg']}
                            maxFileSizeInMb={50}
                            disabled={isCreatingPhoto}
                            replaceBy={
                                <ImagePreview
                                    className='w-full h-56'
                                    src={fileSource}
                                />
                            }
                            error={form.formState.errors.file?.message}
                            {...form.register('file')}
                        />

                        <div className='flex flex-col gap-3'>
                            <Text variant={'label/small'}>Selecionar albuns</Text>

                            <div className='flex flex-wrap gap-3'>
                                {!isLoadingAlbums && albums.length > 0 &&
                                    albums.map(album => (
                                        <Button
                                            key={album.id}
                                            variant={
                                                albumsIds?.includes(album.id) ? 'primary' : 'ghost'
                                            }
                                            size={'sm'}
                                            className='truncate'
                                            onClick={() =>
                                                handleToggleAlbum(album.id)
                                            }
                                            disabled={isCreatingPhoto}
                                        >
                                            {album.title}
                                        </Button>
                                    ))
                                }
                                {isLoadingAlbums &&
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <Skeleton
                                            key={`album-loading-${index}`}
                                            className='h-7 w-20'
                                        />
                                    ))
                                }
                            </div>
                        </div>

                    </DialogBody>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant={'secondary'}
                                disabled={isCreatingPhoto}
                            >
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button
                            handling={isCreatingPhoto}
                            disabled={isCreatingPhoto}
                            type='submit'
                        >
                            {isCreatingPhoto ? 'Adicionando...' : 'Adicionar'}
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default PhotoNewDialog
