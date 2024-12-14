import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const createCarAdvert = async (payload: CarAdvertPayload): Promise<CarAdvertResponse> => {
  const response = await axios.post<CarAdvertResponse>(`${API_URL}/adverts`, payload);
  return response.data;
};

// Hook do użycia z React Query
import { useMutation } from '@tanstack/react-query';
import { CarAdvertPayload, CarAdvertResponse } from '@/types/cars';

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


/**
 * Api returns 
 * {
	"id": 2,
	"title": "Advert title",
	"description": "Opis",
	"createdAt": "2024-12-14T11:38:26.889583",
	"validTo": "2024-12-02T14:30:00",
	"advertiserType": "private",
	"status": "active",
	"contact": {
		"firstName": "John",
		"lastName": "Doe",
		"phoneNumber": "111222333",
		"city": "Warszawa"
	},
	"params": {
		"vin": "11111111111111111",
		"manufactureYear": 2018,
		"brand": "Ford",
		"model": "Focus",
		"enginePower": 86,
		"engineCapacity": 1596,
		"doorCount": 4,
		"generation": "gen-mk4-2018",
		"version": "ver-1-6-gold-x",
		"mileage": 199000,
		"bodyType": "sedan",
		"color": "white",
		"video": "https://www.youtube.com/watch?v=code",
		"fuelType": "petrol",
		"gearbox": "manual",
		"price": {
			"amount": 20000,
			"currency": "PLN",
			"grossNet": "gross"
		}
	},
	"imageCollection": null
}
 * 
 * 
 */