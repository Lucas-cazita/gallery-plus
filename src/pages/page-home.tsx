import Container from '../components/container'
import AlbumsFilter from '../contexts/albums/components/albums-filter'
import useAlbums from '../contexts/albums/hooks/use-albums'
import usePhotos from '../contexts/photos/hooks/use-photos'
import PhotosList from '../contexts/photos/components/photos-list'

const PageHome = () => {

    const { albums, isLoadingAlbums } = useAlbums();
    const { photos, isLoadingPhotos } = usePhotos();

    return (
        <Container >
            <AlbumsFilter
                albums={albums}
                loading={isLoadingAlbums}
                className='mb-8'
            />

            <PhotosList
                photos={photos}
                loading={isLoadingPhotos}
            />
        </Container>
    )
}

export default PageHome
