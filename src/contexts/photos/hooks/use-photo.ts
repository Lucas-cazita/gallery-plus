import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photo";
import type { PhotoNewFormSchema } from "../schemas";
import {toast} from 'sonner';
import { useNavigate } from "react-router";

interface PhotoDetailResponse extends Photo {
    nextPhotoId?: string;
    previousPhotoId?: string;
}

const usePhoto = (id?: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {data, isLoading} = useQuery<PhotoDetailResponse>({
        queryKey: ['photo', id],
        queryFn: () => fetcher(`/photos/${id}`),
        enabled: !!id
    });

    async function createPhoto(payload: PhotoNewFormSchema) {

        try {
            const {data: photo} = await api.post<Photo>('/photos', {
                title: payload.title
            });

            await api.post(`/photos/${photo.id}/image`, {
                file: payload.file[0]
            }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if(payload.albumsIds && payload.albumsIds.length > 0) {
                await api.put(`/photos/${photo.id}/albums`, {
                    albumsIds: payload.albumsIds
                })
            }


            queryClient.invalidateQueries({queryKey: ['photos']});

            
            toast.success(`Foto "${photo.title}" criada com sucesso!`, {
                duration: 4000,
            });

        } catch (error) {

            toast.error(`Erro ao criar foto ${error}`)
            throw error;
        }
    }

    async function deletePhoto(photoId: string) {
        try {
            await api.delete(`/photos/${photoId}`);

            queryClient.invalidateQueries({queryKey: ['photos']});

            toast.success(`Foto deletada com sucesso!`, {
            duration: 4000,
            });

            navigate('/');
            
        } catch (error) {
        toast.error(`Erro ao deletar foto ${error}`)
        throw error;
    }}

    return {
        photo: data,
        isLoadingPhoto: isLoading,
        nextPhotoId: data?.nextPhotoId,
        previousPhotoId: data?.previousPhotoId,
        createPhoto,
        deletePhoto
    }
}

export default usePhoto;
