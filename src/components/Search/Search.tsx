"use client";
import React, { useEffect, useState } from 'react'
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getMakes } from 'car-info';
import { useRouter } from 'next/navigation';

enum GearboxType {
  MANUAL = "manual",
  AUTOMATIC = "automatic",
  SEMI_AUTOMATIC = "semi-automatic"
}

export default function Search() {
  const [brands, setBrands] = useState<string[]>([]);
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);
  const [minMileage, setMinMileage] = useState<number | null>(null);
  const [maxMileage, setMaxMileage] = useState<number | null>(null);
  const [fuelType, setFuelType] = useState<string | null>(null);
  const [gearboxType, setGearboxType] = useState<GearboxType | null>(null);

  useEffect(() => {
    const fetchedMakes = getMakes();
    setBrands(fetchedMakes);
  }, []);

  const handleSearch = () => {
    console.log('Selected Filters:');
    console.log('Brand:', selectedBrand);
    console.log('Min Price:', minPrice);
    console.log('Max Price:', maxPrice);
    console.log('Min Year:', minYear);
    console.log('Max Year:', maxYear);
    console.log('Min Mileage:', minMileage);
    console.log('Max Mileage:', maxMileage);
    console.log('Fuel Type:', fuelType);
    console.log('Gearbox Type:', gearboxType);
    const query = new URLSearchParams({
      brand: selectedBrand || '',
      minPrice: minPrice !== null ? minPrice.toString() : '',
      maxPrice: maxPrice !== null ? maxPrice.toString() : '',
      minYear: minYear !== null ? minYear.toString() : '',
      maxYear: maxYear !== null ? maxYear.toString() : '',
      minMileage: minMileage !== null ? minMileage.toString() : '',
      maxMileage: maxMileage !== null ? maxMileage.toString() : '',
      fuelType: fuelType || '',
      gearbox: gearboxType || '',
    }).toString();
    router.push(`/szukaj?${query}`);
  };

  const gearboxOptions = [
    { label: 'Manualna', value: GearboxType.MANUAL },
    { label: 'Automatyczna', value: GearboxType.AUTOMATIC },
    { label: 'Półautomatyczna', value: GearboxType.SEMI_AUTOMATIC }
  ];

  const fuelTypeOptions = [
    { label: 'Benzyna', value: 'petrol' },
    { label: 'Diesel', value: 'diesel' },
    { label: 'Elektryczny', value: 'electric' },
    { label: 'Hybrydowy', value: 'hybrid' }
  ];

  return (
    <div className="mt-64 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
          onChange={(event, value) => setMinPrice(value ? parseInt(value.replace(/\D/g, '')) : null)}
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
          onChange={(event, value) => setMaxPrice(value ? parseInt(value.replace(/\D/g, '')) : null)}
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
          onChange={(event, value) => setMinYear(value ? parseInt(value.toString()) : null)}
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
          onChange={(event, value) => setMaxYear(value ? parseInt(value.toString()) : null)}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={[
            0, 5000, 10000, 20000, 30000, 40000, 50000,
            ...Array.from({ length: 20 }, (_, index) => (index + 6) * 10000)
          ].map(option => `${option.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km`)}
          renderInput={(params) => <TextField {...params} label="Przebieg od" />}
          onChange={(event, value) => setMinMileage(value ? parseInt(value.replace(/\D/g, '')) : null)}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={[
            0, 5000, 10000, 20000, 30000, 40000, 50000,
            ...Array.from({ length: 20 }, (_, index) => (index + 6) * 10000)
          ].map(option => `${option.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km`)}
          renderInput={(params) => <TextField {...params} label="Przebieg do" />}
          onChange={(event, value) => setMaxMileage(value ? parseInt(value.replace(/\D/g, '')) : null)}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={fuelTypeOptions}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="Paliwo" />}
          onChange={(event, value) => setFuelType(value ? value.value : null)}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={gearboxOptions}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="Skrzynia biegów" />}
          onChange={(event, value) => setGearboxType(value ? value.value : null)}
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
