import { getCompras, getMasVendidas, getTotalVentas } from '../services/compras.service';
import { useQuery } from '@tanstack/react-query';


export const useCompras = () => {
    return useQuery({
        queryKey: ["compras"],
        queryFn: getCompras,
        staleTime: 10 * 60 * 1000, // 10 minutos
    })
}

export const useTotalVentas = () => {
    return useQuery({
        queryKey: ["totalVentas"],
        queryFn: getTotalVentas,
        staleTime: 10 * 60 * 1000, // 10 minutos
    })
}

export const useMasVendidas = () => {
    return useQuery({
        queryKey: ["masVendidas"],
        queryFn: getMasVendidas,
        staleTime: 10 * 60 * 1000, // 10 minutos
    })
}