"use client";
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header/Header";
import CarCard from "@/components/Card/Card";
import { supabase } from "@/utils/supabase/client";

type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  imageUrl: string;
  engineSize: number;
  power: number;
  transmission: string;
  created_at: string;
};

export default function SearchPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data: carsFetch, error } = await supabase
          .from('cars')
          .select('*')
          .order('created_at', { ascending: false });
        
        console.log('Fetched data:', carsFetch);
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        setCars(carsFetch || []);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching cars');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, []);

  if (error) {
    return (
      <>
        <Header />
        <div className="p-4 text-center text-red-500">
          {error}
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
        ) : cars.length === 0 ? (
          <div className="text-center p-4">
            No cars found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}