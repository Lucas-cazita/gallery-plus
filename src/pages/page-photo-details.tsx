import { useParams } from 'react-router'
import Container from '../components/container';
import Text from '../components/text';
import Skeleton from '../components/skeleton';
import PhotosNavigator from '../contexts/photos/components/photos-navigator';
import ImagePreview from '../components/image-preview';
import Button from '../components/button';
import AlbumsListSelectable from '../contexts/albums/components/albums-list-selectable';
import useAlbums from '../contexts/albums/hooks/use-albums';
import usePhoto from '../contexts/photos/hooks/use-photo';
import type { Photo } from '../contexts/photos/models/photo';
import { useTransition } from 'react';

const PagePhotoDetails = () => {
    const { id } = useParams();
    const { photo, isLoadingPhoto, nextPhotoId, previousPhotoId, deletePhoto } = usePhoto(id);
    const [isDeletingPhoto, setIsDeletingPhoto] = useTransition();

    const { albums, isLoadingAlbums } = useAlbums();

    function handleDeletePhoto() {
        setIsDeletingPhoto(async () => {
            await deletePhoto(photo!.id);
        });
    }

    if (!isLoadingPhoto && !photo) {
        return <Container><Text as='div'>Foto não encontrada!</Text></Container>
    }

    return (
        <Container>
            <header className='flex items-center justify-between gap-8 mb-8'>
                {!isLoadingPhoto ? (
                    <Text as='h2' variant={'heading/large'}>{photo?.title}</Text>
                ) : (
                    <Skeleton className='w-48 h-8' />
                )}

                <PhotosNavigator
                    loading={isLoadingPhoto}
                    nextPhotoId={nextPhotoId}
                    previousPhotoId={previousPhotoId}
                />
            </header>

            <div className='grid grid-cols-[21rem_1fr] gap-24'>
                <div className='space-y-3'>
                    {!isLoadingPhoto ?
                        <ImagePreview
                            src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
                            title={photo?.title}
                            imageClassName='h-[21rem] w-[21rem]'
                        />
                        :
                        <Skeleton
                            className='h-84 w-84'
                        />
                    }
                    {!isLoadingPhoto ?
                        <Button variant={'destructive'} onClick={handleDeletePhoto} disabled={isDeletingPhoto}>
                            {isDeletingPhoto ? 'Excluindo...' : 'Excluir'}
                        </Button>
                        :
                        <Skeleton className='h-10 w-20' />
                    }
                </div>

                <div className='py-3'>
                    <Text as='h3' variant={'heading/medium'} className='mb-6'>
                        Álbuns
                    </Text>

                    <AlbumsListSelectable
                        photo={photo as Photo}
                        albums={albums}
                        loading={isLoadingAlbums}
                    />
                </div>
            </div>
        </Container >
    )
}

export default PagePhotoDetails;
