"use client";
import React, { useEffect, useState } from 'react'
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getMakes, getModels } from 'car-info';

export default function Search() {
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  useEffect(() => {
    const fetchedMakes = getMakes();
    setBrands(fetchedMakes);
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      const fetchedModels = getModels(selectedBrand);
      setModels(fetchedModels);
    }
  }, [selectedBrand]);

  return (
    <div className="mt-16 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    {/* Car Page Filters Section */}
    <div className="filters bg-white shadow-md rounded-lg p-4 w-full max-w-4xl grid grid-cols-2 gap-4">
      <h2 className="text-lg font-bold mb-4 col-span-2">Kup auto</h2>
      <label className="block mb-2">
        <Autocomplete
          options={brands}
          onChange={(event, value) => setSelectedBrand(value)}
          renderInput={(params) => <TextField {...params} label="Wybierz markę" />}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={models}
          renderInput={(params) => <TextField {...params} label="Wybierz model" />}
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={[
            2000, 5000, 10000, 15000, 20000,
            ...Array.from({ length: 20 }, (_, index) => (index + 1) * 5000).slice(4), // 25,000 to 100,000
            200000, 300000, 400000, 500000, 900000
          ].map(option => `${option.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł`)} // Format options with space as thousands separator
          renderInput={(params) => <TextField {...params} label="Cena do" variant="outlined" />}
          onChange={(event, value) => console.log(value)} // Handle price selection
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={Array.from({ length: 60 }, (_, index) => {
            const year = new Date().getFullYear() - index;
            return year;
          })}
          getOptionLabel={(option) => option.toString()}
          renderInput={(params) => <TextField {...params} label="Wybierz rok" />}
          onChange={(event, value) => console.log(value)} // Handle year selection
        />
      </label>
      <label className="block mb-2">
        <Autocomplete
          options={['Sedan', 'Hatchback', 'SUV', 'Coupe']}
          renderInput={(params) => <TextField {...params} label="Wybierz typ nadwozia" />}
        />
      </label>
      <Button 
        className="bg-blue-500 text-white hover:bg-blue-600 col-span-2"
        variant="contained" 
        fullWidth 
        onClick={() => handleSearch()}
      >
        Szukaj
      </Button>
    </div>
    {/* End of Filters Section */}
  </div>
  )
}

const handleSearch = () => {
  // Implement search logic here
  console.log("Search button clicked");
};
