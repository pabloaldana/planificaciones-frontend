import { getCompras } from '../services/compras.service';
import { useQuery } from '@tanstack/react-query';


export const useCompras = () => {
    return useQuery({
        queryKey: ["compras"],
        queryFn: getCompras,
        staleTime: 10 * 60 * 1000, // 10 minutos
    })
}
