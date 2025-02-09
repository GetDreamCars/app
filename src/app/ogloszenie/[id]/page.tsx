"use client";
import React from 'react';
import { useGetCarById } from '@/api/cars';
import Header from "@/components/Header/Header";
import { Card, CardContent, Typography, Grid, Chip, Box } from '@mui/material';
import { 
  DirectionsCar, 
  Speed, 
  Timeline,
  LocalGasStation,
  Settings,
  Palette,
  Person,
  Phone,
  LocationOn
} from '@mui/icons-material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const fuelTypeLabels: Record<string, string> = {
  petrol: 'Benzyna',
  diesel: 'Diesel',
  electric: 'Elektryczny',
  hybrid: 'Hybrydowy'
};

const gearboxTypeLabels: Record<string, string> = {
  manual: 'Manualna',
  automatic: 'Automatyczna',
  'semi-automatic': 'Półautomatyczna'
};

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const { data: car, isLoading, error } = useGetCarById(params.id);

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

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="text-center p-4">
          Loading...
        </div>
      </>
    );
  }

  if (!car) {
    return (
      <>
        <Header />
        <div className="text-center p-4">
          Car not found
        </div>
      </>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={4}>
              {/* Image Section */}
              <Grid item xs={12} md={6}>
                <Slider {...settings}>
                  {car.imageCollection?.images?.map((image, index) => (
                    <div key={image.id}>
                      <img
                        src={image.url}
                        alt={`${car.params.brand} ${car.params.model} - zdjęcie ${index + 1}`}
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                      />
                    </div>
                  )) || (
                    <div>
                      <img
                        src="/placeholder-car.jpg"
                        alt={`${car.params.brand} ${car.params.model}`}
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                      />
                    </div>
                  )}
                </Slider>
              </Grid>

              {/* Main Info Section */}
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {car.params.brand} {car.params.model}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  {car.params.price.amount.toLocaleString()} {car.params.price.currency}
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DirectionsCar /> Rok: {car.params.manufactureYear}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Speed /> Przebieg: {car.params.mileage} km
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Timeline /> Moc: {car.params.enginePower} KM
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalGasStation /> Paliwo: {fuelTypeLabels[car.params.fuelType] || car.params.fuelType}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Settings /> Skrzynia: {gearboxTypeLabels[car.params.gearbox] || car.params.gearbox}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Palette /> Kolor: {car.params.color}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Description Card */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Opis
            </Typography>
            <Typography variant="body1">
              {car.description}
            </Typography>
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Kontakt
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Person /> {car.contact.firstName} {car.contact.lastName}
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Phone /> {car.contact.phoneNumber}
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn /> {car.contact.city}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 