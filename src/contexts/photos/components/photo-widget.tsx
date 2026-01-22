import type { Photo } from '../models/photo'
import ImagePreview from '../../../components/image-preview';
import Skeleton from '../../../components/skeleton';
import Text from '../../../components/text';
import Badge from '../../../components/badge';
import { Link } from 'react-router';
import { buttonTextVariants, buttonVariants } from '../../../components/button';

interface PhotoWidgetProps {
    photo: Photo;
    loading?: boolean;
}

const PhotoWidget = ({
    photo,
    loading
}: PhotoWidgetProps) => {
    return (
        <div className='flex flex-col gap-4'>
            {!loading ? (
                <ImagePreview
                    src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                    title={photo.title}
                    imageClassName='w-43.5 h-43.5 rounded-lg'
                />
            ) : (
                <Skeleton
                    rounded={'lg'}
                    className='w-43.5 h-43.5'
                />
            )}

            <div className='flex flex-col gap-2'>
                {!loading ? (
                    <Text variant={'paragraph/large'} className='truncate'>
                        {photo.title}
                    </Text>
                ) : (
                    <Skeleton
                        className='w-full h-6'
                    />
                )}

                <div className='flex gap-1 min-h-4.5'>
                    {!loading ? (
                        <>
                            {photo.albums.slice(0, 2).map(album => (
                                <Badge
                                    className='truncate'
                                    size={'xs'}
                                    key={album.id}
                                >
                                    {album.title}
                                </Badge>
                            ))}
                            {photo.albums.length > 2 && (
                                <Badge size={'xs'}>
                                    +{photo.albums.length - 2}
                                </Badge>
                            )}
                        </>
                    ) : (
                        Array.from({ length: 2 }).map((_, index) =>
                            <Skeleton
                                key={`album-loading-${index}`}
                                className='w-full h-[23.6px] rounded-lg'
                            />
                        )
                    )}
                </div>
            </div>

            {!loading ? (
                <Link
                    to={`/photos/${photo.id}`}
                    className={buttonVariants({
                        variant: 'secondary',
                        className: 'px-2! py-2!'
                    })}
                >
                    <Text
                        className={buttonTextVariants({
                            variant: 'secondary'
                        })}
                        variant={'label/medium'}
                    >
                        Detalhes da imagem
                    </Text>
                </Link>
            ) : (
                <Skeleton
                    rounded={'md'}
                    className='w-full h-10'
                />
            )}

        </div>
    )
};

export default PhotoWidget;