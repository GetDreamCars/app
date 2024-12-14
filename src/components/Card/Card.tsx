import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';

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
    id: string;
}

interface CarCardProps {
    car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    return (
        <Link href={`/ogloszenie/${car.id}`}>
            <Card sx={{ boxShadow: 3, display: 'flex', flexDirection: 'row', padding: '16px', cursor: 'pointer' }}>
                <img src={car.imageUrl} alt={`${car.make} ${car.model}`} style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '16px' }} />
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {car.make} {car.model}
                    </Typography>
                    <Typography color="text.secondary">
                        {car.engineSize} | {car.power} | {car.transmission}
                    </Typography>
                    <Typography color="text.secondary">
                        Rokr: {car.year} | Przebieg: {car.mileage} km
                    </Typography>
                    <Typography variant="h6" sx={{ marginTop: '8px' }}>
                        Cena: <span style={{ color: 'green' }}>{car.price} zł</span>
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

export default CarCard;
