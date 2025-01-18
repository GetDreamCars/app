"use client";
import React from 'react';
import Header from "@/components/Header/Header";
import CarCard from "@/components/Card/Card";
import { useGetAllCars } from '@/api/cars';
import { CarAdvertResponse } from '@/types/cars';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minYear = searchParams.get('minYear');
  const maxYear = searchParams.get('maxYear');
  const minMileage = searchParams.get('minMileage');
  const maxMileage = searchParams.get('maxMileage');
  const fuelType = searchParams.get('fuelType');
  const gearboxType  = searchParams.get('gearbox');

  const { data: cars, isLoading, error } = useGetAllCars({
    brand,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    minMileage,
    maxMileage,
    fuelType,
    gearboxType,
  });

  if (error) {
    return (
      <>
        <Header />
        <div className="p-4 text-center text-red-500">
          {error.message}
        </div>
      </>
    );
  }

  console.log('cars>', cars?.content);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        {isLoading ? (
          <div className="text-center p-4">
            Ładowanie...
          </div>
        ) : !cars || cars.content.length === 0 ? (
          <div className="text-center p-4">
            Nie znaleziono samochodów
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars?.content.map((car: CarAdvertResponse) => (
              <CarCard 
                key={car.id} 
                car={{
                  id: car.id.toString(),
                  make: car.params.brand,
                  model: car.params.model,
                  year: car.params.manufactureYear,
                  mileage: car.params.mileage,
                  price: car.params.price.amount,
                  imageCollection: car.imageCollection,
                  engineSize: car.params.engineCapacity,
                  power: car.params.enginePower,
                  transmission: car.params.gearbox,
                  created_at: car.createdAt
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}