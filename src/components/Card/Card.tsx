import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

// Define the Car interface
interface Car {
    make: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
    imageUrl: string;
    engineSize: number;
    power: number;
    transmission: string;
}

interface CarCardProps {
    car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    return (
        <Card sx={{ boxShadow: 3, display: 'flex', flexDirection: 'row', padding: '16px' }}>
            <img src={car.imageUrl} alt={`${car.make} ${car.model}`} style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '16px' }} />
            <CardContent>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {car.make} {car.model}
                </Typography>
                <Typography color="text.secondary">
                    {car.engineSize} | {car.power} | {car.transmission}
                </Typography>
                <Typography color="text.secondary">
                    Year: {car.year} | Mileage: {car.mileage} miles
                </Typography>
                <Typography variant="h6" sx={{ marginTop: '8px' }}>
                    Price: <span style={{ color: 'green' }}>${car.price}</span>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CarCard;
