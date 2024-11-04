"use client";
import Header from "@/components/Header/Header";
import Search from "@/components/Search/Search";
import { useEffect, useState } from "react";

export default function Home() {
  const [backgroundImage, setBackgroundImage] = useState('https://images.pexels.com/photos/757184/pexels-photo-757184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');

  useEffect(() => {
    const images = [
      'https://images.pexels.com/photos/170813/pexels-photo-170813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/235226/pexels-photo-235226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/682484/pexels-photo-682484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setBackgroundImage(images[index]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundImage: `url("${backgroundImage}")`, backgroundSize: 'cover', height: '100vh' }}>
      <Header />
      <Search />
    </div>
  );
}
