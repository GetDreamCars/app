// Interfejs dla odpowiedzi API
export interface CarAdvertResponse {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    validTo: string;
    advertiserType: 'private';
    status: 'active';
    contact: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      city: string;
    };
    params: {
      vin: string;
      manufactureYear: number;
      brand: string;
      model: string;
      enginePower: number;
      engineCapacity: number;
      doorCount: number;
      generation: string;
      version: string;
      mileage: number;
      bodyType: string;
      color: string;
      video?: string;
      fuelType: string;
      gearbox: string;
      price: {
        amount: number;
        currency: string;
        grossNet: string;
      };
    };
    imageCollection: null | string;
  }
  
  // Poprawiony interfejs dla payloadu
  export interface CarAdvertPayload {
    title: string;
    description: string;
    advertiserType: 'private';
    validTo: string;
    imageCollectionId: null | string;
    contact: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      city: string;
    };
    params: {
      vin: string;
      manufactureYear: number;
      brand: string;
      model: string;
      enginePower: number;
      engineCapacity: number;
      doorCount: number;
      gearbox: string;
      generation: string;
      version: string;
      mileage: number;
      fuelType: string;
      bodyType: string;
      color: string;
      price: {
        amount: number;
        currency: string;
        grossNet: string;
      };
      video?: string;
    };
  }
  