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
  const yearFrom = searchParams.get('yearFrom');
  const yearTo = searchParams.get('yearTo');
  const mileageFrom = searchParams.get('mileageFrom');
  const mileageTo = searchParams.get('mileageTo');
  const fuelType = searchParams.get('fuelType');
  const gearbox = searchParams.get('gearbox');

  const { data: cars, isLoading, error } = useGetAllCars({
    brand,
    minPrice,
    maxPrice,
    yearFrom,
    yearTo,
    mileageFrom,
    mileageTo,
    fuelType,
    gearbox,
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

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        {isLoading ? (
          <div className="text-center p-4">
            Loading...
          </div>
        ) : !cars || cars.length === 0 ? (
          <div className="text-center p-4">
            No cars found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map((car: CarAdvertResponse) => (
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