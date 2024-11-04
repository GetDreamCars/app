"use client";
import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getMakes, getModels } from 'car-info';

export default function Add() {
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [bodyType, setBodyType] = useState<string | null>(null);

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

  const handleAddCar = () => {
    // Implement logic to add the car
    console.log("Add car:", { selectedBrand, selectedModel, price, year, bodyType });
  };

  return (
    <div className="mt-16 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Car Add Section */}
      <div className="add-car bg-white shadow-md rounded-lg p-4 w-full max-w-4xl grid grid-cols-2 gap-4">
        <h2 className="text-lg font-bold mb-4 col-span-2">Dodaj auto</h2>
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
            onChange={(event, value) => setSelectedModel(value)}
            disabled={!selectedBrand}
            renderInput={(params) => <TextField {...params} label="Wybierz model" />}
          />
        </label>
        <label className="block mb-2">
          <TextField
            label="Cena"
            type="number"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <label className="block mb-2">
          <Autocomplete
            options={Array.from({ length: 60 }, (_, index) => {
              const year = new Date().getFullYear() - index;
              return year;
            })}
            onChange={(event, value) => setYear(value)}
            getOptionLabel={(option) => option.toString()}
            renderInput={(params) => <TextField {...params} label="Wybierz rok" />}
          />
        </label>
        <label className="block mb-2">
          <Autocomplete
            options={['Sedan', 'Hatchback', 'SUV', 'Coupe']}
            onChange={(event, value) => setBodyType(value)}
            renderInput={(params) => <TextField {...params} label="Wybierz typ nadwozia" />}
          />
        </label>
        <Button 
          className="bg-blue-500 text-white hover:bg-blue-600 col-span-2"
          variant="contained" 
          fullWidth 
          onClick={handleAddCar}
        >
          Dodaj
        </Button>
      </div>
      {/* End of Add Section */}
    </div>
  );
}
