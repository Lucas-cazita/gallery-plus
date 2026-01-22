import type { Photo } from '../models/photo'
import PhotoWidget from './photo-widget';
import Text from '../../../components/text';
import Skeleton from '../../../components/skeleton';

interface PhotosListProps {
    photos: Photo[],
    loading?: boolean;
}

const PhotosList = ({
    photos,
    loading
}: PhotosListProps) => {
    return (
        <div className='space-y-6'>
            <Text
                as='div'
                variant={'paragraph/large'}
                className='flex items-center justify-end gap-1 text-accent-span!'
            >
                Total: {" "}
                {!loading ? (

                    <div>{photos.length}</div>
                ) : (
                    <Skeleton className='h-5 w-5' />
                )}
            </Text>

            {!loading &&
                photos.length > 0 &&
                <div className='grid grid-cols-5 gap-8'>
                    {photos.map(photo => (
                        <PhotoWidget key={photo.id} photo={photo} />
                    ))}
                </div>
            }
            {loading &&
                <div className='grid grid-cols-5 gap-8'>

                    {Array.from({ length: 10 }).map((_, index) => (
                        <PhotoWidget
                            key={`photo-loading-${index}`}
                            photo={{} as Photo}
                            loading
                        />
                    ))}
                </div>
            }

            {!loading && photos.length === 0 &&
                <div className='flex justify-center items-center h-full'>
                    <Text
                        variant={'paragraph/large'}
                    >
                        Nenhuma foto para exibir
                    </Text>
                </div>
            }
        </div >


    )
}

export default PhotosList
