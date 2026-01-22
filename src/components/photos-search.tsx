import React, { useCallback } from 'react'
import SearchIcon from '../assets/icons/search.svg?react'
import InputText from './input-text'
import { debounce } from '../helpers/utils';
import usePhotos from '../contexts/photos/hooks/use-photos';

const PhotosSearch = () => {

    const [inputValue, setInputValue] = React.useState("");
    const { filters } = usePhotos();

    const debouncedSetValue = useCallback(
        debounce((value: string) => {
            filters.setQ(value)
        }, 200),
        [filters.setQ]
    )

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setInputValue(value);
        debouncedSetValue(value)
    }

    return (
        <InputText
            icon={SearchIcon}
            placeholder='Buscar fotos'
            className='flex-1'
            value={inputValue}
            onChange={handleInputChange}
        />
    )
}

export default PhotosSearch
