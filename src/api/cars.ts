import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CarAdvertPayload, CarAdvertResponse } from '@/types/cars';

const API_URL = 'http://localhost:8080/api';

export const createCarAdvert = async (payload: CarAdvertPayload): Promise<CarAdvertResponse> => {
  const response = await axios.post<CarAdvertResponse>(`${API_URL}/adverts`, payload);
  return response.data;
};

export const useCreateCarAdvert = () => {
  return useMutation<CarAdvertResponse, Error, CarAdvertPayload>({
    mutationFn: createCarAdvert,
    onSuccess: (data) => {
      console.log('Ogłoszenie zostało dodane pomyślnie:', data);
    },
    onError: (error) => {
      console.error('Błąd podczas dodawania ogłoszenia:', error);
    }
  });
};

export const getAllCars = async (): Promise<CarAdvertResponse[]> => {
  const response = await axios.get<CarAdvertResponse[]>(`${API_URL}/adverts?limit=10000`);
  return response.data;
};

export const useGetAllCars = () => {
  return useQuery<CarAdvertResponse[], Error>({
    queryKey: ['cars'],
    queryFn: getAllCars,
  });
};

export const getCarById = async (id: string): Promise<CarAdvertResponse> => {
  const response = await axios.get<CarAdvertResponse>(`${API_URL}/adverts/${id}`);
  return response.data;
};

export const useGetCarById = (id: string) => {
  return useQuery<CarAdvertResponse, Error>({
    queryKey: ['car', id],
    queryFn: () => getCarById(id),
    enabled: !!id,
  });
};
/**
 * Dodawanie kolekcji zdjec do ogloszenia 
 * 
 * 
 * 
 * POST http://localhost:8080/api/images/collections
 * 
 * 
 */