"use client";
import React, { useEffect, useState } from 'react';
import { Autocomplete, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getMakes, getModels } from 'car-info';
import { useCreateCarAdvert } from '@/api/cars';
import { CarAdvertPayload } from '@/types/cars';
import { faker } from '@faker-js/faker/locale/pl';

export default function Add() {
  // Podstawowe dane
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  
  // Dane kontaktowe
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  
  // Parametry samochodu
  const [vin, setVin] = useState('');
  const [year, setYear] = useState<number | null>(null);
  const [enginePower, setEnginePower] = useState<number>(0);
  const [engineCapacity, setEngineCapacity] = useState<number>(0);
  const [doorCount, setDoorCount] = useState<number>(4);
  const [gearbox, setGearbox] = useState('');
  const [generation, setGeneration] = useState('');
  const [version, setVersion] = useState('');
  const [mileage, setMileage] = useState<number>(0);
  const [fuelType, setFuelType] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');

  const { mutate: createAdvert, isPending } = useCreateCarAdvert();

  // Add new state for modal
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

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

  const handleAddCar = async () => {
    const payload: CarAdvertPayload = {
      title: `${selectedBrand} ${selectedModel}`,
      description,
      advertiserType: 'private',
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      imageCollectionId: null,
      contact: {
        firstName,
        lastName,
        phoneNumber,
        city,
      },
      params: {
        vin,
        manufactureYear: year || 0,
        brand: selectedBrand || '',
        model: selectedModel || '',
        enginePower,
        engineCapacity,
        doorCount,
        gearbox,
        generation,
        version,
        mileage,
        fuelType,
        bodyType,
        color,
        price: {
          amount: price,
          currency: 'PLN',
          grossNet: 'gross'
        }
      }
    };

    createAdvert(payload, {
      onSuccess: () => {
        setOpenSuccessModal(true); // Show modal on success
      }
    });
  };

  // Add handler for closing modal
  const handleCloseModal = () => {
    setOpenSuccessModal(false);
    // Optional: Reset form or redirect
  };

  const fillWithFakeData = async () => {
    // Losowy brand i model z dostępnych opcji
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];
    setSelectedBrand(randomBrand);
    
    // Pobierz modele dla wybranej marki
    const availableModels = getModels(randomBrand);
    const randomModel = availableModels[Math.floor(Math.random() * availableModels.length)];
    
    // Ustaw model
    setModels(availableModels);
    setSelectedModel(randomModel);
    
    // Dane kontaktowe
    setFirstName(faker.person.firstName());
    setLastName(faker.person.lastName());
    setPhoneNumber(faker.phone.number('+48 ### ### ###'));
    setCity(faker.location.city());
    
    // Parametry samochodu
    setVin(faker.vehicle.vin());
    setYear(faker.number.int({ min: 2000, max: 2024 }));
    setEnginePower(faker.number.int({ min: 90, max: 500 }));
    setEngineCapacity(faker.number.int({ min: 1000, max: 5000 }));
    setDoorCount(faker.helpers.arrayElement([2, 3, 4, 5]));
    setGearbox(faker.helpers.arrayElement(['manual', 'automatic']));
    setGeneration(faker.helpers.arrayElement(['I', 'II', 'III', 'IV', 'V']));
    setVersion(faker.helpers.arrayElement(['Basic', 'Premium', 'Sport', 'Luxury']));
    setMileage(faker.number.int({ min: 0, max: 300000 }));
    setFuelType(faker.helpers.arrayElement(['petrol', 'diesel', 'electric', 'hybrid']));
    setBodyType(faker.helpers.arrayElement(['sedan', 'hatchback', 'combi', 'suv', 'coupe']));
    setColor(faker.vehicle.color());
    setPrice(faker.number.int({ min: 10000, max: 500000 }));
    
    // Modyfikacja generowania opisu
    const generatedDescription = faker.lorem.paragraph();
    setDescription(generatedDescription.slice(0, 254)); // Przycinamy tekst do 254 znaków
  };

  return (
    <div className="container mx-auto px-4 py-6 overflow-y-auto">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Dodaj ogłoszenie</h2>
          <Button
            variant="outlined"
            onClick={fillWithFakeData}
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Wypełnij przykładowymi danymi
          </Button>
        </div>
        
        <Stack spacing={3}>
          {/* Dane podstawowe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Autocomplete
              options={brands}
              onChange={(_, value) => setSelectedBrand(value)}
              renderInput={(params) => <TextField {...params} label="Marka" required />}
            />
            <Autocomplete
              options={models}
              onChange={(_, value) => setSelectedModel(value)}
              disabled={!selectedBrand}
              renderInput={(params) => <TextField {...params} label="Model" required />}
            />
          </div>

          {/* Dane kontaktowe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Imię"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Nazwisko"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Telefon"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              label="Miasto"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Parametry samochodu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TextField
              label="VIN"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
            />
            <TextField
              label="Rok produkcji"
              type="number"
              value={year || ''}
              onChange={(e) => setYear(Number(e.target.value))}
            />
            <TextField
              label="Moc silnika (KM)"
              type="number"
              value={enginePower}
              onChange={(e) => setEnginePower(Number(e.target.value))}
            />
            <TextField
              label="Pojemność silnika (cm³)"
              type="number"
              value={engineCapacity}
              onChange={(e) => setEngineCapacity(Number(e.target.value))}
            />
            <Autocomplete
              options={['manual', 'automatic']}
              value={gearbox}
              onChange={(_, value) => setGearbox(value || '')}
              renderInput={(params) => <TextField {...params} label="Skrzynia biegów" />}
            />
            <TextField
              label="Przebieg (km)"
              type="number"
              value={mileage}
              onChange={(e) => setMileage(Number(e.target.value))}
            />
            <Autocomplete
              options={['petrol', 'diesel', 'electric', 'hybrid']}
              value={fuelType}
              onChange={(_, value) => setFuelType(value || '')}
              renderInput={(params) => <TextField {...params} label="Rodzaj paliwa" />}
            />
            <Autocomplete
              options={['sedan', 'hatchback', 'combi', 'suv', 'coupe']}
              value={bodyType}
              onChange={(_, value) => setBodyType(value || '')}
              renderInput={(params) => <TextField {...params} label="Typ nadwozia" />}
            />
            <TextField
              label="Kolor"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <TextField
              label="Cena (PLN)"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>

          {/* Opis */}
          <div>
            <TextField
              label="Opis"
              multiline
              rows={4}
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 254) {
                  setDescription(e.target.value);
                }
              }}
              inputProps={{ maxLength: 254 }}
              helperText={`${description.length}/254 znaków`}
              fullWidth
            />
          </div>

          <Button
            variant="contained"
            onClick={handleAddCar}
            disabled={isPending}
            className="bg-blue-500 hover:bg-blue-600 mt-4"
          >
            {isPending ? 'Dodawanie...' : 'Dodaj ogłoszenie'}
          </Button>
        </Stack>
      </div>

      {/* Add Success Modal - place this before the closing div */}
      <Dialog
        open={openSuccessModal}
        onClose={handleCloseModal}
        aria-labelledby="success-dialog-title"
      >
        <DialogTitle id="success-dialog-title">
          Sukces!
        </DialogTitle>
        <DialogContent>
          Twoje ogłoszenie zostało pomyślnie dodane.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
