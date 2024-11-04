"use client";
import React from 'react';
import Header from "@/components/Header/Header";
import CarCard from "@/components/Card/Card";
import { getMakes, getModels } from 'car-info';

export default function SearchPage() {
  const cars = Array.from({ length: 40 }, (_, index) => ({
    make: getMakes()[index % getMakes().length],
    model: getModels(getMakes()[index % getMakes().length])[index % getModels(getMakes()[index % getMakes().length]).length],
    year: 2020 + (index % 5),
    mileage: Math.floor(Math.random() * 100000),
    price: Math.floor(Math.random() * 30000) + 10000,
    imageUrl: `https://picsum.photos/150/150?random=${index + 1}`, // Placeholder image URL from Picsum
    engineSize: Math.random() * 3 + 1, // Example engine size in liters
    power: Math.floor(Math.random() * 300) + 100, // Example power in horsepower
    transmission: Math.random() > 0.5 ? 'Automatic' : 'Manual' // Random transmission type
  }));

  return (
    <>
      <Header />
      <div>
        {cars.map(car => (
          <CarCard key={`${car.make}-${car.model}`} car={car} />
        ))}
      </div>
    </>
  );
}