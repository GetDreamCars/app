"use client";
import React, { useEffect, useState } from 'react'
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getMakes } from 'car-info';
import { useRouter } from 'next/navigation';

export default function Search() {
  const [brands, setBrands] = useState<string[]>([]);
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<string | null>(null);
  const [yearFrom, setYearFrom] = useState<number | null>(null);
  const [yearTo, setYearTo] = useState<number | null>(null);
  const [mileageFrom, setMileageFrom] = useState<string | null>(null);
  const [mileageTo, setMileageTo] = useState<string | null>(null);
  const [fuelType, setFuelType] = useState<string | null>(null);
  const [gearbox, setGearbox] = useState<string | null>(null);

  useEffect(() => {
    const fetchedMakes = getMakes();
    setBrands(fetchedMakes);
  }, []);

  const handleSearch = () => {
    console.log('Selected Filters:');
    console.log('Brand:', selectedBrand);
    console.log('Min Price:', minPrice);
    console.log('Max Price:', maxPrice);
    console.log('Year From:', yearFrom);
    console.log('Year To:', yearTo);
    console.log('Mileage From:', mileageFrom);
    console.log('Mileage To:', mileageTo);
    console.log('Fuel Type:', fuelType);
    console.log('Gearbox:', gearbox);
    const query = new URLSearchParams({
      brand: selectedBrand || '',
      minPrice: minPrice || '',
      maxPrice: maxPrice || '',
      yearFrom: yearFrom ? yearFrom.toString() : '',
      yearTo: yearTo ? yearTo.toString() : '',
      mileageFrom: mileageFrom || '',
      mileageTo: mileageTo || '',
      fuelType: fuelType || '',
      gearbox: gearbox || '',
    }).toString();
    router.push(`/szukaj?${query}`);
  };

  return (
    <div className="mt-16 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    {/* Car Page Filters Section */}
    <div className="filters bg-white shadow-md rounded-lg p-4 w-full max-w-4xl grid grid-cols-2 gap-4">
      <h2 className="text-lg font-bold mb-4 col-span-2">Kup auto</h2>
      <label className="block mb-2">
        <Autocomplete
          options={brands}
          renderInput={(params) => <TextField {...params} label="Wybierz markę" />}
          onChange={(event, value) => setSelectedBrand(value)}
        />
      </label>
      <div className="grid grid-cols-2 gap-4"></div>
      <label className="block mb-2">
        <Autocomplete
          options={[
            2000, 5000, 10000, 15000, 20000,
            ...Array.from({ length: 20 }, (_, index) => (index + 1) * 5000).slice(4),
            200000, 300000, 400000, 500000, 900000
          ].map(option => `${option.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł`)}
          renderInput={(params) => <TextField {...params} label="Cena od" variant="outlined" />}
          onChange={(event, value) => setMinPrice(value)}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={[
            2000, 5000, 10000, 15000, 20000,
            ...Array.from({ length: 20 }, (_, index) => (index + 1) * 5000).slice(4),
            200000, 300000, 400000, 500000, 900000
          ].map(option => `${option.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł`)}
          renderInput={(params) => <TextField {...params} label="Cena do" variant="outlined" />}
          onChange={(event, value) => setMaxPrice(value)}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={Array.from({ length: 60 }, (_, index) => {
            const year = new Date().getFullYear() - index;
            return year;
          })}
          getOptionLabel={(option) => option.toString()}
          renderInput={(params) => <TextField {...params} label="Rok od" />}
          onChange={(event, value) => setYearFrom(value)}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={Array.from({ length: 60 }, (_, index) => {
            const year = new Date().getFullYear() - index;
            return year;
          })}
          getOptionLabel={(option) => option.toString()}
          renderInput={(params) => <TextField {...params} label="Rok do" />}
          onChange={(event, value) => setYearTo(value)}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={[
            0, 5000, 10000, 20000, 30000, 40000, 50000,
            ...Array.from({ length: 20 }, (_, index) => (index + 6) * 10000)
          ].map(option => `${option.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km`)}
          renderInput={(params) => <TextField {...params} label="Przebieg od" />}
          onChange={(event, value) => setMileageFrom(value)}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={[
            0, 5000, 10000, 20000, 30000, 40000, 50000,
            ...Array.from({ length: 20 }, (_, index) => (index + 6) * 10000)
          ].map(option => `${option.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km`)}
          renderInput={(params) => <TextField {...params} label="Przebieg do" />}
          onChange={(event, value) => setMileageTo(value)}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={["Benzyna", "Diesel", "Elektryczny", "Hybryda"]}
          renderInput={(params) => <TextField {...params} label="Paliwo" />}
          onChange={(event, value) => setFuelType(value)}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={["Manualna", "Automatyczna"]}
          renderInput={(params) => <TextField {...params} label="Skrzynia biegów" />}
          onChange={(event, value) => setGearbox(value)}
        />
      </label>
      <Button 
        className="bg-blue-500 text-white hover:bg-blue-600 col-span-2"
        variant="contained" 
        fullWidth 
        onClick={handleSearch}
      >
        Szukaj
      </Button>
    </div>
    {/* End of Filters Section */}
  </div>
  )
}
