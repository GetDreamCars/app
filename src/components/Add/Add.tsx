"use client";
import React, { useEffect, useState } from 'react';
import { Autocomplete, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getMakes, getModels } from 'car-info';
import { useCreateCarAdvert, useUploadImageCollection } from '@/api/cars';
import { CarAdvertPayload } from '@/types/cars';
import { faker } from '@faker-js/faker/locale/pl';

// Add this helper function at the top of the file, outside the component
async function getImageFromUrl(url: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], `car-${Math.random()}.jpg`, { type: 'image/jpeg' });
}

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
  const { mutate: uploadImages, isPending: isUploadingImages } = useUploadImageCollection({
    onSuccess: (data) => {
      setImagePreviewUrls(data.images.map(img => img.url));
    }
  });

  // Add new state for modal
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  // Dodaj nowe stany
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [collectionId, setCollectionId] = useState<string | null>(null);

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
    if (selectedFiles.length > 0) {
      uploadImages(selectedFiles, {
        onSuccess: (data) => {
          const collectionId = String(data.id);
          setCollectionId(collectionId);
          submitAdvertWithImages(collectionId);
        },
        onError: (error) => {
          console.error('Błąd podczas uploadowania zdjęć:', error);
        }
      });
    } else {
      submitAdvertWithImages(null);
    }
  };

  // Add handler for closing modal
  const handleCloseModal = () => {
    setOpenSuccessModal(false);
    // Optional: Reset form or redirect
  };

  const fillWithFakeData = async () => {
    // Najpierw pobierz wszystkie dostępne marki
    const availableBrands = getMakes();
    const randomBrand = availableBrands[Math.floor(Math.random() * availableBrands.length)];
    
    // Następnie pobierz modele dla wybranej marki
    const availableModels = getModels(randomBrand);
    const randomModel = availableModels[Math.floor(Math.random() * availableModels.length)];
    
    // Ustaw wartości w stanie
    setBrands(availableBrands);
    setModels(availableModels);
    setSelectedBrand(randomBrand);
    setSelectedModel(randomModel);
    
    // Reszta wypełniania danych pozostaje bez zmian
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
    
    // Add this new code after the description setting
    try {
      // Use specific Pexels car images
      const imageUrls = [
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
        'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg'
      ];

      // Convert URLs to Files
      const imageFiles = await Promise.all(imageUrls.map(url => getImageFromUrl(url)));
      setSelectedFiles(imageFiles);
      
      // Generate preview URLs
      setImagePreviewUrls(imageUrls);
      
    } catch (error) {
      console.error('Error generating fake images:', error);
    }
  };

  // Nowa funkcja do wysyłania ogłoszenia
  const submitAdvertWithImages = (imageCollectionId: string | null) => {
    const payload: CarAdvertPayload = {
      title: `${selectedBrand} ${selectedModel}`,
      description,
      advertiserType: 'private',
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      imageCollectionId, // dodaj ID kolekcji zdjęć
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
        setOpenSuccessModal(true);
        // Wyczyść stan zdjęć po udanym dodaniu
        setSelectedFiles([]);
        setImagePreviewUrls([]);
        setCollectionId(null);
      }
    });
  };

  // Dodaj funkcję do usuwania zdjęć
  const handleRemoveImage = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Dodaj nową funkcję do handlera plików
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
    
    // Generuj tymczasowy podgląd zdjęć
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrls(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 overflow-y-auto">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Dodaj ogłoszenie</h2>
          <Button
            variant="outlined"
            onClick={() => fillWithFakeData().catch(console.error)}
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
              value={selectedBrand}
              onChange={(_, value) => setSelectedBrand(value)}
              renderInput={(params) => <TextField {...params} label="Marka" required />}
            />
            <Autocomplete
              options={models}
              value={selectedModel}
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

          {/* Dodaj sekcję ze zdjęciami przed przyciskiem "Dodaj ogłoszenie" */}
          <div className="mt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outlined"
                  component="label"
                  disabled={isUploadingImages}
                >
                  Wybierz zdjęcia
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </Button>
                <span className="text-sm text-gray-500">
                  Wybrano zdjęć: {selectedFiles.length}
                </span>
              </div>

              {/* Podgląd wybranych zdjęć */}
              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            variant="contained"
            onClick={handleAddCar}
            disabled={isPending || isUploadingImages}
            className="bg-blue-500 hover:bg-blue-600 mt-4"
          >
            {isPending || isUploadingImages ? 'Dodawanie...' : 'Dodaj ogłoszenie'}
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
