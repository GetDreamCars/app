import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Updated Car interface to match the new structure
interface Car {
    make: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
    imageUrl?: string; // Make it optional since we'll use imageCollection
    engineSize: number;
    power: number;
    transmission: string;
    id: string;
    imageCollection?: {
        id: number;
        images: Array<{
            id: number;
            url: string;
        }>;
    };
}

interface CarCardProps {
    car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    const router = useRouter();
    const displayImage = car.imageCollection?.images[0]?.url || car.imageUrl || '/placeholder-car.jpg';

    const handleClick = () => {
        router.push(`/ogloszenie/${car.id}`);
    };

    return (
        <Card 
            onClick={handleClick}
            sx={{ 
                boxShadow: 3, 
                display: 'flex', 
                flexDirection: 'row', 
                padding: '16px', 
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                }
            }}
        >
            <img 
                src={displayImage} 
                alt={`${car.make} ${car.model}`} 
                style={{ 
                    width: '150px', 
                    height: '150px', 
                    objectFit: 'cover', 
                    marginRight: '16px',
                    borderRadius: '8px'
                }} 
            />
            <CardContent>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {car.make} {car.model}
                </Typography>
                <Typography color="text.secondary">
                    {car.engineSize} | {car.power} | {car.transmission}
                </Typography>
                <Typography color="text.secondary">
                    Rok: {car.year} | Przebieg: {car.mileage} km
                </Typography>
                <Typography variant="h6" sx={{ marginTop: '8px' }}>
                    Cena: <span style={{ color: 'green' }}>{car.price.toLocaleString()} zł</span>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CarCard;
