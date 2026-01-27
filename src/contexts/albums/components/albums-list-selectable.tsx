import React, { useTransition } from 'react'
import type { Album } from '../models/album';
import type { Photo } from '../../photos/models/photo';
import Text from '../../../components/text';
import Checkbox from '../../../components/checkbox';
import Divider from '../../../components/divider';
import Skeleton from '../../../components/skeleton';
import usePhotosAlbums from '../../photos/hooks/use-photos-albums';

interface AlbumsListSelectableProps {
    loading?: boolean;
    albums: Album[];
    photo: Photo;
}

const AlbumsListSelectable = ({
    loading,
    albums,
    photo
}: AlbumsListSelectableProps) => {
    const { managePhotoAlbums } = usePhotosAlbums();
    const [isUpdatingPhoto, setIsUpdatingPhoto] = useTransition();

    function isCheked(albumId: string) {
        return photo?.albums?.some(album => album.id === albumId)
    }

    function handlePhotoAlbums(albumId: string) {
        let albumsIds = [];

        if (isCheked(albumId)) {
            albumsIds = photo.albums
                .filter((album) => album.id !== albumId)
                .map((album) => album.id)
        } else {
            albumsIds = [...photo.albums.map((album) => album.id), albumId];
        }

        setIsUpdatingPhoto(async () => {
            await managePhotoAlbums(photo.id, albumsIds);
        });
    }

    return (
        <ul className='flex flex-col gap-4'>
            {!loading && photo && albums.length > 0 &&
                albums.map((album, index) =>

                    <li key={album.id}>
                        <div className='flex items-center justify-between gap-1'>
                            <Text
                                variant={'paragraph/large'}
                                className='truncate'
                            >
                                {album.title}
                            </Text>
                            <Checkbox
                                defaultChecked={isCheked(album.id)}
                                onChange={() => handlePhotoAlbums(album.id)}
                                disabled={isUpdatingPhoto}
                            />
                        </div>
                        {index !== albums.length - 1 &&
                            <Divider className='mt-4 w-full' />
                        }
                    </li>
                )}

            {loading &&
                Array.from({ length: 5 }).map((_, index) => (
                    <li key={`album-loading-${index}`}>
                        <Skeleton
                            className='w-full h-6'
                        />
                        {index < 4 && <Divider className='mt-4 w-full' />}
                    </li>
                ))
            }

        </ul>
    )
}

export default AlbumsListSelectable
