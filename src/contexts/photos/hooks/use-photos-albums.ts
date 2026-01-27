import { toast } from "sonner";
import { api } from "../../../helpers/api";
import { useQueryClient } from "@tanstack/react-query";

export default function usePhotosAlbums() {
    const queryClient = useQueryClient();

    async function managePhotoAlbums(photoId: string, albumsIds: string[]) {
        try {
            await api.put(`/photos/${photoId}/albums`, {
                 albumsIds 
            });

            queryClient.invalidateQueries({
                queryKey: ['photo', photoId]
            });
            queryClient.invalidateQueries({
                queryKey: ['photos']
            }); 

            toast.success("Albuns da foto gerenciados com sucesso")

        } catch (error) {
            toast.error("Erro ao gerenciar albuns da foto")    
            throw error;
        }
    }

    return {
        managePhotoAlbums
    } 
}   